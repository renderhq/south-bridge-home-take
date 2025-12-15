"use client"

import { useState } from "react"

interface SettingsProps {
    onClose: () => void
}

export function Settings({ onClose }: SettingsProps) {
    const [selectedAgents, setSelectedAgents] = useState<string[]>(["claude-code"])
    const [workingDir, setWorkingDir] = useState("/users/dev/project-alpha")
    const [model, setModel] = useState("claude-sonnet-4-20250514")
    const [tokens, setTokens] = useState("8192")
    const [temperature, setTemperature] = useState("0")
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected")

    const agents = [
        { id: "claude-code", name: "Claude Code" },
        { id: "gemini-cli", name: "Gemini CLI" },
        { id: "codex", name: "Codex" },
    ]

    const toggleAgent = (id: string) => {
        setSelectedAgents((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 font-mono">
            <div className="bg-background border border-border w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="text-xs font-medium tracking-wider">SETTINGS</div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Agent Selection */}
                    <div>
                        <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">AGENTS</div>
                        <div className="flex gap-3">
                            {agents.map((agent) => (
                                <button
                                    key={agent.id}
                                    onClick={() => toggleAgent(agent.id)}
                                    className={`px-3 py-2 text-xs border transition-colors ${selectedAgents.includes(agent.id)
                                            ? "bg-foreground text-background border-foreground"
                                            : "border-border hover:border-foreground"
                                        }`}
                                >
                                    {agent.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Working Directory */}
                    <div>
                        <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">WORKING DIRECTORY</div>
                        <input
                            type="text"
                            value={workingDir}
                            onChange={(e) => setWorkingDir(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border text-xs focus:outline-none focus:border-foreground transition-colors"
                        />
                    </div>

                    {/* Model */}
                    <div>
                        <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">MODEL</div>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border text-xs focus:outline-none focus:border-foreground transition-colors"
                        />
                    </div>

                    {/* Tokens & Temperature */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">TOKENS</div>
                            <input
                                type="text"
                                value={tokens}
                                onChange={(e) => setTokens(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border text-xs focus:outline-none focus:border-foreground transition-colors"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">TEMPERATURE</div>
                            <input
                                type="text"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border text-xs focus:outline-none focus:border-foreground transition-colors"
                            />
                        </div>
                    </div>

                    {/* Connection Status */}
                    <div>
                        <div className="text-[10px] font-medium tracking-wider text-muted-foreground mb-3">CONNECTION STATUS</div>
                        <div className="flex items-center justify-between">
                            <div
                                className={`text-xs ${connectionStatus === "connected" ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                            </div>
                            <button
                                onClick={() => setConnectionStatus(connectionStatus === "connected" ? "disconnected" : "connected")}
                                className="px-3 py-1 text-[10px] border border-border hover:bg-foreground hover:text-background transition-colors"
                            >
                                {connectionStatus === "connected" ? "DISCONNECT" : "RECONNECT"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                    <button onClick={onClose} className="px-4 py-2 text-xs border border-border hover:bg-muted transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
