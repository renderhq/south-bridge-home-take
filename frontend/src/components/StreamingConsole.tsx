"use client"

import { useState } from "react"
import { Terminal, FileCode, Activity } from "lucide-react"

export interface AgentStep {
    output: string
    toolCalls?: ToolCall[]
    diffs?: FileDiff[]
}

export interface ToolCall {
    id: string
    tool: string
    args: Record<string, any>
    status: "running" | "completed" | "failed"
    result?: string
    timestamp: string
}

export interface FileDiff {
    path: string
    original: string
    modified: string
}

interface StreamingConsoleProps {
    agentName: string
    status: string
    output: string
    toolCalls: ToolCall[]
    diffs: FileDiff[]
}

export function StreamingConsole({ agentName, status, output, toolCalls, diffs }: StreamingConsoleProps) {
    const [activeTab, setActiveTab] = useState<"output" | "tools" | "diffs">("output")

    return (
        <div className="border border-border bg-black/50 flex flex-col h-[400px] mb-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/10">
                <div className="font-mono text-sm font-bold text-foreground">{agentName}</div>
                <div className={`text-[10px] px-2 py-1 border ${status === "STREAMING" ? "border-green-500 text-green-500 animate-pulse" : "border-muted-foreground text-muted-foreground"
                    }`}>
                    {status}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
                <button onClick={() => setActiveTab("output")} className={`px-4 py-2 text-xs font-mono flex items-center gap-2 border-r border-border ${activeTab === "output" ? "bg-muted/20 text-foreground" : "text-muted-foreground hover:bg-muted/10"}`}>
                    <Terminal size={12} /> OUTPUT
                </button>
                <button onClick={() => setActiveTab("tools")} className={`px-4 py-2 text-xs font-mono flex items-center gap-2 border-r border-border ${activeTab === "tools" ? "bg-muted/20 text-foreground" : "text-muted-foreground hover:bg-muted/10"}`}>
                    <Activity size={12} /> TOOLS ({toolCalls.length})
                </button>
                <button onClick={() => setActiveTab("diffs")} className={`px-4 py-2 text-xs font-mono flex items-center gap-2 border-r border-border ${activeTab === "diffs" ? "bg-muted/20 text-foreground" : "text-muted-foreground hover:bg-muted/10"}`}>
                    <FileCode size={12} /> DIFFS ({diffs.length})
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs">
                {activeTab === "output" && (
                    <pre className="whitespace-pre-wrap text-muted-foreground">
                        <span className="text-green-500 mr-2">➜</span>
                        {output}
                        {status === "STREAMING" && <span className="inline-block w-2 h-4 bg-green-500/50 animate-pulse ml-1 align-middle" />}
                    </pre>
                )}

                {activeTab === "tools" && (
                    <div className="space-y-3">
                        {toolCalls.map(tool => (
                            <div key={tool.id} className="border border-border p-2 bg-muted/5">
                                <div className="flex justify-between mb-1 text-green-400">
                                    <span>{tool.tool}</span>
                                    <span className="text-[10px] opacity-70">{tool.timestamp}</span>
                                </div>
                                <pre className="text-[10px] text-muted-foreground overflow-x-auto">
                                    {JSON.stringify(tool.args, null, 2)}
                                </pre>
                            </div>
                        ))}
                        {toolCalls.length === 0 && <div className="text-muted-foreground italic">No tool calls recorded.</div>}
                    </div>
                )}

                {activeTab === "diffs" && (
                    <div className="space-y-4">
                        {diffs.map((diff, idx) => (
                            <div key={idx} className="border border-border">
                                <div className="bg-muted/20 px-3 py-1 text-xs border-b border-border">{diff.path}</div>
                                <div className="grid grid-cols-2 text-[10px]">
                                    <div className="p-2 bg-red-950/20 text-red-400/80 overflow-x-auto whitespace-pre">{diff.original}</div>
                                    <div className="p-2 bg-green-950/20 text-green-400/80 overflow-x-auto whitespace-pre">{diff.modified}</div>
                                </div>
                            </div>
                        ))}
                        {diffs.length === 0 && <div className="text-muted-foreground italic">No file changes detected.</div>}
                    </div>
                )}
            </div>
        </div>
    )
}
