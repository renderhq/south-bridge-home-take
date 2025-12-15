"use client"

import { useState } from "react"
import { AgentPanel } from "@/components/agent-panel"
import { StatusBar } from "@/components/status-bar"
import { Settings } from "@/components/settings"
import { PromptForm } from "@/components/prompt-form" // Added missing import
import { MOCK_AGENTS, streamResponse, MOCK_TOOL_CALLS, MOCK_DIFFS } from "@/lib/mock-api"
import { MOCK_AGENTS as INITIAL_AGENTS } from "@/lib/mock-api"


export default function Page() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>("claude-code")
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [showSettings, setShowSettings] = useState(false)

  const handlePromptSubmit = async (prompt: string, files: File[]) => {
    if (!selectedAgentId) return

    // 1. Update status to thinking
    setAgents(prev => prev.map(a =>
      a.id === selectedAgentId
        ? { ...a, status: "THINKING", task: "PROMPT_ANALYSIS", output: "", toolCalls: [], diffs: [] }
        : a
    ))

    // 2. Start streaming simulation
    await streamResponse(
      prompt,
      (chunk) => {
        setAgents(prev => prev.map(a =>
          a.id === selectedAgentId
            ? { ...a, status: "STREAMING", output: chunk, progress: Math.min(60, a.progress + 2) }
            : a
        ))
      },
      (files) => {
        // add delay for tool calls appearing
        setAgents(prev => prev.map(a =>
          a.id === selectedAgentId
            ? { ...a, progress: 80, toolCalls: MOCK_TOOL_CALLS }
            : a
        ))

        setTimeout(() => {
          setAgents(prev => prev.map(a =>
            a.id === selectedAgentId
              ? { ...a, status: "READY", task: "COMPLETED", progress: 100, files: files, diffs: MOCK_DIFFS }
              : a
          ))
        }, 1000)

      }
    )
  }

  const selectedAgent = agents.find((a) => a.id === selectedAgentId)

  return (
    <div className="min-h-screen bg-background flex flex-col font-mono text-foreground">
      <StatusBar onSettingsClick={() => setShowSettings(true)} />

      <div className="flex flex-1 border-t border-border overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-border flex flex-col bg-sidebar">
          <div className="p-4 border-b border-border">
            <div className="text-[10px] font-medium tracking-wider text-muted-foreground">ACTIVE.AGENTS</div>
            <div className="text-[10px] text-muted-foreground mt-1">3 / 8 ALLOCATED</div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`w-full text-left p-4 border-b border-border transition-colors hover:bg-sidebar-accent/50 ${selectedAgentId === agent.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground"
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium tracking-wide">{agent.name}</div>
                  <div
                    className={`text-[9px] px-1.5 py-0.5 border ${agent.status === "STREAMING" || agent.status === "THINKING"
                        ? "border-primary text-primary animate-pulse"
                        : agent.status === "READY" || agent.status === "IDLE"
                          ? "border-muted-foreground text-muted-foreground"
                          : "border-destructive text-destructive"
                      }`}
                  >
                    {agent.status}
                  </div>
                </div>
                <div className="text-[10px] opacity-70 mb-2 truncate">{agent.task}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-0.5 bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${agent.progress}%` }} />
                  </div>
                  <div className="text-[9px] opacity-70">{Math.round(agent.progress)}%</div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <button className="w-full py-2 border border-border hover:bg-foreground hover:text-background transition-colors text-xs font-medium tracking-wide">
              + NEW.AGENT
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedAgent ? (
            <>
              <div className="flex-1 overflow-hidden flex flex-col">
                <AgentPanel agent={selectedAgent as any} />
              </div>
              <PromptForm onSubmit={handlePromptSubmit} disabled={selectedAgent.status === "STREAMING"} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs tracking-widest">
              SELECT AN AGENT TO BEGIN_
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal Overlay */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}
