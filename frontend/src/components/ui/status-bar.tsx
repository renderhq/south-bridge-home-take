"use client"

import { useState, useEffect } from "react"
import { Settings, Cpu, ChevronRight } from "lucide-react"

interface StatusBarProps {
    onSettingsClick: () => void
    model?: string
}

export function StatusBar({ onSettingsClick, model }: StatusBarProps) {
    const [time, setTime] = useState("")
    const [cpu, setCpu] = useState(34)
    const [mem, setMem] = useState(2.1)

    useEffect(() => {
        // Initial time
        setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))

        const interval = setInterval(() => {
            // Update Time
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))

            // Update Stats Randomly
            setCpu(prev => {
                const change = Math.random() > 0.5 ? 1 : -1
                const newVal = prev + change
                return newVal > 90 ? 90 : newVal < 10 ? 10 : newVal
            })

            setMem(prev => {
                const change = Math.random() > 0.5 ? 0.1 : -0.1
                const newVal = Number((prev + change).toFixed(1))
                return newVal > 16.0 ? 16.0 : newVal < 1.0 ? 1.0 : newVal
            })

        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-background select-none">
            <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-muted-foreground font-mono">
                <div className="flex items-center gap-2 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span>AGENT.CONTROL</span>
                    <span className="text-muted-foreground/50">|</span>
                    <span>SYSTEM.ONLINE</span>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <span className="text-muted-foreground/30">|</span>
                    <span className="text-foreground">MODEL: <span className="text-primary uppercase">{model || "CLAUDE-SONNET-4-20250514"}</span></span>
                </div>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-mono font-bold text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        CPU: <span className="text-foreground">{cpu}%</span>
                    </span>
                    <span className="text-muted-foreground/30">|</span>
                    <span className="flex items-center gap-1">
                        MEM: <span className="text-foreground">{mem}GB</span>
                    </span>
                    <span className="text-muted-foreground/30 hidden sm:inline">|</span>
                    <span className="hidden sm:inline text-foreground">668:346</span>
                </div>

                <div className="flex items-center gap-4 border-l border-border pl-6">
                    <span className="text-foreground">{time}</span>
                    <span className="text-muted-foreground/30">|</span>
                    <button
                        onClick={onSettingsClick}
                        className="flex items-center gap-1 hover:text-foreground transition-colors uppercase"
                    >
                        <Settings className="w-3 h-3" />
                        <span>SETTINGS</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
