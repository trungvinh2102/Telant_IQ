import { Response } from "express";
import * as SubmissionModel from "../models/Submission";
import { AuthRequest } from "../types";
import vm from "vm";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import * as ts from "typescript";

const EXECUTION_TIMEOUT = 5000; // 5 seconds constraint

// Helper: Run JS/TS Code
const runJsCode = async (
  code: string,
  isTs: boolean,
  input: string = ""
): Promise<{ output: string; error?: string; status: string }> => {
  return new Promise(resolve => {
    let output = "";
    const log = (...args: unknown[]) => {
      output +=
        args
          .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
          .join(" ") + "\n";
    };

    try {
      const runnableCode = isTs ? ts.transpile(code) : code;

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
      resolve({
        output: output.trim(),
        error: error.message,
        status: "runtime_error",
      });
    }
  });
};

// Helper: Run Python Code
const runPythonCode = async (
  code: string,
  input: string = ""
): Promise<{ output: string; error?: string; status: string }> => {
  return new Promise(resolve => {
    const tempFile = path.join(__dirname, `../../temp_${Date.now()}.py`);
    try {
      fs.writeFileSync(tempFile, code);
    } catch (e) {
      return resolve({
        output: "",
        error: "Server Error: Cannot write temp file",
        status: "internal_error",
      });
    }

    const child = spawn("python", [tempFile]);
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
        resolve({
          output: output.trim(),
          error: errorOutput.trim(),
          status: "runtime_error",
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

    // Execution logic with input support
    const inputStr = testInput || "";
    let result: { output: string; error?: string; status: string } = {
      output: "",
      status: "pending",
    };

    if (language === "javascript") {
      result = await runJsCode(code, false, inputStr);
    } else if (language === "typescript") {
      result = await runJsCode(code, true, inputStr);
    } else if (language === "python") {
      result = await runPythonCode(code, inputStr);
    } else {
      return res.status(400).json({ message: "Unsupported language" });
    }

    // If it's just a Run (Test) action, return result without saving to DB (or save as temporary)
    if (isRun) {
      return res.status(200).json({
        status: result.status,
        output: result.output,
        error: result.error,
        executionTime: 0, // Mock
        memoryUsage: 0, // Mock
      });
    }

    // If Submit, allow specific logic (e.g. grading against hidden tests)
    // For now, we trust the run result or randomize "Accepted" like before if no real judge exists?
    // Let's stick to the previous simulation logic BUT use the real execution for "Run".
    // Actually, let's use the real execution status for Submit too, assuming "Accepted" means "Ran without error" for this scope.

    const submission = await SubmissionModel.createSubmission({
      user_id: userId,
      problem_id: problemId,
      code,
      language,
      status: result.status as SubmissionModel.Submission["status"],
      execution_time: 100, // mock
      memory_usage: 1024, // mock
    });

    res.status(200).json({
      message: "Submission evaluated",
      submissionId: submission.id,
      status: submission.status,
      output: result.output,
      error: result.error,
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
