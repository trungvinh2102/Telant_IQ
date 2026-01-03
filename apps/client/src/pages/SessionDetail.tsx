import {
  Code2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  Settings,
  MessageSquare,
  ChevronDown,
  Play,
  Maximize2,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

interface SessionDetailProps {
  onBack: () => void;
  sessionId?: string | null;
}

export default function SessionDetail({
  onBack,
  // sessionId,
}: SessionDetailProps) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-background text-foreground overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between h-12 px-4 border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 gap-2 pr-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            >
              LIVE
            </Badge>
            <span className="text-sm font-medium">
              Technical Interview - John Doe
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            Room: AB-1234
          </Badge>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* LEFT PANEL: PROBLEM DESCRIPTION */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="border-r bg-card border-border"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded text-primary bg-primary/20">
                  <Code2 size={14} />
                </div>
                <span className="font-semibold">Two Sum</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/10 hover:bg-primary/20"
                >
                  {t("pages.session.problemPanel.difficulty.easy")}
                </Badge>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="mb-2 text-xl font-bold">
                    {t("pages.session.problemPanel.description")}
                  </h2>
                  <div className="p-4 text-sm leading-relaxed border rounded-lg bg-muted border-border text-muted-foreground">
                    <p>
                      Given an array of integers{" "}
                      <code className="text-primary">nums</code> and an integer{" "}
                      <code className="text-primary">target</code>, return
                      indices of the two numbers such that they add up to{" "}
                      <code className="text-primary">target</code>.
                    </p>
                    <p className="mt-2">
                      You may assume that each input would have{" "}
                      <strong>exactly one solution</strong>, and you may not use
                      the same element twice.
                    </p>
                    <p className="mt-2">
                      You can return the answer in any order.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                    {t("pages.session.problemPanel.examples")}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 text-sm border rounded-md bg-muted border-border">
                      <div className="mb-1 font-medium text-foreground">
                        {t("pages.session.problemPanel.example")} 1:
                      </div>
                      <div className="pl-2 border-l-2 border-primary/30">
                        <div className="text-muted-foreground">
                          {t("pages.session.problemPanel.input")}:{" "}
                          <span className="font-mono text-foreground">
                            nums = [2,7,11,15], target = 9
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {t("pages.session.problemPanel.output")}:{" "}
                          <span className="font-mono text-foreground">
                            [0,1]
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {t("pages.session.problemPanel.explanation")}: Because
                          nums[0] + nums[1] == 9, we return [0, 1].
                        </div>
                      </div>
                    </div>

                    <div className="p-3 text-sm border rounded-md bg-muted border-border">
                      <div className="mb-1 font-medium text-foreground">
                        {t("pages.session.problemPanel.example")} 2:
                      </div>
                      <div className="pl-2 border-l-2 border-primary/30">
                        <div className="text-muted-foreground">
                          {t("pages.session.problemPanel.input")}:{" "}
                          <span className="font-mono text-foreground">
                            nums = [3,2,4], target = 6
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {t("pages.session.problemPanel.output")}:{" "}
                          <span className="font-mono text-foreground">
                            [1,2]
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                    {t("pages.session.problemPanel.constraints")}
                  </h3>
                  <ul className="pl-5 space-y-1 text-sm list-disc text-muted-foreground marker:text-muted-foreground/50">
                    <li>
                      <code className="px-1 text-xs rounded bg-muted">
                        2 &lt;= nums.length &lt;= 10^4
                      </code>
                    </li>
                    <li>
                      <code className="px-1 text-xs rounded bg-muted">
                        -10^9 &lt;= nums[i] &lt;= 10^9
                      </code>
                    </li>
                    <li>
                      <code className="px-1 text-xs rounded bg-muted">
                        -10^9 &lt;= target &lt;= 10^9
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-border w-[1px]" />

        {/* MIDDLE PANEL: CODE EDITOR */}
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="relative flex flex-col bg-muted/30"
        >
          {/* Editor Header */}
          <div className="flex items-center justify-between h-12 px-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-muted-foreground h-7 hover:text-foreground"
              >
                <span className="text-blue-400">JS</span> JavaScript{" "}
                <ChevronDown size={12} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="h-7 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 rounded text-xs"
              >
                <Play size={12} fill="currentColor" />{" "}
                {t("pages.session.editor.runCode")}
              </Button>
            </div>
          </div>

          {/* Editor Area (Mock) */}
          <div className="relative flex-1 font-mono text-sm">
            <div className="absolute inset-0 flex">
              <div className="w-12 pt-4 pr-3 leading-6 text-right border-r select-none bg-card border-border text-muted-foreground">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1 p-4 leading-6 text-foreground bg-muted/30">
                <div className="text-purple-400">
                  class <span className="text-yellow-300">Solution</span>{" "}
                  <span className="text-foreground">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">/**</span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">
                    &nbsp;* @param {`{number[]}`} nums
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">
                    &nbsp;* @param {`{number}`} target
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">
                    &nbsp;* @return {`{number[]}`}
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-muted-foreground">&nbsp;*/</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">twoSum</span>
                  <span className="text-foreground">(nums, target) {`{`}</span>
                </div>
                <div className="pl-8 text-muted-foreground">
                  // Write your code here...
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">const</span> map ={" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-yellow-300">Map</span>();
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">for</span> (
                  <span className="text-purple-400">let</span> i = 0; i &lt;
                  nums.length; i++) {`{`}
                </div>
                <div className="pl-12">
                  <span className="text-purple-400">const</span> diff = target -
                  nums[i];
                </div>
                <div className="pl-12">
                  <span className="text-purple-400">if</span> (map.has(diff)){" "}
                  {`{`}
                </div>
                <div className="pl-16">
                  <span className="text-purple-400">return</span>{" "}
                  [map.get(diff), i];
                </div>
                <div className="pl-12">{`}`}</div>
                <div className="pl-12">map.set(nums[i], i);</div>
                <div className="pl-8">{`}`}</div>
                <div className="pl-4">{`}`}</div>
                <div className="text-foreground">{`}`}</div>
              </div>
            </div>

            {/* Floating Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-full bg-card border border-border shadow-xl z-20">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  micOn
                    ? "text-foreground hover:bg-muted"
                    : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                )}
                onClick={() => setMicOn(!micOn)}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  videoOn
                    ? "text-foreground hover:bg-muted"
                    : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                )}
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </Button>
              <Separator
                orientation="vertical"
                className="h-6 mx-1 bg-border"
              />
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full text-foreground hover:bg-muted"
                title={t("pages.session.controls.shareScreen")}
              >
                <MonitorUp size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full text-foreground hover:bg-muted"
                title={t("pages.session.controls.settings")}
              >
                <Settings size={18} />
              </Button>
              <Button
                size="icon"
                className="w-10 h-10 text-white bg-red-600 rounded-full shadow-lg hover:bg-red-700"
                title={t("pages.session.controls.endCall")}
              >
                <PhoneOff size={18} />
              </Button>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-border w-[1px]" />

        {/* RIGHT PANEL: VIDEO / CHAT */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="flex flex-col bg-card"
        >
          <div className="flex items-center justify-between h-12 px-4 border-b border-border">
            <span className="text-sm font-semibold">
              {t("pages.session.videoChat.sessionChat")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground"
            >
              <Maximize2 size={16} />
            </Button>
          </div>

          <div className="flex flex-col flex-1 gap-4 p-4">
            {/* Participant Video Mock */}
            <div className="relative overflow-hidden border rounded-lg bg-muted border-border aspect-video group">
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-blue-500 border rounded-full bg-blue-500/20 border-blue-500/30">
                  C
                </div>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur flex items-center gap-1">
                  <MicOff size={10} className="text-red-400" />
                  {t("pages.session.videoChat.candidate")}
                </div>
              </div>
            </div>

            {/* Self Video Mock */}
            <div className="relative overflow-hidden border rounded-lg bg-muted border-border aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex items-center justify-center w-12 h-12 text-xl font-bold border rounded-full text-primary bg-primary/20 border-primary/30">
                  You
                </div>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur">
                  {t("pages.session.videoChat.you")}
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Chat Area Mock */}
            <ScrollArea className="flex-1">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] flex-shrink-0">
                    C
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 mb-0.5">
                      {t("pages.session.videoChat.candidate")}{" "}
                      <span className="text-muted-foreground text-[10px] ml-1">
                        10:42 AM
                      </span>
                    </div>
                    <div className="p-2 text-sm rounded-lg rounded-tl-none text-foreground bg-muted">
                      Just running current test cases...
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] flex-shrink-0">
                    You
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-primary mb-0.5">
                      {t("pages.session.videoChat.you")}{" "}
                      <span className="text-muted-foreground text-[10px] ml-1">
                        10:43 AM
                      </span>
                    </div>
                    <div className="p-2 text-sm border rounded-lg rounded-tr-none text-foreground bg-primary/10 border-primary/20">
                      Looks correct! Check edge cases.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t("pages.session.videoChat.typeMessage")}
                className="w-full bg-background border border-border rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 pr-10 hover:border-muted-foreground transition-colors"
              />
              <Button
                size="icon"
                className="absolute rounded-full text-primary-foreground bg-primary right-1 top-1 h-7 w-7 hover:bg-primary/90"
              >
                <MessageSquare size={14} />
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
