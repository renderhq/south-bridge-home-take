"use client"

import { useState } from "react"
import { StatusBar } from "@/components/ui/status-bar"
import { Settings } from "@/components/settings"
import { PromptForm } from "@/components/PromptForm"
import { AgentPanel } from "@/components/AgentPanel"
import { AgentState, ToolCall, FileDiff, SimulationConfig } from "@/lib/types"
import { simulateAgent } from "@/lib/mock-api"
import { ToastContainer, useToast } from "@/components/ui/toast"

export default function Page() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("claude-code")
  const [showSettings, setShowSettings] = useState(false)

  // Toast notifications
  const { toasts, showToast, closeToast } = useToast()

  // Simulation Configuration State
  const [config, setConfig] = useState<SimulationConfig>({
    model: "claude-3-opus",
    maxTokens: 4000,
    temperature: 0.7,
    workingDir: "./src",
    streamSpeed: 150
  })

  const [agents, setAgents] = useState<AgentState[]>([
    {
      id: "claude-code",
      name: "CLAUDE.CODE",
      status: "IDLE",
      task: "WAITING_FOR_INPUT",
      progress: 0,
      output: "Agent ready. Awaiting instructions...",
      files: [],
      toolCalls: [],
      diffs: [],
      logs: [],
      time: "0s",
      tokens: "0"
    },
    {
      id: "gemini-cli",
      name: "GEMINI.CLI",
      status: "IDLE",
      task: "WAITING_FOR_INPUT",
      progress: 0,
      output: "System initialized. Ready.",
      files: [],
      toolCalls: [],
      diffs: [],
      logs: [],
      time: "0s",
      tokens: "0"
    },
    {
      id: "codex",
      name: "CODEX",
      status: "IDLE",
      task: "WAITING_FOR_INPUT",
      progress: 0,
      output: "Codex engine standby.",
      files: [],
      toolCalls: [],
      diffs: [],
      logs: [],
      time: "0s",
      tokens: "0"
    },
  ])

  const [activeAgentIds, setActiveAgentIds] = useState<string[]>(["claude-code"])
  const [runningAgents, setRunningAgents] = useState<Record<string, () => void>>({})

  const handlePromptSubmit = async (prompt: string, files: File[]) => {
    // 1. Reset and Start
    const targets = agents.filter(a => activeAgentIds.includes(a.id));

    // Reset state for target agents
    setAgents(prev => prev.map(a => {
      if (activeAgentIds.includes(a.id)) {
        return {
          ...a,
          status: "THINKING",
          progress: 0,
          output: `> ${prompt}\n\n`,
          toolCalls: [],
          diffs: [],
          logs: [],
          tokens: "0",
          time: "0s"
        }
      }
      return a;
    }));

    // 2. Trigger Simulation for each
    targets.forEach(agent => {
      // Create a wrapper to handle cleanup
      const handleComplete = () => {
        setRunningAgents(prev => {
          const newState = { ...prev };
          delete newState[agent.id];
          return newState;
        });
      };

      const startTime = Date.now();
      const cancelFn = simulateAgent(agent.id, prompt, {
        onStream: (chunk) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, output: a.output + chunk } : a));
          // Update time/tokens roughly
          const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
          setAgents(prev => prev.map(a => a.id === agent.id ? {
            ...a,
            time: `${elapsed}s`,
            tokens: `${Math.floor(a.output.length / 3.5) + 120}`
          } : a));
        },
        onToolCall: (tool) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, toolCalls: [...a.toolCalls, tool] } : a));
        },
        onToolUpdate: (toolId, update) => {
          setAgents(prev => prev.map(a => {
            if (a.id !== agent.id) return a;
            return {
              ...a,
              toolCalls: a.toolCalls.map(t => t.id === toolId ? { ...t, ...update } : t)
            }
          }));
        },
        onDiff: (diff) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, diffs: [...a.diffs, diff], files: [...new Set([...a.files, diff.path])] } : a));
        },
        onProgress: (prog) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, progress: prog } : a));
        },
        onStatus: (status) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, status: status } : a));
        },
        onLog: (log) => {
          setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, logs: [...a.logs, log] } : a));
        },
        onComplete: () => {
          handleComplete();
        }
      }, config); // Pass config to simulation

      // Verify cancelFn is returned (it might be void if mock-api not updated yet in memory, but we wrote it)
      if (typeof cancelFn === 'function') {
        setRunningAgents(prev => ({ ...prev, [agent.id]: cancelFn }));
      }
    });
  }

  const handleStopAgent = (agentId: string) => {
    if (runningAgents[agentId]) {
      runningAgents[agentId]();
      setRunningAgents(prev => {
        const newState = { ...prev };
        delete newState[agentId];
        return newState;
      });
      showToast(`Stopped agent ${agentId}`, "info");
    }
  }

  const toggleAgentSelection = (id: string) => {
    setActiveAgentIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const updateAgent = (agentId: string, updates: Partial<AgentState>) => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, ...updates } : a));
  }

  const activeAgentData = agents.find(a => a.id === selectedAgentId) || agents[0];

  return (
    <div className="h-dvh w-full bg-background flex flex-col font-mono text-foreground overflow-hidden supports-[height:100cqh]:h-[100cqh]">
      <StatusBar model={config.model} onSettingsClick={() => setShowSettings(true)} />

      <div className="flex flex-col md:flex-row flex-1 border-t border-border overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border flex flex-col bg-muted/5 flex-shrink-0 max-h-[25dvh] md:max-h-none overflow-hidden transition-all duration-300">

          <div className="p-2 bg-muted/10 border-b border-border text-[9px] font-bold text-muted-foreground px-4 py-2 sticky top-0 bg-background/95 backdrop-blur z-10 shrink-0">
            ACTIVE SESSIONS
          </div>

          {/* Agent List */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`w-full text-left p-3 md:p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-muted/10 active:bg-muted/30 active:scale-[0.99] relative group ${selectedAgentId === agent.id ? "bg-muted/20" : ""
                  }`}
              >
                {/* Active Indicator Strip */}
                {selectedAgentId === agent.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold tracking-tight truncate mr-2 ${selectedAgentId === agent.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {agent.name}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 border rounded-sm shrink-0 ${agent.status === "STREAMING" ? "border-green-500 text-green-500 animate-pulse" :
                    agent.status === "ERROR" ? "border-red-500 text-red-500" :
                      "border-border text-muted-foreground"
                    }`}>
                    {agent.status}
                  </span>
                </div>

                <div className="text-[10px] text-muted-foreground truncate font-mono mb-2 opacity-80">
                  {agent.task}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${agent.status === 'ERROR' ? 'bg-red-500' : 'bg-primary'} transition-all duration-500`}
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono w-6 text-right">{Math.round(agent.progress)}%</span>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Main Console Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-background/50 h-full overflow-hidden">
          <div className="flex-1 overflow-hidden relative">
            <AgentPanel
              agent={activeAgentData}
              showToast={showToast}
              onUpdateAgent={updateAgent}
              onStopAgent={handleStopAgent}
            />
          </div>

          {/* Semantic Prompt Input - Centered & Clean */}
          <div className="border-t border-border bg-background p-4 md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6 shrink-0 z-20">
            <div className="max-w-3xl mx-auto w-full">
              <PromptForm onSubmit={handlePromptSubmit} />

              {/* Agent Target Selector */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 pl-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">Target:</span>
                {agents.map(a => (
                  <label key={a.id} className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={activeAgentIds.includes(a.id)}
                      onChange={() => toggleAgentSelection(a.id)}
                      className="accent-primary rounded-sm w-3 h-3 shrink-0"
                    />
                    <span className={activeAgentIds.includes(a.id) ? "text-foreground font-medium truncate max-w-[100px]" : "text-muted-foreground truncate max-w-[100px]"}>{a.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && <Settings config={config} onSave={setConfig} onClose={() => setShowSettings(false)} />}
      <ToastContainer toasts={toasts} onClose={closeToast} />
    </div>
  )
}
