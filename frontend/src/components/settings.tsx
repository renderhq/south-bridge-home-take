"use client"

import { useState } from "react"
import { X, Save, Server, Cpu, Database } from "lucide-react"
import { SimulationConfig } from "@/lib/types"

interface SettingsProps {
    onClose: () => void
    config: SimulationConfig
    onSave: (config: SimulationConfig) => void
}

export function Settings({ onClose, config, onSave }: SettingsProps) {
    const [model, setModel] = useState(config.model)
    const [tokens, setTokens] = useState(config.maxTokens.toString())
    const [temperature, setTemperature] = useState(config.temperature.toString())
    const [workingDir, setWorkingDir] = useState(config.workingDir)
    const [streamSpeed, setStreamSpeed] = useState(config.streamSpeed.toString())

    // Mock connecting state
    const [isConnected, setIsConnected] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        // Simulate network delay for "nice touch"
        setTimeout(() => {
            setIsSaving(false)

            // Create updated config
            const updatedConfig: SimulationConfig = {
                model,
                maxTokens: parseInt(tokens) || 4000,
                temperature: parseFloat(temperature) || 0.7,
                workingDir,
                streamSpeed: parseInt(streamSpeed) || 150
            }

            onSave(updatedConfig)
            onClose()
        }, 800)
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-background border border-border w-full max-w-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] ring-1 ring-white/10">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/5">
                    <h2 className="text-lg font-mono font-bold tracking-tight flex items-center gap-2">
                        <Server className="w-4 h-4 text-primary" />
                        SYSTEM CONFIGURATION
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs">
                    {/* Connection Status */}
                    <div className="flex items-center justify-between p-3 bg-muted/10 border border-border rounded-sm">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                            <span className="font-medium">SOUTHBRIDGE_RELAY_V1</span>
                        </div>
                        <button
                            onClick={() => setIsConnected(!isConnected)}
                            className="text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                            {isConnected ? "DISCONNECT" : "CONNECT"}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 border-b border-border pb-2">
                            <Cpu className="w-3 h-3" /> Model Parameters
                        </h3>

                        <div className="grid gap-2">
                            <label className="text-muted-foreground">Model Selection</label>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="bg-black/20 border border-border px-3 py-2 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            >
                                <option value="claude-3-opus">Claude 3 Opus (Southbridge Optimized)</option>
                                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                <option value="codex-alpha">Codex Alpha</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-muted-foreground">Max Tokens</label>
                                <input
                                    type="number"
                                    value={tokens}
                                    onChange={(e) => setTokens(e.target.value)}
                                    className="bg-black/20 border border-border px-3 py-2 rounded-sm focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-muted-foreground">Temperature</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="1"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    className="bg-black/20 border border-border px-3 py-2 rounded-sm focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-muted-foreground">Stream Speed (ms)</label>
                            <input
                                type="number"
                                value={streamSpeed}
                                onChange={(e) => setStreamSpeed(e.target.value)}
                                className="bg-black/20 border border-border px-3 py-2 rounded-sm focus:border-primary outline-none transition-all"
                                placeholder="150"
                            />
                            <span className="text-[9px] text-muted-foreground/70">Lower = faster streaming</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 border-b border-border pb-2">
                            <Database className="w-3 h-3" /> Environment
                        </h3>
                        <div className="grid gap-2">
                            <label className="text-muted-foreground">Working Directory</label>
                            <input
                                type="text"
                                value={workingDir}
                                onChange={(e) => setWorkingDir(e.target.value)}
                                className="bg-black/20 border border-border px-3 py-2 rounded-sm focus:border-primary outline-none font-mono text-primary transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted/5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isSaving}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait transition-all"
                    >
                        {isSaving ? (
                            <>
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                SAVING...
                            </>
                        ) : (
                            <>
                                <Save className="w-3 h-3" />
                                SAVE CONFIGURATION
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
