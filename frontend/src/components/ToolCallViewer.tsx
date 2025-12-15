"use client"

import { useState } from "react"
import { Terminal, FileCode, Activity, Play, ChevronRight, Check } from "lucide-react"

interface ToolCall {
    id: string;
    tool: string;
    args: Record<string, any>;
    status: "running" | "completed" | "failed";
    result?: string;
    timestamp: string;
}

interface FileDiff {
    path: string;
    original: string;
    modified: string;
    type: "modify" | "create" | "delete";
}

interface Agent {
    id: string
    name: string
    status: string
    task: string
    progress: number
    output: string
    files: string[]
    toolCalls?: ToolCall[]
    diffs?: FileDiff[]
}

interface AgentPanelProps {
    agent: Agent
}

export function AgentPanel({ agent }: AgentPanelProps) {
    const [view, setView] = useState<"output" | "files" | "tools">("output")

    return (
        <div className="flex-1 flex flex-col bg-background/50">
            {/* Header */}
            <div className="border-b border-border px-6 py-4 bg-muted/20">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <div className="text-xl font-medium tracking-wide font-mono">{agent.name}</div>
                        </div>
                        <div className="text-xs text-muted-foreground tracking-wide font-mono pl-4">{agent.task}</div>
                    </div>

                    <div className="flex items-center gap-4 font-mono">
                        <div className="text-[10px] text-muted-foreground">PROGRESS: {agent.progress}%</div>
                        <div
                            className={`text-[10px] px-2 py-1 border ${agent.status === "STREAMING" || agent.status === "THINKING"
                                    ? "border-primary text-primary"
                                    : agent.status === "READY"
                                        ? "border-green-500 text-green-500"
                                        : "border-muted-foreground text-muted-foreground"
                                }`}
                        >
                            {agent.status}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex font-mono text-xs">
                <button
                    onClick={() => setView("output")}
                    className={`px-6 py-3 flex items-center gap-2 border-r border-border transition-all ${view === "output" ? "bg-background text-foreground border-b-2 border-b-primary" : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                >
                    <Terminal className="w-3 h-3" />
                    OUTPUT
                </button>
                <button
                    onClick={() => setView("files")}
                    className={`px-6 py-3 flex items-center gap-2 border-r border-border transition-all ${view === "files" ? "bg-background text-foreground border-b-2 border-b-primary" : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                >
                    <FileCode className="w-3 h-3" />
                    DIFFS
                    <span className="px-1.5 py-0.5 rounded-full bg-muted text-[10px]">{agent.files.length}</span>
                </button>
                <button
                    onClick={() => setView("tools")}
                    className={`px-6 py-3 flex items-center gap-2 border-r border-border transition-all ${view === "tools" ? "bg-background text-foreground border-b-2 border-b-primary" : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                >
                    <Activity className="w-3 h-3" />
                    TOOL CALLS
                    <span className="px-1.5 py-0.5 rounded-full bg-muted text-[10px]">{agent.toolCalls?.length || 0}</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden font-mono relative">
                {view === "output" && (
                    <div className="h-full overflow-y-auto p-6 bg-black/40">
                        <pre className="text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
                            <span className="text-primary">{">"}</span> {agent.output}
                            <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle opacity-50" />
                        </pre>
                    </div>
                )}

                {view === "files" && (
                    <div className="h-full overflow-y-auto bg-black/40">
                        {agent.diffs?.map((diff, index) => (
                            <div key={index} className="border-b border-border">
                                <div className="bg-muted/30 px-4 py-2 text-xs flex items-center justify-between text-muted-foreground">
                                    <span>{diff.path}</span>
                                    <span className="text-[10px] uppercase">{diff.type}</span>
                                </div>
                                <div className="grid grid-cols-2 text-[10px] divide-x divide-border">
                                    <div className="p-4 overflow-x-auto bg-red-950/10 text-red-400/80">
                                        {diff.original.split('\n').map((line, i) => (
                                            <div key={i} className="whitespace-pre"> <span className="w-4 inline-block text-muted-foreground/30">{i + 1}</span> - {line}</div>
                                        ))}
                                    </div>
                                    <div className="p-4 overflow-x-auto bg-green-950/10 text-green-400/80">
                                        {diff.modified.split('\n').map((line, i) => (
                                            <div key={i} className="whitespace-pre"> <span className="w-4 inline-block text-muted-foreground/30">{i + 1}</span> + {line}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )) || (
                                <div className="p-12 text-center text-muted-foreground text-xs">NO FILE CHANGES DETECTED</div>
                            )}
                    </div>
                )}

                {view === "tools" && (
                    <div className="h-full overflow-y-auto p-4 space-y-2 bg-black/40">
                        {agent.toolCalls?.map((call) => (
                            <div key={call.id} className="border border-border p-3 rounded-sm bg-muted/10 text-xs">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Play className="w-3 h-3" />
                                        <span className="font-bold">{call.tool}</span>
                                    </div>
                                    <span className="text-muted-foreground">{call.timestamp}</span>
                                </div>
                                <div className="pl-5 space-y-2">
                                    <div className="text-muted-foreground">
                                        <span className="text-[10px] opacity-70 block mb-1">ARGS</span>
                                        <pre className="bg-black/30 p-2 rounded">{JSON.stringify(call.args, null, 2)}</pre>
                                    </div>
                                    {call.result && (
                                        <div className="text-green-500/80">
                                            <span className="text-[10px] text-muted-foreground opacity-70 block mb-1">RESULT</span>
                                            <div className="flex items-start gap-2">
                                                <Check className="w-3 h-3 mt-0.5" />
                                                <span>{call.result}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )) || <div className="p-12 text-center text-muted-foreground text-xs">NO TOOL ACTIVITY RECORDED</div>}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-background">
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold tracking-wider hover:brightness-110 transition-all">
                        APPROVE
                    </button>
                    <button className="px-6 py-2 border border-border text-muted-foreground hover:bg-muted text-xs font-medium tracking-wider transition-colors">
                        REJECT
                    </button>
                </div>

                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    EXPORT_LOG <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}
