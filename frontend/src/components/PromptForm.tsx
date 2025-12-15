"use client"

import { useState, useRef } from "react"
import { ArrowRight, Paperclip, Sparkles, X } from "lucide-react"

interface PromptFormProps {
    onSubmit: (prompt: string, files: File[]) => void
    disabled?: boolean
}

export function PromptForm({ onSubmit, disabled }: PromptFormProps) {
    const [prompt, setPrompt] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return
        onSubmit(prompt, files)
        setPrompt("")
        setFiles([])
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative group">
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter system command..."
                    disabled={disabled}
                    className="w-full min-h-[80px] bg-background border border-border px-3 py-2 text-base md:text-xs font-mono resize-y focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                        }
                    }}
                />

                {files.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {files.map((f, i) => (
                            <div key={i} className="bg-muted/30 text-[10px] px-2 py-1 rounded-sm border border-border flex items-center gap-1 text-foreground">
                                <Paperclip className="w-2.5 h-2.5" />
                                {f.name}
                                <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>
                                    <X className="w-2.5 h-2.5 hover:text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mt-2">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        title="Attach Context"
                        disabled={disabled}
                    >
                        <Paperclip className="w-3 h-3" />
                        <span className="text-[10px]">Context {files.length > 0 ? `(${files.length})` : ''}</span>
                    </button>

                    <button
                        type="submit"
                        disabled={disabled || !prompt.trim()}
                        className="bg-primary text-primary-foreground p-2 md:p-1.5 rounded-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        {disabled ? <Sparkles className="w-4 h-4 md:w-3 md:h-3 animate-spin" /> : <ArrowRight className="w-4 h-4 md:w-3 md:h-3" />}
                    </button>
                </div>
            </div>
        </form>
    )
}
