"use client"

interface StatusBarProps {
    onSettingsClick: () => void
}

export function StatusBar({ onSettingsClick }: StatusBarProps) {
    return (
        <div className="h-12 min-h-[3rem] pt-[env(safe-area-inset-top)] border-b border-border flex items-center justify-between px-4 md:px-6 text-[10px] font-medium tracking-wider bg-background z-50 shrink-0">
            <div className="flex items-center gap-6">
                <div className="text-xs tracking-[0.2em]">AGENT.CONTROL</div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="hidden md:block">SYSTEM.ONLINE</div>
                    <div className="hidden md:block">|</div>
                    <div className="text-foreground hidden sm:block">MODEL: CLAUDE-SONNET-4</div>
                    <div className="sm:hidden">CLHAU-S4</div>
                    <div className="hidden md:block">|</div>
                    <div className="hidden md:block">CPU: 34%</div>
                    <div className="hidden md:block">|</div>
                    <div className="hidden md:block">MEM: 2.1GB</div>
                </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
                <div className="hidden sm:block">TOKENS: 668:346</div>
                <div className="hidden sm:block">|</div>
                <div className="hidden sm:block">TIME: 15:23:33</div>
                <div className="hidden sm:block">|</div>
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
``