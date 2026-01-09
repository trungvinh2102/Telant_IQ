import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Play,
  Terminal,
  Info,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { problemService } from "@/services/modules/problem.service";
import { submissionService } from "@/services/modules/submission.service";
import type { ExecutionStatus, Problem, SubmissionResult } from "@/types";
import { StatusBanner } from "@/components/feature/StatusBanner";
import { ApiError } from "@/services/api/errors";

interface ProblemExample {
  id?: number;
  input: string;
  output: string;
  explanation?: string;
}

interface TestCase {
  id: number;
  input: string;
  output: string;
  isCustom?: boolean;
}

// Language configuration
const LANGUAGE_CONFIG = {
  javascript: {
    label: "JavaScript",
    badge: "JS",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  typescript: {
    label: "TypeScript",
    badge: "TS",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  python: {
    label: "Python",
    badge: "PY",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
} as const;

type SupportedLanguage = keyof typeof LANGUAGE_CONFIG;

export default function ProblemDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [executionStatus, setExecutionStatus] =
    useState<ExecutionStatus>("idle");
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const [activeTab, setActiveTab] = useState("testcases");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  const [testCaseInput, setTestCaseInput] = useState("");

  // Load problem data
  useEffect(() => {
    if (!slug) return;
    const loadProblem = async () => {
      try {
        const data = await problemService.fetchProblem(slug);
        setProblem(data);

        let skeleton = data.skeleton_code as unknown;
        if (typeof skeleton === "string") {
          try {
            skeleton = JSON.parse(skeleton);
          } catch (e) {
            console.error("Failed to parse skeleton", e);
          }
        }

        if (skeleton && (skeleton as Record<string, string>)[language]) {
          setCode((skeleton as Record<string, string>)[language] || "");
        }

        // Initialize Test Cases from examples
        let examples = data.examples as unknown;
        if (typeof examples === "string") {
          try {
            examples = JSON.parse(examples);
          } catch (e) {
            console.error("Failed to parse examples", e);
          }
        }

        if (Array.isArray(examples) && examples.length > 0) {
          const exList = examples as ProblemExample[];
          const initialTestCases: TestCase[] = exList.map((ex, idx) => ({
            id: idx,
            input: ex.input || "",
            output: ex.output || "",
            isCustom: false,
          }));
          setTestCases(initialTestCases);
          setTestCaseInput(initialTestCases[0]?.input || "");
        }
      } catch (error) {
        console.error("Failed to load problem", error);
      }
    };
    loadProblem();
  }, [slug, language]);

  // Update code when language changes
  useEffect(() => {
    if (problem?.skeleton_code) {
      let skeleton = problem.skeleton_code as unknown;
      if (typeof skeleton === "string") {
        try {
          skeleton = JSON.parse(skeleton);
        } catch (e) {
          console.error("An error occurred: ", { e });
        }
      }

      if ((skeleton as Record<string, string>)[language]) {
        setCode((skeleton as Record<string, string>)[language] || "");
      }
    }
  }, [language, problem]);

  const handleRun = useCallback(async () => {
    if (!problem) return;
    setExecutionStatus("running");
    setSubmissionResult(null);
    setActiveTab("output");

    try {
      const res = await submissionService.createSubmission({
        problem_id: problem.id as string,
        code,
        language,
        isRun: true,
        testInput: testCaseInput,
      });

      let resultOutput = res.output || "";
      const status = (res.status as ExecutionStatus) || "accepted";

      if (res.error) {
        resultOutput = resultOutput
          ? resultOutput + "\n" + res.error
          : res.error;
      }
      setOutput(resultOutput);
      setExecutionStatus(status);
      setSubmissionResult({
        status: status,
        error: res.error,
        output: res.output,
      });
    } catch (error: unknown) {
      if (ApiError.isApiError(error) && error.status === 422 && error.details) {
        const details = error.details as SubmissionResult & { output?: string };
        const resultOutput = details.output || "";
        const errorMsg = details.error || "";
        const status = details.status as ExecutionStatus;

        setOutput(resultOutput ? resultOutput + "\n" + errorMsg : errorMsg);
        setExecutionStatus(status);
        setSubmissionResult({
          status: status,
          error: errorMsg,
          output: resultOutput,
        });
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setOutput("Error executing code: " + errorMessage);
        setExecutionStatus("internal_error");
        setSubmissionResult({
          status: "internal_error",
          error: errorMessage,
        });
      }
    }
  }, [problem, code, language, testCaseInput, t]);

  const handleSubmit = useCallback(async () => {
    if (!problem) return;
    setExecutionStatus("submitting");
    setSubmissionResult(null);
    setActiveTab("output");
    setOutput(null);

    try {
      const res = await submissionService.createSubmission({
        problem_id: problem.id as string,
        code,
        language,
        isRun: false,
      });

      const status = (res.status as ExecutionStatus) || "accepted";
      setExecutionStatus(status);

      const result = {
        status: status,
        message:
          status === "accepted"
            ? t("pages.problemDetail.allTestsPassed")
            : t("pages.problemDetail.testFailed"),
        error: res.error,
        output: res.output,
      };

      setSubmissionResult(result);
      setOutput(res.output || "");
    } catch (error: unknown) {
      if (ApiError.isApiError(error) && error.status === 422 && error.details) {
        const details = error.details as SubmissionResult;
        setExecutionStatus(details.status as ExecutionStatus);
        setSubmissionResult(details);
        setOutput(details.output || "");
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setExecutionStatus("internal_error");
        setSubmissionResult({
          status: "internal_error",
          message: "Network Error",
          error: errorMessage,
        });
        setOutput(errorMessage);
      }
    }
  }, [problem, code, language, t]);

  const handleResetCode = useCallback(() => {
    if (
      problem?.skeleton_code &&
      typeof problem.skeleton_code[language] === "string"
    ) {
      setCode((problem.skeleton_code[language] as string) || "");
    }
  }, [problem, language]);

  const handleAddTestCase = useCallback(() => {
    const newId = testCases.length;
    const newTestCase: TestCase = {
      id: newId,
      input: "",
      output: "",
      isCustom: true,
    };
    setTestCases([...testCases, newTestCase]);
    setActiveTestCaseId(newId);
    setTestCaseInput("");
  }, [testCases]);

  const handleDeleteTestCase = useCallback(
    (id: number) => {
      const updatedCases = testCases
        .filter(tc => tc.id !== id)
        .map((tc, idx) => ({ ...tc, id: idx }));
      setTestCases(updatedCases);
      if (activeTestCaseId >= updatedCases.length) {
        setActiveTestCaseId(Math.max(0, updatedCases.length - 1));
      }
      if (updatedCases.length > 0) {
        setTestCaseInput(
          updatedCases[Math.min(activeTestCaseId, updatedCases.length - 1)]
            ?.input || ""
        );
      }
    },
    [testCases, activeTestCaseId]
  );

  const handleCopyExample = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
  }, []);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="animate-spin text-primary" />
        <div className="font-mono text-xs text-muted-foreground">
          Loading Problem: {slug}
        </div>
      </div>
    );
  }

  // Safe Casts for mock/db types
  const examples = (problem.examples || []) as unknown as ProblemExample[];
  const tags = problem.tags || [];
  const currentLangConfig = LANGUAGE_CONFIG[language];
  const isExecuting =
    executionStatus === "running" || executionStatus === "submitting";

  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-background text-foreground overflow-hidden flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* LEFT PANEL: PROBLEM DESCRIPTION */}
        <ResizablePanel
          defaultSize={45}
          minSize={30}
          className="border-r border-border bg-card/50"
        >
          <div className="flex flex-col h-full">
            {/* Header / Problem Selector */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight">
                    {problem.title}
                  </h1>
                  <Badge
                    variant="outline"
                    className="capitalize bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium bg-muted px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Select defaultValue={problem.title}>
                <SelectTrigger className="w-[180px] h-8 text-xs bg-muted/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={problem.title}>{problem.title}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-8">
                {/* DescriptionSection */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Info size={18} className="text-primary" />
                    <h2 className="text-lg font-semibold">
                      {t("pages.session.problemPanel.description")}
                    </h2>
                  </div>
                  <div
                    className="p-4 text-sm leading-relaxed border text-muted-foreground bg-muted/30 rounded-xl border-border/50"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </section>

                {/* Examples Section */}
                {Array.isArray(examples) && examples.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-primary" />
                      <h2 className="text-lg font-semibold">
                        {t("pages.session.problemPanel.examples")}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {examples.map((example, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                              {idx + 1}
                            </span>
                            Example {idx + 1}
                          </h3>
                          <div className="relative p-4 text-sm border shadow-sm rounded-xl bg-card border-border group">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute transition-opacity opacity-0 top-2 right-2 w-7 h-7 group-hover:opacity-100"
                              title="Copy input"
                              onClick={() => handleCopyExample(example.input)}
                            >
                              <Copy size={12} />
                            </Button>
                            <div className="space-y-3 font-mono text-[13px]">
                              <div className="flex gap-2">
                                <span className="text-emerald-500 font-bold min-w-[60px]">
                                  {t("pages.problemDetail.input")}:
                                </span>
                                <span className="text-foreground">
                                  {example.input}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-blue-500 font-bold min-w-[60px]">
                                  {t("pages.problemDetail.output")}:
                                </span>
                                <span className="text-foreground">
                                  {example.output}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Constraints Section */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <section className="pb-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-primary" />
                      <h2 className="text-lg font-semibold">
                        {t("pages.session.problemPanel.constraints")}
                      </h2>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {problem.constraints.map((constraint, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 p-2 text-xs border rounded-lg bg-muted/50 border-border/30 text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          <code className="font-mono text-foreground">
                            {constraint}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-1.5 transition-colors bg-border hover:bg-primary/30 data-[resize-handle-active]:bg-primary/50" />

        {/* RIGHT PANEL: EDITOR & OUTPUT */}
        <ResizablePanel defaultSize={55} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* TOP RIGHT: CODE EDITOR */}
            <ResizablePanel
              defaultSize={65}
              minSize={25}
              className="flex flex-col transition-colors bg-slate-50 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between h-12 px-4 border-b border-border dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {/* Language Badge */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded ${currentLangConfig.bgColor} ${currentLangConfig.color}`}
                  >
                    <span className="text-[10px] font-bold">
                      {currentLangConfig.badge}
                    </span>
                  </div>
                  <Select
                    value={language}
                    onValueChange={val => setLanguage(val as SupportedLanguage)}
                  >
                    <SelectTrigger className="h-7 border-none bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-xs text-slate-600 dark:text-slate-300 w-[120px] focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover dark:bg-slate-900 border-border dark:border-white/10 text-popover-foreground dark:text-slate-300">
                      <SelectItem value="javascript">
                        {t("pages.problemDetail.javascript")}
                      </SelectItem>
                      <SelectItem value="typescript">
                        {t("pages.problemDetail.typescript")}
                      </SelectItem>
                      <SelectItem value="python">
                        {t("pages.problemDetail.python")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-md text-slate-500 dark:text-slate-400 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    title={t("pages.problemDetail.resetCode")}
                    onClick={handleResetCode}
                  >
                    <RotateCcw size={14} />
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 gap-2 px-4 text-white transition-all border-none rounded-md shadow-lg bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20 active:scale-95"
                    onClick={handleRun}
                    disabled={isExecuting}
                  >
                    {executionStatus === "running" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play size={14} fill="currentColor" />
                    )}
                    <span className="font-semibold">
                      {t("pages.problemDetail.runCode")}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 gap-2 px-4 text-white transition-all bg-blue-600 border-none rounded-md shadow-lg hover:bg-blue-500 shadow-blue-900/20 active:scale-95"
                    onClick={handleSubmit}
                    disabled={isExecuting}
                  >
                    {executionStatus === "submitting" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    <span className="font-semibold">
                      {t("pages.problemDetail.submit")}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-[#1e1e1e]">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  theme={
                    theme === "dark" || theme === "system" ? "vs-dark" : "light"
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    tabSize: 2,
                    renderWhitespace: "selection",
                    guides: {
                      indentation: true,
                      bracketPairs: true,
                    },
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                  }}
                  onChange={value => setCode(value || "")}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-full h-1.5 transition-colors bg-border hover:bg-primary/30 data-[resize-handle-active]:bg-primary/50" />

            {/* BOTTOM RIGHT: OUTPUT */}
            <ResizablePanel
              defaultSize={35}
              minSize={15}
              className="flex flex-col bg-card"
            >
              <div className="flex items-center h-10 px-4 border-b border-border bg-muted/30">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="flex items-center justify-between">
                    <TabsList className="h-8 gap-4 p-0 bg-transparent">
                      <TabsTrigger
                        value="output"
                        className="h-8 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs gap-2"
                      >
                        <Terminal size={12} />
                        {t("pages.problemDetail.output")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="testcases"
                        className="h-8 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs gap-2"
                      >
                        {t("pages.problemDetail.testCases")}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                {activeTab === "output" && (
                  <>
                    {/* Status Banner */}
                    {submissionResult && (
                      <StatusBanner
                        result={submissionResult}
                        t={t}
                        status={executionStatus}
                      />
                    )}

                    {/* Idle state */}
                    {!output &&
                      !isExecuting &&
                      !submissionResult &&
                      executionStatus === "idle" && (
                        <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50 text-muted-foreground">
                          <Terminal size={32} strokeWidth={1} />
                          <p className="text-xs">
                            {t("pages.problemDetail.runToSeeOutput")}
                          </p>
                        </div>
                      )}

                    {/* Running/Submitting state */}
                    {isExecuting && (
                      <div className="flex items-center gap-3 text-primary animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          {executionStatus === "running"
                            ? t("pages.problemDetail.executing")
                            : t("pages.problemDetail.evaluating")}
                        </span>
                      </div>
                    )}

                    {/* Output display */}
                    {output && !isExecuting && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-muted-foreground">
                          {t("pages.problemDetail.consoleOutput")}:
                        </div>
                        <pre className="p-3 text-xs leading-loose whitespace-pre-wrap border rounded-lg text-muted-foreground bg-muted border-border">
                          {output}
                        </pre>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "testcases" && (
                  <div className="flex flex-col h-full gap-4">
                    {/* Test Case Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                      {testCases.map(tc => (
                        <div key={tc.id} className="relative group">
                          <Button
                            variant={
                              activeTestCaseId === tc.id ? "secondary" : "ghost"
                            }
                            size="sm"
                            onClick={() => {
                              setActiveTestCaseId(tc.id);
                              setTestCaseInput(tc.input);
                            }}
                            className="pr-6 text-xs h-7"
                          >
                            {t("pages.problemDetail.case")} {tc.id + 1}
                            {tc.isCustom && (
                              <span className="ml-1 text-[10px] text-primary">
                                ({t("pages.problemDetail.customTestCase")})
                              </span>
                            )}
                          </Button>
                          {tc.isCustom && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute w-4 h-4 transition-opacity rounded-full opacity-0 -right-1 -top-1 bg-destructive/80 text-destructive-foreground group-hover:opacity-100"
                              onClick={e => {
                                e.stopPropagation();
                                handleDeleteTestCase(tc.id);
                              }}
                            >
                              <Trash2 size={10} />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs h-7"
                        onClick={handleAddTestCase}
                      >
                        <Plus size={12} />
                        {t("pages.problemDetail.addTestCase")}
                      </Button>
                    </div>

                    {/* Test Case Input/Output */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground">
                          {t("pages.problemDetail.input")}
                        </label>
                        <textarea
                          className="w-full h-20 p-3 font-mono text-xs border rounded-md resize-none bg-muted/50 border-border focus:outline-none focus:ring-1 focus:ring-primary"
                          value={testCaseInput}
                          onChange={e => {
                            setTestCaseInput(e.target.value);
                            // Update the test case
                            const updated = testCases.map(tc =>
                              tc.id === activeTestCaseId
                                ? { ...tc, input: e.target.value }
                                : tc
                            );
                            setTestCases(updated);
                          }}
                          placeholder="Enter test input..."
                        />
                      </div>
                      {testCases[activeTestCaseId] && (
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground">
                            {t("pages.problemDetail.expectedOutput")}
                          </label>
                          <div className="p-3 font-mono text-xs border rounded-md bg-muted/30 border-border text-muted-foreground min-h-[40px]">
                            {testCases[activeTestCaseId].output ||
                              (testCases[activeTestCaseId].isCustom
                                ? "(Custom test - no expected output)"
                                : "")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
