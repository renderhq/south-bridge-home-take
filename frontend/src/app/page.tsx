"use client"

import { useState } from "react"
import { AgentPanel } from "@/components/agent-panel"
import { StatusBar } from "@/components/status-bar"

export default function Page() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>("claude-code")

  const agents = [
    {
      id: "claude-code",
      name: "CLAUDE.CODE",
      status: "STREAMING",
      task: "AUTH_MODULE_REFACTOR",
      progress: 67,
      output: `// Implementation uses JWT tokens instead of session-based auth\n\nconst implementation = {\n  store: 'in-memory session store',\n  method: 'JWT tokens',\n  path: '/src/auth/jwt.ts'\n}\n\n// Create JWT service\nexport const jwtAuth = {\n  sign: (payload) => jwt.sign(payload, SECRET),\n  verify: (token) => jwt.verify(token, SECRET)\n}\n\n// Refactored middleware\nexport const requireAuth = async (req, res, next) => {\n  const token = req.headers.authorization\n  if (!token) return res.status(401).json({ error: 'Unauthorized' })\n  \n  try {\n    const user = jwtAuth.verify(token)\n    req.user = user\n    next()\n  } catch (err) {\n    return res.status(401).json({ error: 'Invalid token' })\n  }\n}`,
      files: ["/src/auth/jwt.ts", "/src/middleware/auth.ts", "/src/routes/api.ts"],
    },
    {
      id: "gemini-cli",
      name: "GEMINI.CLI",
      status: "READY",
      task: "TOKEN_REFRESH_COMPONENT",
      progress: 100,
      output: `// Utility functions for signing and verifying tokens\n\nconst validateJWT = (token: string): boolean => {\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET)\n    return decoded.exp > Date.now() / 1000\n  } catch {\n    return false\n  }\n}\n\n// Token refresh endpoint\nexport async function POST(req: Request) {\n  const refreshToken = req.headers.get('x-refresh-token')\n  \n  if (!refreshToken || !validateJWT(refreshToken)) {\n    return Response.json({ error: 'Invalid refresh token' }, { status: 401 })\n  }\n  \n  const newAccessToken = generateAccessToken(userId)\n  return Response.json({ accessToken: newAccessToken })\n}`,
      files: ["/src/utils/auth.ts", "/src/app/api/auth/refresh/route.ts"],
    },
    {
      id: "codex",
      name: "CODEX",
      status: "ERROR",
      task: "PERMISSION_SYSTEM",
      progress: 43,
      output: `// Permission service implementation\n\ntype Permission = 'read' | 'write' | 'delete' | 'admin'\n\ninterface User {\n  id: string\n  permissions: Permission[]\n}\n\nexport const hasPermission = (user: User, required: Permission): boolean => {\n  if (user.permissions.includes('admin')) return true\n  return user.permissions.includes(required)\n}\n\n// ERROR: Missing permission check in /api/users endpoint\n// This may be incorrect - need to verify\n\n[!] Cannot find file: /src/permissions/schema.ts`,
      files: ["/src/permissions/index.ts"],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col font-mono">
      <StatusBar />

      <div className="flex flex-1 border-t border-border">
        {/* Agent List Sidebar */}
        <div className="w-64 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="text-[10px] font-medium tracking-wider">ACTIVE.AGENTS</div>
            <div className="text-[10px] text-muted-foreground mt-1">3 / 8 ALLOCATED</div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left p-4 border-b border-border hover:bg-muted transition-colors ${selectedAgent === agent.id ? "bg-muted" : ""
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium tracking-wide">{agent.name}</div>
                  <div
                    className={`text-[9px] px-1.5 py-0.5 border ${agent.status === "STREAMING"
                        ? "border-foreground"
                        : agent.status === "READY"
                          ? "border-muted-foreground"
                          : "border-destructive"
                      }`}
                  >
                    {agent.status}
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground mb-2">{agent.task}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-0.5 bg-muted">
                    <div className="h-full bg-foreground" style={{ width: `${agent.progress}%` }} />
                  </div>
                  <div className="text-[9px] text-muted-foreground">{agent.progress}%</div>
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
        <div className="flex-1 flex flex-col">
          {selectedAgent && <AgentPanel agent={agents.find((a) => a.id === selectedAgent)!} />}
        </div>
      </div>
    </div>
  )
}
