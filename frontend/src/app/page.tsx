"use client"

import { useState } from "react"
import { StatusBar } from "@/components/ui/status-bar"
import { PromptForm } from "@/components/prompt/PromptForm" // Updated import
import { StreamingConsole, ToolCall, FileDiff } from "@/components/StreamingConsole"
import { Settings } from "@/components/settings"

// Mock Data Generator
const MOCK_TOOL_CALL: ToolCall = {
  id: "call_123",
  tool: "fs.read_file",
  args: { path: "src/auth/config.ts" },
  status: "completed",
  result: "content...",
  timestamp: "12:04:33"
}

const MOCK_DIFF: FileDiff = {
  path: "src/auth/config.ts",
  original: "export const AUTH_ENABLED = false;",
  modified: "export const AUTH_ENABLED = true;\nexport const AUTH_PROVIDER = 'auth0';"
}

export default function Page() {
  const [agents, setAgents] = useState([
    { id: "claude", name: "Claude Code", selected: true, status: "IDLE", output: "Waiting for instructions...", toolCalls: [], diffs: [] },
    { id: "opencode", name: "OpenCode", selected: true, status: "IDLE", output: "System Online.", toolCalls: [], diffs: [] },
    { id: "codex", name: "Codex", selected: true, status: "IDLE", output: "Ready.", toolCalls: [], diffs: [] }
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handlePromptSubmit = async (prompt: string) => {
    setIsStreaming(true)

    // 1. Set all selected agents to Streaming
    setAgents(prev => prev.map(a => a.selected ? { ...a, status: "STREAMING", output: "", toolCalls: [], diffs: [] } : a))

    // 2. Simulate parallel streaming for all selected agents
    const updateInterval = setInterval(() => {
      setAgents(prev => prev.map(a => {
        if (!a.selected || a.status !== "STREAMING") return a;

        // Append random tokens
        const newOutput = a.output + " " + ["analyzing", "checking", "updating", "refactoring", "context"][Math.floor(Math.random() * 5)];

        // Randomly inject a tool call
        const newTools = Math.random() > 0.95 ? [...a.toolCalls, { ...MOCK_TOOL_CALL, id: Date.now().toString() }] : a.toolCalls;

        // Randomly inject a diff
        const newDiffs = Math.random() > 0.98 ? [...a.diffs, MOCK_DIFF] : a.diffs;

        return { ...a, output: newOutput, toolCalls: newTools as any, diffs: newDiffs as any };
      }))
    }, 100)

    // 3. Finish after 5 seconds
    setTimeout(() => {
      clearInterval(updateInterval)
      setAgents(prev => prev.map(a => a.selected ? { ...a, status: "COMPLETED" } : a))
      setIsStreaming(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col">
      <StatusBar onSettingsClick={() => setShowSettings(true)} />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 flex flex-col gap-6">
        {/* Top Section: Prompt & Controls */}
        <section className="border border-border p-4 bg-muted/10 rounded-sm">
          <PromptForm onSubmit={handlePromptSubmit} disabled={isStreaming} />

          {/* Agent Selector (Mock Multi-select) */}
          <div className="mt-4 flex gap-4 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider py-1">Target Agents:</span>
            {agents.map(agent => (
              <label key={agent.id} className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary">
                <input
                  type="checkbox"
                  checked={agent.selected}
                  onChange={() => setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, selected: !a.selected } : a))}
                  className="accent-primary"
                />
                {agent.name}
              </label>
            ))}
          </div>
        </section>

        {/* Streaming Area - Simultaneous Output */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {agents.filter(a => a.selected).map(agent => (
            <StreamingConsole
              key={agent.id}
              agentName={agent.name}
              status={agent.status}
              output={agent.output}
              toolCalls={agent.toolCalls as any}
              diffs={agent.diffs as any}
            />
          ))}
        </section>
      </main>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}
