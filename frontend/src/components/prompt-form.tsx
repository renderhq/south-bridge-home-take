import React, { useState, ChangeEvent, FormEvent } from "react";

interface PromptFormProps {
    onSubmit: (prompt: string, files: File[]) => void;
}

export default function PromptForm({ onSubmit }: PromptFormProps) {
    const [prompt, setPrompt] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);

    const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onSubmit(prompt, files);
            setPrompt("");
            setFiles([]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border border-border rounded bg-muted">
            <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your prompt..."
                className="w-full p-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
                rows={4}
            />
            <input type="file" multiple onChange={handleFileChange} className="text-foreground" />
            <button
                type="submit"
                className="self-start px-4 py-2 bg-foreground text-background rounded hover:bg-muted"
            >
                Submit
            </button>
        </form>
    );
}
