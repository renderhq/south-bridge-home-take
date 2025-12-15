"use client"

interface StatusBarProps {
    onSettingsClick: () => void
}

export function StatusBar({ onSettingsClick }: StatusBarProps) {
    return (
        <div className="h-12 border-b border-border flex items-center justify-between px-6 text-[10px] font-medium tracking-wider">
            <div className="flex items-center gap-6">
                <div className="text-xs tracking-[0.2em]">AGENT.CONTROL</div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <div>SYSTEM.ONLINE</div>
                    <div>|</div>
                    <div className="text-foreground">MODEL: CLAUDE-SONNET-4-20250514</div>
                    <div>|</div>
                    <div>CPU: 34%</div>
                    <div>|</div>
                    <div>MEM: 2.1GB</div>
                </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
                <div>TOKENS: 668:346</div>
                <div>|</div>
                <div>TIME: 15:23:33</div>
                <div>|</div>
                <div>TOOLS: 12</div>
                <div>|</div>
                <button
                    onClick={onSettingsClick}
                    className="px-2 py-1 border border-border hover:bg-foreground hover:text-background transition-colors"
                >
                    SETTINGS
                </button>
            </div>
        </div>
    )
}
