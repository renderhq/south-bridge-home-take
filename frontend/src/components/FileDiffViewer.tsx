"use client"

import { FileDiff } from "@/lib/types"
import { FileCode, Diff, ArrowRight, Minus, Plus } from "lucide-react"

interface FileDiffViewerProps {
    diffs: FileDiff[]
    selectedFile: string | null
    onSelectFile: (path: string) => void
}

export function FileDiffViewer({ diffs, selectedFile, onSelectFile }: FileDiffViewerProps) {
    if (diffs.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 animate-in fade-in duration-500">
                <Diff className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-mono tracking-wide">NO FILE CHANGES DETECTED</p>
                <p className="text-xs opacity-50 mt-2">Simulation has not modified any files yet.</p>
            </div>
        )
    }

    const activeDiff = selectedFile ? diffs.find(d => d.path === selectedFile) : diffs[0];
    const displayDiff = activeDiff || diffs[0];

    const renderDiffContent = (original: string, modified: string) => {
        const originalLines = original.split('\n');
        const modifiedLines = modified.split('\n');
        const maxLines = Math.max(originalLines.length, modifiedLines.length);

        return Array.from({ length: maxLines }).map((_, i) => {
            const orig = originalLines[i] || '';
            const mod = modifiedLines[i] || '';
            const hasChange = orig !== mod;
            const isAdded = !orig && mod;
            const isRemoved = orig && !mod;

            return (
                <div key={i} className={`grid grid-cols-2 text-[10px] sm:text-xs font-mono border-b border-border/10 hover:bg-muted/30 transition-colors ${hasChange ? 'bg-muted/10' : ''}`}>
                    {/* Original Side */}
                    <div className={`p-1 border-r border-border/20 flex overflow-hidden ${isRemoved ? 'bg-destructive/10 text-destructive-foreground' : 'text-muted-foreground/70'}`}>
                        <span className="w-6 text-right mr-3 select-none opacity-30 shrink-0">{i + 1}</span>
                        <span className="whitespace-pre overflow-x-auto scrollbar-hide">{orig}</span>
                    </div>
                    {/* Modified Side */}
                    <div className={`p-1 flex overflow-hidden ${isAdded ? 'bg-green-500/10 text-green-400' : hasChange ? 'bg-blue-500/10 text-blue-300' : 'text-foreground/80'}`}>
                        <span className="w-6 text-right mr-3 select-none opacity-30 shrink-0">{i + 1}</span>
                        <div className="flex w-full">
                            {isAdded && <Plus className="w-3 h-3 mr-1 mt-0.5 shrink-0 text-green-500/50" />}
                            <span className="whitespace-pre overflow-x-auto scrollbar-hide">{mod}</span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="grid grid-cols-12 h-full gap-0 overflow-hidden bg-background">
            {/* File List Sidebar */}
            <div className="col-span-3 border-r border-border bg-muted/5 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileCode className="w-3 h-3" />
                    Modified Files ({diffs.length})
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                    {diffs.map((diff, index) => (
                        <button
                            key={`${index}-${diff.path}`}
                            onClick={() => onSelectFile(diff.path)}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-all duration-200 border ${displayDiff?.path === diff.path
                                ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                                : "border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                                } flex items-center justify-between group`}
                        >
                            <span className="truncate flex-1" title={diff.path}>
                                {diff.path.split('/').pop()}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full capitalize font-medium
                                ${diff.type === 'create' ? 'bg-green-500/10 text-green-500' :
                                    diff.type === 'delete' ? 'bg-destructive/10 text-destructive' :
                                        'bg-blue-500/10 text-blue-500'}`}>
                                {diff.type === 'modify' ? 'mod' : diff.type}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Diff View Area */}
            <div className="col-span-9 flex flex-col h-full overflow-hidden bg-background/50">
                <div className="p-3 border-b border-border flex items-center justify-between bg-muted/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-foreground font-medium">
                        <span className="opacity-50">{displayDiff?.path.split('/').slice(0, -1).join('/')}/</span>
                        <span className="text-primary">{displayDiff?.path.split('/').pop()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive/50"></div> Original</div>
                        <ArrowRight className="w-3 h-3 opacity-30" />
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500/50"></div> Modified</div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto scrollbar-thin relative">
                    {displayDiff && renderDiffContent(displayDiff.original, displayDiff.modified)}
                </div>
            </div>
        </div>
    )
}
