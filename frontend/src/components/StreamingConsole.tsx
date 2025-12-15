"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal, FileCode, Activity } from "lucide-react"
import { AgentState } from "@/lib/types"
import { ToolCallViewer } from "./ToolCallViewer"
import { FileDiffViewer } from "./FileDiffViewer"

interface StreamingConsoleProps {
    agent: AgentState
}

export function StreamingConsole({ agent }: StreamingConsoleProps) {
    const [activeTab, setActiveTab] = useState<"output" | "tools" | "diffs">("output")
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll on output update
    useEffect(() => {
        if (activeTab === "output" && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [agent.output, activeTab])

    return (
        <div className="flex-1 flex flex-col bg-background/50 h-full border-l border-border">
            {/* Header Info */}
            <div className="border-b border-border px-6 py-4 bg-muted/5">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`w-2.5 h-2.5 rounded-full ${agent.status === 'STREAMING' ? 'bg-green-500 animate-pulse' :
                                agent.status === 'ERROR' ? 'bg-red-500' :
                                    'bg-muted-foreground'
                                }`} />
                            <h2 className="text-xl font-mono font-medium tracking-tight text-foreground">{agent.name}</h2>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono tracking-wide pl-5">{agent.task}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 font-mono">
                        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                            <span>TIME: {agent.time || "0s"}</span>
                            <span>TOKENS: {agent.tokens || "0"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{ width: `${agent.progress}%` }}
                                />
                            </div>
                            <span className="text-xs font-bold w-8 text-right">{Math.round(agent.progress)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-border bg-muted/10 font-mono text-xs">
                <button
                    onClick={() => setActiveTab("output")}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 border-r border-border transition-colors hover:bg-muted/20 ${activeTab === "output" ? "bg-background text-primary border-b-2 border-b-primary" : "text-muted-foreground"
                        }`}
                >
                    <Terminal className="w-3 h-3" />
                    LIVE OUTPUT
                </button>
                <button
                    onClick={() => setActiveTab("tools")}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 border-r border-border transition-colors hover:bg-muted/20 ${activeTab === "tools" ? "bg-background text-primary border-b-2 border-b-primary" : "text-muted-foreground"
                        }`}
                >
                    <Activity className="w-3 h-3" />
                    TOOL CALLS
                    {agent.toolCalls.length > 0 && (
                        <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm text-[9px] font-bold min-w-[16px] text-center">{agent.toolCalls.length}</span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("diffs")}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors hover:bg-muted/20 ${activeTab === "diffs" ? "bg-background text-primary border-b-2 border-b-primary" : "text-muted-foreground"
                        }`}
                >
                    <FileCode className="w-3 h-3" />
                    FILE DIFFS
                    {agent.diffs.length > 0 && (
                        <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm text-[9px] font-bold min-w-[16px] text-center">{agent.diffs.length}</span>
                    )}
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative bg-black/40">
                <div ref={scrollRef} className="h-full overflow-y-auto custom-scrollbar">
                    {activeTab === "output" && (
                        <div className="p-6 font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            <span className="text-primary mr-2">➜</span>
                            {agent.output}
                            {agent.status === "STREAMING" && (
                                <span className="inline-block w-2 h-4 bg-primary ml-1 align-middle animate-pulse" />
                            )}
                        </div>
                    )}

                    {activeTab === "tools" && <ToolCallViewer toolCalls={agent.toolCalls} />}

                    {activeTab === "diffs" && <FileDiffViewer diffs={agent.diffs} selectedFile={selectedFile} onSelectFile={setSelectedFile} />}
                </div>
            </div>

            {/* Footer / Status Bar */}
            <div className="border-t border-border px-4 py-2 bg-muted/5 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                <span>STATUS: {agent.status}</span>
                <span>ID: {agent.id}</span>
            </div>
        </div>
    )
}
