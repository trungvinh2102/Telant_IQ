import { Response } from "express";
import * as SubmissionModel from "../models/Submission";
import { AuthRequest } from "../types";
import vm from "vm";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import * as ts from "typescript";

const EXECUTION_TIMEOUT = 5000; // 5 seconds constraint

// Execution result interface
interface ExecutionResult {
  output: string;
  error?: string;
  status: string;
  errorLine?: number;
  errorType?: string;
}

// Helper: Extract line number from error message
const extractLineNumber = (errorMessage: string): number | undefined => {
  const lineMatch = errorMessage.match(/line (\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);

  const atMatch = errorMessage.match(/at.*:(\d+):(\d+)/);
  if (atMatch) return parseInt(atMatch[1], 10);

  return undefined;
};

// Helper: Run JS/TS Code with enhanced error reporting
const runJsCode = async (
  code: string,
  isTs: boolean,
  input: string = ""
): Promise<ExecutionResult> => {
  return new Promise(resolve => {
    let output = "";
    const log = (...args: unknown[]) => {
      output +=
        args
          .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
          .join(" ") + "\n";
    };

    try {
      // TypeScript compile check with diagnostics
      let runnableCode = code;
      if (isTs) {
        const result = ts.transpileModule(code, {
          compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            strict: false,
          },
          reportDiagnostics: true,
        });

        if (result.diagnostics && result.diagnostics.length > 0) {
          const errors = result.diagnostics
            .filter(d => d.category === ts.DiagnosticCategory.Error)
            .map(d => {
              const message = ts.flattenDiagnosticMessageText(
                d.messageText,
                "\n"
              );
              const line = d.file
                ? d.file.getLineAndCharacterOfPosition(d.start || 0).line + 1
                : undefined;
              return { message, line };
            });

          if (errors.length > 0) {
            return resolve({
              output: "",
              error: errors
                .map(e => `Line ${e.line || "?"}: ${e.message}`)
                .join("\n"),
              status: "compile_error",
              errorLine: errors[0].line,
              errorType: "TypeScript Compile Error",
            });
          }
        }

        runnableCode = result.outputText;
      }

      // Mock stdin for JS
      const lines = input ? input.split("\n") : [];
      let lineIdx = 0;
      const readline = () => lines[lineIdx++] || "";

      const sandbox = {
        console: { log },
        readline, // Common method to read input
        print: log, // Convenience
      };

      const context = vm.createContext(sandbox);

      const script = new vm.Script(runnableCode);
      script.runInContext(context, { timeout: EXECUTION_TIMEOUT });

      resolve({ output: output.trim(), status: "accepted" });
    } catch (e: unknown) {
      const error = e as Error;
      const errorLine = extractLineNumber(error.message);
      const isSyntaxError = error.name === "SyntaxError";

      resolve({
        output: output.trim(),
        error: error.message,
        status: isSyntaxError ? "compile_error" : "runtime_error",
        errorLine,
        errorType: error.name,
      });
    }
  });
};

// Cross-platform Python command
const getPythonCommand = (): string => {
  return process.platform === "win32" ? "python" : "python3";
};

// Helper: Run Python Code with enhanced error reporting
const runPythonCode = async (
  code: string,
  input: string = ""
): Promise<ExecutionResult> => {
  return new Promise(resolve => {
    const tempFile = path.join(__dirname, `../../temp_${Date.now()}.py`);
    try {
      fs.writeFileSync(tempFile, code);
    } catch (e) {
      return resolve({
        output: "",
        error: "Server Error: Cannot write temp file",
        status: "internal_error",
        errorType: "System Error",
      });
    }

    const pythonCmd = getPythonCommand();
    const child = spawn(pythonCmd, [tempFile]);
    let output = "";
    let errorOutput = "";

    // Write input to stdin
    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    } else {
      child.stdin.end();
    }

    const timer = setTimeout(() => {
      child.kill();
      resolve({
        output: output.trim(),
        error: "Time Limit Exceeded",
        status: "time_limit_exceeded",
      });
      try {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      } catch (err) {
        // ignore cleanup errors
      }
    }, EXECUTION_TIMEOUT);

    child.stdout.on("data", data => {
      output += data.toString();
    });

    child.stderr.on("data", data => {
      errorOutput += data.toString();
    });

    child.on("close", code => {
      clearTimeout(timer);
      try {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      } catch (err) {
        // ignore cleanup errors
      }

      if (code === 0) {
        resolve({ output: output.trim(), status: "accepted" });
      } else {
        // Detect Python error type
        const errorText = errorOutput.trim();
        const isSyntaxError = errorText.includes("SyntaxError");
        const isNameError = errorText.includes("NameError");
        const errorLine = extractLineNumber(errorText);

        resolve({
          output: output.trim(),
          error: errorText,
          status: isSyntaxError ? "compile_error" : "runtime_error",
          errorLine,
          errorType: isSyntaxError
            ? "Python Syntax Error"
            : isNameError
              ? "Python Name Error"
              : "Python Runtime Error",
        });
      }
    });
  });
};

export const submitCode = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId, code, language, isRun, testInput } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1. If Run Code (Test Mode), just execute user code
    if (isRun) {
      let result: ExecutionResult = {
        output: "",
        status: "pending",
        error: "",
      };
      const inputStr = testInput || "";

      let codeToRun = code;
      // Auto-import common typing for Python to match LeetCode-like experience
      if (language === "python" && !code.includes("from typing import")) {
        codeToRun = "from typing import *\n" + code;
      }

      if (language === "javascript") {
        result = await runJsCode(codeToRun, false, inputStr);
      } else if (language === "typescript") {
        result = await runJsCode(codeToRun, true, inputStr);
      } else if (language === "python") {
        result = await runPythonCode(codeToRun, inputStr);
      } else {
        return res.status(400).json({ message: "Unsupported language" });
      }

      // If there's an execution error, return 422 instead of 200 if preferred,
      // but typically 200 is used for "request processed" even if code failed.
      // Given user request "vẫn hiển thị status code 200" is a bug:
      const httpStatus = result.status === "accepted" ? 200 : 422;

      return res.status(httpStatus).json({
        status: result.status,
        output: result.output,
        error: result.error,
        executionTime: 0,
        memoryUsage: 0,
        errorType: result.errorType,
        errorLine: result.errorLine,
      });
    }

    // 2. If Submit (Grading Mode)
    // Fetch hidden test cases
    // We explicitly import from Problem model now
    const { getTestCasesByProblemId } = await import("../models/Problem");
    const testCases = await getTestCasesByProblemId(problemId);

    // If no test cases exist, we can't really grade, but let's assume success or fail
    if (!testCases || testCases.length === 0) {
      // Fallback: Just run the code as is to check for syntax errors
      let codeToRun = code;
      if (language === "python" && !code.includes("from typing import")) {
        codeToRun = "from typing import *\n" + code;
      }

      const result =
        language === "python"
          ? await runPythonCode(codeToRun)
          : await runJsCode(codeToRun, language === "typescript");

      const status =
        result.status === "accepted" ? "accepted" : "runtime_error";

      // Save submission
      const submission = await SubmissionModel.createSubmission({
        user_id: userId,
        problem_id: problemId,
        code,
        language,
        status: status as SubmissionModel.Submission["status"],
        execution_time: 100,
        memory_usage: 1024,
      });

      return res.status(200).json({
        message: "Submission evaluated (No test cases found)",
        submissionId: submission.id,
        status: submission.status,
        output: result.output,
        error: result.error,
      });
    }

    // Identify Function Name (heuristic for JS/TS/Python)
    // Looks for "function name(" or "def name("
    let funcName = "twoSum"; // Default fallback
    const jsMatch = code.match(/function\s+(\w+)\s*\(/);
    const pyMatch = code.match(/def\s+(\w+)\s*\(/);

    if (language.includes("script") && jsMatch) funcName = jsMatch[1];
    if (language === "python" && pyMatch) funcName = pyMatch[1];

    let allPassed = true;
    let errorInfo = null;

    for (const tc of testCases) {
      // Construct Test Driver Code
      let verifyCode = code;

      // Remove any existing console.logs from user code to clean output?
      // Ideally we shouldn't modify user code, but we rely on stdout.
      // For this demo, we append the test call.

      if (language.includes("script")) {
        // Javascript/Typescript driver
        // We append: console.log(funcName(input))
        // We assume 'input' is formatted as valid args e.g. "[1,2], 3"
        verifyCode += `\nconsole.log(${funcName}(${tc.input}));`;
      } else if (language === "python") {
        // Python driver
        verifyCode += `\nprint(${funcName}(${tc.input}))`;
      }

      // Execute
      let result;
      let codeToRunForTC = verifyCode;
      if (language === "python" && !verifyCode.includes("from typing import")) {
        codeToRunForTC = "from typing import *\n" + verifyCode;
      }

      if (language === "javascript") {
        result = await runJsCode(codeToRunForTC, false);
      } else if (language === "typescript") {
        result = await runJsCode(codeToRunForTC, true);
      } else if (language === "python") {
        result = await runPythonCode(codeToRunForTC);
      } else {
        return res.status(400).json({ message: "Unsupported language" });
      }

      // Check result
      if (result.status !== "accepted") {
        allPassed = false;
        errorInfo = {
          message: "Runtime Error",
          output: result.output,
          error: result.error,
        };
        break;
      }

      // Compare Output (Trimmed)
      // Note: We need to handle potential console.logs inside user function affecting output
      // For now, we assume the LAST line of output is the result
      const lines = result.output.trim().split("\n");
      const lastLine = lines[lines.length - 1]; // Naive approach

      // Basic normalizer (remove spaces) for comparison
      const normalize = (s: string) => s.replace(/\s+/g, "");

      if (normalize(lastLine) !== normalize(tc.expected_output)) {
        allPassed = false;
        errorInfo = {
          message: "Wrong Answer",
          input: tc.input,
          expected: tc.expected_output,
          actual: lastLine,
        };
        break;
      }
    }

    const finalStatus = allPassed
      ? "accepted"
      : errorInfo?.message === "Runtime Error"
        ? "runtime_error"
        : "wrong_answer";

    // Persist
    const submission = await SubmissionModel.createSubmission({
      user_id: userId,
      problem_id: problemId,
      code,
      language,
      status: finalStatus as SubmissionModel.Submission["status"],
      execution_time: 120, // Mock
      memory_usage: 2048, // Mock
    });

    res.status(200).json({
      message: "Submission evaluated",
      submissionId: submission.id,
      status: submission.status,
      output: allPassed
        ? "All test cases passed!"
        : `Test Failed on input: ${errorInfo?.input}\nExpected: ${errorInfo?.expected}\nActual: ${errorInfo?.actual}`,
      error: errorInfo?.message === "Runtime Error" ? errorInfo?.error : null,
    });
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ submitCode error:", err.message);
    res.status(500).json({ message: "Error processing submission" });
  }
};

export const getUserSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const submissions = await SubmissionModel.getSubmissionsByUser(userId);
    res.json(submissions);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ getUserSubmissions error:", err.message);
    res.status(500).json({ message: "Error fetching submissions" });
  }
};
