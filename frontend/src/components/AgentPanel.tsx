"use client"

import { useState, useEffect, useRef } from "react"
import { AgentState } from "@/lib/types"
import { FileDiffViewer } from "./FileDiffViewer"
import { ToolCallViewer } from "./ToolCallViewer"
import { Check, Clock, Code, FileCode, Terminal, Zap, Square, Download, Ban, Activity } from "lucide-react"

interface AgentPanelProps {
    agent: AgentState
    showToast: (message: string, type?: "success" | "error" | "info", duration?: number) => void
    onUpdateAgent: (agentId: string, updates: Partial<AgentState>) => void
    onStopAgent?: (agentId: string) => void
}

export function AgentPanel({ agent, showToast, onUpdateAgent, onStopAgent }: AgentPanelProps) {
    const [view, setView] = useState<"output" | "files" | "logs" | "tools">("output")
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const logsEndRef = useRef<HTMLDivElement>(null)
    const outputEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll logs
    useEffect(() => {
        if (view === "logs" && logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [agent.logs, view])

    // Auto-scroll output only if actively streaming
    useEffect(() => {
        if (view === "output" && outputEndRef.current && agent.status === "STREAMING") {
            outputEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [agent.output, view, agent.status])

    const handleExportLog = () => {
        if (agent.logs.length === 0) return;

        const content = agent.logs.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${agent.id}-session-${Date.now()}.log`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Log file exported successfully", "success");
    };

    return (
        <div className="flex flex-col h-full bg-background border-r border-border min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/5 flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${agent.status === 'STREAMING' ? 'bg-green-500 animate-pulse' :
                        agent.status === 'THINKING' ? 'bg-yellow-500 animate-pulse' :
                            agent.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-muted-foreground'
                        }`} />
                    <div className="flex flex-col min-w-0">
                        <div className="text-sm font-bold tracking-tight truncate">{agent.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-2">
                            <span className={
                                agent.status === 'STREAMING' ? 'text-green-500' :
                                    agent.status === 'ERROR' ? 'text-destructive' : 'opacity-70'
                            }>
                                {agent.status}
                            </span>
                            <span className="opacity-30">|</span>
                            <span className="truncate max-w-[150px] opacity-70" title={agent.task}>{agent.task}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onStopAgent && agent.status === 'STREAMING' && (
                        <button
                            onClick={() => onStopAgent(agent.id)}
                            className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-colors border border-destructive/20"
                            title="Stop Generation"
                        >
                            <Square className="w-3 h-3 fill-current" />
                        </button>
                    )}
                    <div className="flex flex-col items-end min-w-[60px]">
                        <div className="text-xs font-mono font-medium">{agent.progress}%</div>
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden mt-0.5">
                            <div
                                className={`h-full transition-all duration-300 ease-out ${agent.status === 'COMPLETED' ? 'bg-blue-500' :
                                    agent.status === 'ERROR' ? 'bg-destructive' : 'bg-primary'
                                    }`}
                                style={{ width: `${agent.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center px-2 py-1 border-b border-border bg-muted/20 gap-1 flex-shrink-0 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setView("output")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${view === "output" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    <Terminal className="w-3.5 h-3.5" />
                    OUTPUT
                </button>
                <button
                    onClick={() => setView("files")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${view === "files" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    <FileCode className="w-3.5 h-3.5" />
                    FILES
                    {agent.files.length > 0 && (
                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[9px] font-bold animate-in zoom-in duration-300">
                            {agent.files.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setView("tools")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${view === "tools" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    <Activity className="w-3.5 h-3.5" />
                    TOOLS
                    {agent.toolCalls.length > 0 && (
                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[9px] font-bold animate-in zoom-in duration-300">
                            {agent.toolCalls.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setView("logs")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${view === "logs" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    <Clock className="w-3.5 h-3.5" />
                    LOGS
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {view === "output" && (
                    <div className="absolute inset-0 overflow-auto p-4 font-mono text-xs leading-relaxed scrollbar-thin">
                        <div className="whitespace-pre-wrap">{agent.output}</div>
                        {agent.status === 'STREAMING' && (
                            <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                        )}
                        <div ref={outputEndRef} />
                    </div>
                )}

                {view === "files" && (
                    <div className="absolute inset-0 overflow-hidden">
                        <FileDiffViewer
                            diffs={agent.diffs}
                            selectedFile={selectedFile}
                            onSelectFile={setSelectedFile}
                        />
                    </div>
                )}

                {view === "tools" && (
                    <div className="absolute inset-0 overflow-hidden">
                        <ToolCallViewer toolCalls={agent.toolCalls} />
                    </div>
                )}

                {view === "logs" && (
                    <div className="absolute inset-0 overflow-auto p-0 scrollbar-thin bg-black/5">
                        <div className="divide-y divide-border/30">
                            {agent.logs.map((log, i) => {
                                const isSystem = log.startsWith("[SYSTEM]");
                                const isTool = log.startsWith("[TOOL]");
                                const isFile = log.startsWith("[FILE]");
                                const isConfig = log.startsWith("[CONFIG]");
                                const isThought = log.startsWith("[THOUGHT]");
                                const isAgent = log.startsWith("[AGENT]");
                                const isMetrics = log.startsWith("[METRICS]");

                                return (
                                    <div key={i} className={`px-4 py-2 font-mono text-xs flex gap-3 hover:bg-muted/10 items-start animate-in slide-in-from-left-2 duration-300 ${isSystem ? "text-blue-400/90" :
                                        isTool ? "text-purple-400/90" :
                                            isFile ? "text-yellow-400/90" :
                                                isConfig ? "text-cyan-400/90" :
                                                    isThought ? "text-green-400/90" :
                                                        isMetrics ? "text-orange-400/90" :
                                                            isAgent ? "text-pink-400/90" :
                                                                "text-muted-foreground"
                                        }`}>
                                        <div className="mt-0.5 opacity-30 text-[9px] shrink-0 font-medium w-12 text-right">
                                            {i + 1}
                                        </div>
                                        <div className="whitespace-pre-wrap break-all">{log}</div>
                                    </div>
                                )
                            })}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="bg-background border-t border-border p-3 flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-muted-foreground font-mono w-full sm:w-auto justify-between sm:justify-start">
                        <div className="flex items-center gap-1.5" title="Modified Files">
                            <FileCode className="w-3.5 h-3.5" />
                            <span>{agent.files.length}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Tool Calls">
                            <Activity className="w-3.5 h-3.5" />
                            <span>{agent.toolCalls.length}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Approx Tokens">
                            <Zap className="w-3.5 h-3.5" />
                            <span>{agent.tokens || "0"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                            onClick={handleExportLog}
                            className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors border border-transparent hover:border-border"
                            title="Export Logs"
                            disabled={agent.logs.length === 0}
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <div className="h-4 w-px bg-border/50 mx-1" />
                        <button
                            onClick={() => {
                                const newLogs = [
                                    ...agent.logs,
                                    `[USER] ✓ Changes APPROVED at ${new Date().toLocaleTimeString()}`,
                                    "[SYSTEM] Committing changes to repository...",
                                    "[SYSTEM] Running git add .",
                                    `[SYSTEM] Committing ${agent.files.length} files...`,
                                    "[SYSTEM] Pushing to remote repository...",
                                    "[SYSTEM] ✓ Deployment initiated to staging environment"
                                ];

                                onUpdateAgent(agent.id, {
                                    logs: newLogs,
                                    status: "COMPLETED",
                                    task: "CHANGES_APPROVED"
                                });

                                showToast(`✓ Admin approved changes. ${agent.files.length} files committed.`, "success");
                            }}
                            disabled={agent.status === "STREAMING" || agent.files.length === 0}
                            className="px-3 py-1.5 border border-border/50 bg-background hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30 transition-all text-[10px] font-bold tracking-wider rounded-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                            <Check className="w-3 h-3" /> APPROVE
                        </button>
                        <button
                            onClick={() => {
                                const newLogs = [
                                    ...agent.logs,
                                    `[USER] ✗ Changes REJECTED at ${new Date().toLocaleTimeString()}`,
                                    "[SYSTEM] Rolling back modifications...",
                                    `[SYSTEM] Discarding ${agent.files.length} file changes...`,
                                    "[SYSTEM] Restoring original state...",
                                    "[SYSTEM] ✓ Rollback complete"
                                ];

                                onUpdateAgent(agent.id, {
                                    logs: newLogs,
                                    files: [],
                                    diffs: [],
                                    status: "IDLE",
                                    task: "CHANGES_REJECTED",
                                    progress: 0
                                });

                                showToast("✗ Changes rejected. System rolled back.", "error");
                            }}
                            disabled={agent.status === "STREAMING" || agent.files.length === 0}
                            className="px-3 py-1.5 border border-border/50 bg-background hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all text-[10px] font-bold tracking-wider rounded-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                            <Ban className="w-3 h-3" /> REJECT
                        </button>
                        <button
                            onClick={() => {
                                onUpdateAgent(agent.id, {
                                    logs: [...agent.logs, `[USER] 🔧 Entering MODIFY mode at ${new Date().toLocaleTimeString()}`],
                                    status: "IDLE",
                                    task: "MODIFY_MODE_ACTIVE"
                                });
                                showToast("🔧 Modify mode active. Edit individual changes.", "info");
                            }}
                            disabled={agent.status === "STREAMING" || agent.files.length === 0}
                            className="px-3 py-1.5 border border-border/50 bg-background hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30 transition-all text-[10px] font-bold tracking-wider rounded-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                            <Code className="w-3 h-3" /> MODIFY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
