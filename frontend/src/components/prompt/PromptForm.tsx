"use client"

import { useState } from "react"
import { Send, Paperclip } from "lucide-react"

interface PromptFormProps {
    onSubmit: (prompt: string, files: File[]) => void
    disabled?: boolean
}

export function PromptForm({ onSubmit, disabled }: PromptFormProps) {
    const [input, setInput] = useState("")
    const [files, setFiles] = useState<File[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() && files.length === 0) return

        onSubmit(input, files)
        setInput("")
        setFiles([])
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
            <div className="relative flex items-center gap-2">
                <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Attach files"
                >
                    <Paperclip className="w-4 h-4" />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Submit instruction to active agents..."
                    disabled={disabled}
                    className="flex-1 bg-muted border-none text-sm px-4 py-2 focus:ring-1 focus:ring-primary outline-none"
                />
                <button
                    type="submit"
                    disabled={disabled || (!input && files.length === 0)}
                    className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    EXECUTE
                </button>
            </div>
        </form>
    )
}
