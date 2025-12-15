"use client"

import { useState } from "react"

interface Agent {
    id: string
    name: string
    status: string
    task: string
    progress: number
    output: string
    files: string[]
}

interface AgentPanelProps {
    agent: Agent
}

export function AgentPanel({ agent }: AgentPanelProps) {
    const [view, setView] = useState<"output" | "files">("output")

    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b border-border px-6 py-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-xl font-medium tracking-wide mb-1">{agent.name}</div>
                        <div className="text-xs text-muted-foreground tracking-wide">{agent.task}</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-[10px] text-muted-foreground">PROGRESS: {agent.progress}%</div>
                        <div
                            className={`text-xs px-2 py-1 border ${agent.status === "STREAMING"
                                    ? "border-foreground animate-pulse"
                                    : agent.status === "READY"
                                        ? "border-muted-foreground"
                                        : "border-destructive"
                                }`}
                        >
                            {agent.status}
                        </div>
                        <button className="px-3 py-1 border border-border hover:bg-foreground hover:text-background transition-colors text-xs">
                            STOP
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex">
                <button
                    onClick={() => setView("output")}
                    className={`px-6 py-3 text-xs font-medium tracking-wider border-r border-border transition-colors ${view === "output" ? "bg-foreground text-background" : "hover:bg-muted"
                        }`}
                >
                    OUTPUT
                </button>
                <button
                    onClick={() => setView("files")}
                    className={`px-6 py-3 text-xs font-medium tracking-wider border-r border-border transition-colors ${view === "files" ? "bg-foreground text-background" : "hover:bg-muted"
                        }`}
                >
                    FILES ({agent.files.length})
                </button>
                <button className="px-6 py-3 text-xs font-medium tracking-wider text-muted-foreground hover:bg-muted transition-colors">
                    LOGS
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {view === "output" ? (
                    <div className="h-full overflow-y-auto p-6">
                        <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono">{agent.output}</pre>
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto">
                        {agent.files.map((file, index) => (
                            <div
                                key={index}
                                className="border-b border-border px-6 py-4 hover:bg-muted transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-xs font-mono">{file}</div>
                                    <div className="text-[10px] text-muted-foreground">MODIFIED</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-border hover:bg-foreground hover:text-background transition-colors text-xs font-medium tracking-wide">
                        APPROVE
                    </button>
                    <button className="px-4 py-2 border border-border hover:bg-muted transition-colors text-xs font-medium tracking-wide">
                        REJECT
                    </button>
                    <button className="px-4 py-2 border border-border hover:bg-muted transition-colors text-xs font-medium tracking-wide">
                        MODIFY
                    </button>
                </div>

                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">EXPORT_LOG →</button>
            </div>
        </div>
    )
}
