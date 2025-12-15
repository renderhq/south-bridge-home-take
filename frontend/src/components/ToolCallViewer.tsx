"use client"

import { Play, Check, X, Clock, Terminal, ChevronRight, ChevronDown } from "lucide-react"
import { ToolCall } from "@/lib/types"
import { useState } from "react"

interface ToolCallViewerProps {
    toolCalls: ToolCall[]
}

export function ToolCallViewer({ toolCalls }: ToolCallViewerProps) {
    if (!toolCalls || toolCalls.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 animate-in fade-in duration-500">
                <Terminal className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-mono tracking-wide">NO TOOL CALLS RECORDED</p>
                <p className="text-xs opacity-50 mt-2">Agent has not executed any tools yet.</p>
            </div>
        )
    }

    return (
        <div className="absolute inset-0 overflow-auto p-4 scrollbar-thin bg-black/5 space-y-3">
            {toolCalls.map((call, index) => (
                <ToolCallItem key={call.id || index} call={call} index={index} />
            ))}
            <div className="h-4" /> {/* Spacer */}
        </div>
    )
}

function ToolCallItem({ call, index }: { call: ToolCall; index: number }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const isRunning = call.status === "running"

    return (
        <div className={`border rounded-sm overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-2 ${isRunning
                ? "border-yellow-500/30 bg-yellow-500/5"
                : call.status === "failed"
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border bg-muted/10"
            }`}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 border-b border-border/10 hover:bg-muted/10 transition-colors"
            >
                <div className="flex items-center gap-2.5">
                    {isExpanded ? <ChevronDown className="w-3 h-3 opacity-50" /> : <ChevronRight className="w-3 h-3 opacity-50" />}
                    <div className={`p-1 rounded-sm ${isRunning ? 'bg-yellow-500/10' : 'bg-primary/10'}`}>
                        <Play className={`w-3 h-3 ${isRunning ? 'text-yellow-500' : 'text-primary'}`} />
                    </div>
                    <span className="text-xs font-bold text-foreground font-mono">{call.tool}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] text-muted-foreground font-mono">{call.timestamp}</span>
                    <StatusBadge status={call.status} />
                </div>
            </button>

            {/* Content */}
            {isExpanded && (
                <div className="p-3 text-[10px] sm:text-xs font-mono grid gap-3 animate-in fade-in duration-200">
                    {/* Arguments */}
                    <div className="space-y-1">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                            Arguments
                        </div>
                        <div className="bg-black/20 rounded border border-border/30 p-2 overflow-x-auto text-muted-foreground">
                            <pre className="whitespace-pre-wrap break-all">
                                {JSON.stringify(call.args, null, 2)}
                            </pre>
                        </div>
                    </div>

                    {/* Result */}
                    {call.result && (
                        <div className="space-y-1">
                            <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                                <span className={`w-1 h-1 rounded-full ${call.status === 'failed' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                Result
                            </div>
                            <div className={`rounded p-2 border overflow-x-auto ${call.status === 'failed'
                                    ? 'bg-destructive/10 text-destructive border-destructive/20'
                                    : 'bg-green-500/5 text-green-400 border-green-500/20'
                                }`}>
                                <pre className="whitespace-pre-wrap break-all">{call.result}</pre>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    if (status === "running") {
        return (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <Clock className="w-3 h-3 animate-spin" />
                <span className="text-[9px] font-bold uppercase">Running</span>
            </div>
        )
    }
    if (status === "completed") {
        return (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500">
                <Check className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase">Success</span>
            </div>
        )
    }
    return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
            <X className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase">Failed</span>
        </div>
    )
}
