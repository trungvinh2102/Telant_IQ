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
} from "lucide-react";
import { useState } from "react";

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

export default function Session() {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      {/* Top Bar - Simplified for Session specific actions if needed, otherwise rely on MainLayout header */}
      {/* Assuming MainLayout header is present, but we might want a session specific sub-header or just the content */}

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* LEFT PANEL: PROBLEM DESCRIPTION */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="bg-[#111111] border-r border-gray-800"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-green-500 rounded bg-green-500/20">
                  <Code2 size={14} />
                </div>
                <span className="font-semibold">Two Sum</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500/20 bg-green-500/10 hover:bg-green-500/20"
                >
                  Easy
                </Badge>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="mb-2 text-xl font-bold">Description</h2>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-sm text-gray-300 leading-relaxed">
                    <p>
                      Given an array of integers{" "}
                      <code className="text-green-400">nums</code> and an
                      integer <code className="text-green-400">target</code>,
                      return indices of the two numbers such that they add up to{" "}
                      <code className="text-green-400">target</code>.
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
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                    Examples
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[#1a1a1a] p-3 rounded-md border border-gray-800 text-sm">
                      <div className="mb-1 font-medium text-white">
                        Example 1:
                      </div>
                      <div className="pl-2 border-l-2 border-green-500/30">
                        <div className="text-gray-400">
                          Input:{" "}
                          <span className="font-mono text-gray-200">
                            nums = [2,7,11,15], target = 9
                          </span>
                        </div>
                        <div className="text-gray-400">
                          Output:{" "}
                          <span className="font-mono text-gray-200">[0,1]</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Explanation: Because nums[0] + nums[1] == 9, we return
                          [0, 1].
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-3 rounded-md border border-gray-800 text-sm">
                      <div className="mb-1 font-medium text-white">
                        Example 2:
                      </div>
                      <div className="pl-2 border-l-2 border-green-500/30">
                        <div className="text-gray-400">
                          Input:{" "}
                          <span className="font-mono text-gray-200">
                            nums = [3,2,4], target = 6
                          </span>
                        </div>
                        <div className="text-gray-400">
                          Output:{" "}
                          <span className="font-mono text-gray-200">[1,2]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                    Constraints
                  </h3>
                  <ul className="pl-5 space-y-1 text-sm text-gray-300 list-disc marker:text-gray-600">
                    <li>
                      <code className="px-1 text-xs bg-gray-800 rounded">
                        2 &lt;= nums.length &lt;= 10^4
                      </code>
                    </li>
                    <li>
                      <code className="px-1 text-xs bg-gray-800 rounded">
                        -10^9 &lt;= nums[i] &lt;= 10^9
                      </code>
                    </li>
                    <li>
                      <code className="px-1 text-xs bg-gray-800 rounded">
                        -10^9 &lt;= target &lt;= 10^9
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-gray-800 w-[1px]" />

        {/* MIDDLE PANEL: CODE EDITOR */}
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="bg-[#0f0f0f] relative flex flex-col"
        >
          {/* Editor Header */}
          <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-[#111111]">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-gray-400 h-7 hover:text-white"
              >
                <span className="text-blue-400">JS</span> JavaScript{" "}
                <ChevronDown size={12} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="h-7 gap-1.5 bg-green-600 hover:bg-green-700 text-white font-medium px-3 rounded text-xs"
              >
                <Play size={12} fill="currentColor" /> Run Code
              </Button>
            </div>
          </div>

          {/* Editor Area (Mock) */}
          <div className="relative flex-1 font-mono text-sm">
            <div className="absolute inset-0 flex">
              <div className="w-12 bg-[#111111] border-r border-gray-800 text-gray-600 text-right pr-3 pt-4 select-none leading-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1 p-4 text-gray-300 leading-6 bg-[#0f0f0f]">
                <div className="text-purple-400">
                  class <span className="text-yellow-300">Solution</span>{" "}
                  <span className="text-white">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-500">/**</span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-500">
                    &nbsp;* @param {`{number[]}`} nums
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-500">
                    &nbsp;* @param {`{number}`} target
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-500">
                    &nbsp;* @return {`{number[]}`}
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-500">&nbsp;*/</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">twoSum</span>
                  <span className="text-white">(nums, target) {`{`}</span>
                </div>
                <div className="pl-8 text-gray-500">
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
                <div className="text-white">{`}`}</div>
              </div>
            </div>

            {/* Floating Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-full bg-[#1e1e1e] border border-gray-800 shadow-xl z-20">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  micOn
                    ? "text-gray-200 hover:bg-gray-700"
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
                    ? "text-gray-200 hover:bg-gray-700"
                    : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                )}
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </Button>
              <Separator
                orientation="vertical"
                className="h-6 mx-1 bg-gray-700"
              />
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 text-gray-200 rounded-full hover:bg-gray-700"
              >
                <MonitorUp size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 text-gray-200 rounded-full hover:bg-gray-700"
              >
                <Settings size={18} />
              </Button>
              <Button
                size="icon"
                className="w-10 h-10 text-white bg-red-600 rounded-full shadow-lg hover:bg-red-700"
              >
                <PhoneOff size={18} />
              </Button>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-gray-800 w-[1px]" />

        {/* RIGHT PANEL: VIDEO / CHAT */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="bg-[#111111] flex flex-col"
        >
          <div className="flex items-center justify-between h-12 px-4 border-b border-gray-800">
            <span className="text-sm font-semibold">Session Chat</span>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400"
            >
              <Maximize2 size={16} />
            </Button>
          </div>

          <div className="flex flex-col flex-1 gap-4 p-4">
            {/* Participant Video Mock */}
            <div className="relative overflow-hidden bg-gray-800 border border-gray-700 rounded-lg aspect-video group">
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-blue-500 border rounded-full bg-blue-500/20 border-blue-500/30">
                  C
                </div>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur flex items-center gap-1">
                  <MicOff size={10} className="text-red-400" />
                  Candidate
                </div>
              </div>
            </div>

            {/* Self Video Mock */}
            <div className="relative overflow-hidden bg-gray-800 border border-gray-700 rounded-lg aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-green-500 border rounded-full bg-green-500/20 border-green-500/30">
                  You
                </div>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur">
                  You
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Chat Area Mock */}
            <ScrollArea className="flex-1">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] flex-shrink-0">
                    C
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 mb-0.5">
                      Candidate{" "}
                      <span className="text-gray-600 text-[10px] ml-1">
                        10:42 AM
                      </span>
                    </div>
                    <div className="p-2 text-sm text-gray-300 rounded-lg rounded-tl-none bg-gray-800/50">
                      Just running current test cases...
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px] flex-shrink-0">
                    You
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-400 mb-0.5">
                      You{" "}
                      <span className="text-gray-600 text-[10px] ml-1">
                        10:43 AM
                      </span>
                    </div>
                    <div className="p-2 text-sm text-gray-300 border rounded-lg rounded-tr-none bg-green-900/10 border-green-500/20">
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
                placeholder="Type a message..."
                className="w-full bg-[#111111] border border-gray-700 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50 pr-10 hover:border-gray-600 transition-colors"
              />
              <Button
                size="icon"
                className="absolute text-white bg-green-600 rounded-full right-1 top-1 h-7 w-7 hover:bg-green-500"
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
