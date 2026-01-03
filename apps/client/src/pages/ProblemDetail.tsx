import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Play,
  Terminal,
  Info,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
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

export default function ProblemDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Mock problem data - in a real app this would come from an API
  const problem = {
    id: id || "1",
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers <code class="text-primary">nums</code> and an integer <code class="text-primary">target</code>, return indices of the two numbers in the array such that they add up to <code class="text-primary">target</code>.
    <br/><br/>
    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
    <br/><br/>
    You can return the answer in any order.`,
    examples: [
      {
        id: 1,
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        id: 3,
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput("All test cases passed!\nRuntime: 72ms\nMemory: 42.1MB");
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-background text-foreground overflow-hidden flex flex-col">
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
                    {t(
                      `pages.session.problemPanel.difficulty.${problem.difficulty}`
                    )}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {problem.tags.map(tag => (
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
                  <SelectItem value="Two Sum">Two Sum - Easy</SelectItem>
                  <SelectItem value="Add Two Numbers">
                    Add Two Numbers - Medium
                  </SelectItem>
                  <SelectItem value="Longest Substring">
                    Longest Substring - Medium
                  </SelectItem>
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
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    <h2 className="text-lg font-semibold">
                      {t("pages.session.problemPanel.examples")}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {problem.examples.map(example => (
                      <div key={example.id} className="space-y-2">
                        <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                          <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                            {example.id}
                          </span>
                          {t("pages.session.problemPanel.example")} {example.id}
                        </h3>
                        <div className="relative p-4 text-sm border shadow-sm rounded-xl bg-card border-border group">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute transition-opacity opacity-0 top-2 right-2 w-7 h-7 group-hover:opacity-100"
                            title="Copy input"
                          >
                            <Copy size={12} />
                          </Button>
                          <div className="space-y-3 font-mono text-[13px]">
                            <div className="flex gap-2">
                              <span className="text-emerald-500 font-bold min-w-[60px]">
                                {t("pages.session.problemPanel.input")}:
                              </span>
                              <span className="text-foreground">
                                {example.input}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-blue-500 font-bold min-w-[60px]">
                                {t("pages.session.problemPanel.output")}:
                              </span>
                              <span className="text-foreground">
                                {example.output}
                              </span>
                            </div>
                            {example.explanation && (
                              <div className="pt-2 mt-2 text-xs leading-normal border-t border-border/50 text-muted-foreground">
                                <span className="block mb-1 font-sans italic tracking-tighter uppercase opacity-70">
                                  {t("pages.session.problemPanel.explanation")}:
                                </span>
                                {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Constraints Section */}
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
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-1 transition-colors bg-border hover:bg-primary/20" />

        {/* RIGHT PANEL: EDITOR & OUTPUT */}
        <ResizablePanel defaultSize={55} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* TOP RIGHT: CODE EDITOR */}
            <ResizablePanel
              defaultSize={70}
              minSize={30}
              className="flex flex-col transition-colors bg-slate-50 dark:bg-slate-950"
            >
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between h-12 px-4 border-b border-border dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 text-yellow-500 rounded bg-yellow-500/20">
                    <span className="text-[10px] font-bold">JS</span>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-7 border-none bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-xs text-slate-600 dark:text-slate-300 w-[120px] focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover dark:bg-slate-900 border-border dark:border-white/10 text-popover-foreground dark:text-slate-300">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-md text-slate-500 dark:text-slate-400 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    title="Reset to default"
                  >
                    <RotateCcw size={14} />
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 gap-2 px-4 text-white transition-all border-none rounded-md shadow-lg bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20 active:scale-95"
                    onClick={runCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Play size={14} fill="currentColor" />
                    )}
                    <span className="font-semibold">
                      {t("pages.session.editor.runCode")}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Editor Content Area (Fake Monaco) */}
              <div className="flex-1 relative font-mono text-[13px] overflow-hidden">
                <div className="absolute inset-0 flex">
                  {/* Line Numbers */}
                  <div className="w-12 pt-4 pr-3 leading-6 text-right border-r select-none bg-slate-100/50 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 border-border dark:border-white/5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Code Body */}
                  <div className="flex-1 p-4 overflow-y-auto leading-6 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
                    <div className="text-indigo-600 dark:text-indigo-400">
                      function{" "}
                      <span className="text-amber-600 dark:text-yellow-400">
                        twoSum
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        (nums, target) {`{`}
                      </span>
                    </div>
                    <div className="pl-4 italic text-slate-400 dark:text-slate-500">
                      // Your solution here
                    </div>
                    <div className="pl-4 mt-2">
                      <span className="text-slate-500 dark:text-slate-400">
                        const
                      </span>{" "}
                      map ={" "}
                      <span className="text-indigo-600 dark:text-indigo-400">
                        new
                      </span>{" "}
                      <span className="text-amber-600 dark:text-yellow-400">
                        Map
                      </span>
                      ();
                    </div>
                    <div className="pl-4 mt-4 text-emerald-500/80">
                      // Test cases
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-500 dark:text-slate-400">
                        console
                      </span>
                      .
                      <span className="text-indigo-600 dark:text-indigo-400">
                        log
                      </span>
                      (twoSum([2, 7, 11, 15], 9));{" "}
                      <span className="text-slate-400 dark:text-slate-500">
                        // Expected: [0, 1]
                      </span>
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-500 dark:text-slate-400">
                        console
                      </span>
                      .
                      <span className="text-indigo-600 dark:text-indigo-400">
                        log
                      </span>
                      (twoSum([3, 2, 4], 6));{" "}
                      <span className="text-slate-400 dark:text-slate-500">
                        // Expected: [1, 2]
                      </span>
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-500 dark:text-slate-400">
                        console
                      </span>
                      .
                      <span className="text-indigo-600 dark:text-indigo-400">
                        log
                      </span>
                      (twoSum([3, 3], 6));{" "}
                      <span className="text-slate-400 dark:text-slate-500">
                        // Expected: [0, 1]
                      </span>
                    </div>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">{`}`}</div>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle className="h-1 transition-colors bg-border hover:bg-primary/20" />

            {/* BOTTOM RIGHT: OUTPUT */}
            <ResizablePanel
              defaultSize={30}
              minSize={15}
              className="flex flex-col bg-card"
            >
              <div className="flex items-center h-10 px-4 border-b border-border bg-muted/30">
                <Tabs defaultValue="output" className="w-full">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-8 gap-4 p-0 bg-transparent">
                      <TabsTrigger
                        value="output"
                        className="h-8 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs gap-2"
                      >
                        <Terminal size={12} />
                        Output
                      </TabsTrigger>
                      <TabsTrigger
                        value="testcases"
                        className="h-8 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs gap-2"
                      >
                        Test Cases
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                {!output && !isRunning && (
                  <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50 text-muted-foreground">
                    <Terminal size={32} strokeWidth={1} />
                    <p className="text-xs">
                      Click "Run Code" to see the output here...
                    </p>
                  </div>
                )}

                {isRunning && (
                  <div className="flex items-center gap-3 text-primary animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Executing code...</span>
                  </div>
                )}

                {output && !isRunning && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2 font-bold text-emerald-500">
                      <CheckCircle2 size={16} />
                      Solution Accepted
                    </div>
                    <pre className="p-3 text-xs leading-loose whitespace-pre-wrap border rounded-lg text-muted-foreground bg-muted border-border">
                      {output}
                    </pre>
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
