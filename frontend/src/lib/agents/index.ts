// Simulates a stream of characters for a coding response with multiple steps
export async function streamResponse(
    prompt: string,
    onChunk: (chunk: string) => void,
    onComplete: (files: string[]) => void
) {
    const responses = [
        `// Analyzing request: ${prompt}\n// Searching relevant modules...\n// Found match in auth module.\n\nfunction validateSession(token) {\n  const decoded = decode(token);\n  return decoded.isValid;\n}`,
        `# Checking dependencies...\n# Installing missing packages...\nbun add @auth/core\n\n# Configuration updated successfully.`,
        `/* Refactoring component structure */\n\nexport const AgentView = () => {\n  return <div>Agent Online</div>\n}`,
        `// Performing unit tests...\n// 3 tests failed, applying hotfix...\nconst fix = () => console.log('Patched');`,
        `/* Logging and metrics update */\nconsole.info("Task completed with minor warnings");`,
        `# Security check: all modules scanned\n# No vulnerabilities found\n# Ready for deployment`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 1000));

    let currentText = "";
    const chars = randomResponse.split("");

    for (const char of chars) {
        currentText += char;
        onChunk(currentText); // Full text chunk simulation
        await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 25));
    }

    onComplete([
        "/src/components/Auth.tsx",
        "/src/lib/api.ts",
        "/src/utils/logger.ts",
        "/src/hooks/useSession.ts"
    ]);
}

export const MOCK_AGENTS = [
    {
        id: "claude-code",
        name: "CLAUDE.CODE",
        status: "IDLE",
        task: "WAITING_FOR_INPUT",
        progress: 0,
        output: "// Waiting for system command...",
        files: [],
    },
    {
        id: "gemini-cli",
        name: "GEMINI.CLI",
        status: "IDLE",
        task: "STANDBY_MODE",
        progress: 0,
        output: "> System ready.\n> Listening on port 3000.",
        files: [],
    },
    {
        id: "codex",
        name: "CODEX",
        status: "OFFLINE",
        task: "SYSTEM_HALTED",
        progress: 0,
        output: "[!] Connection lost to upstream provider.",
        files: [],
    },
    {
        id: "oracle-ai",
        name: "ORACLE.AI",
        status: "IDLE",
        task: "WAITING_FOR_PROMPT",
        progress: 0,
        output: "Oracle engine ready. Awaiting instructions...",
        files: [],
    },
    {
        id: "nova-cli",
        name: "NOVA.CLI",
        status: "IDLE",
        task: "READY",
        progress: 0,
        output: "System initialized. Listening for tasks...",
        files: [],
    },
];

export const MOCK_TOOL_CALLS = [
    {
        id: "call_1",
        tool: "fs.list_files",
        args: { path: "./src/components" },
        status: "completed",
        timestamp: "10:23:45",
        result: "Found: Header.tsx, Footer.tsx, Sidebar.tsx"
    },
    {
        id: "call_2",
        tool: "semantic_search",
        args: { query: "authentication middleware" },
        status: "completed",
        timestamp: "10:23:48",
        result: "Matches in src/middleware.ts (85%)"
    },
    {
        id: "call_3",
        tool: "run_tests",
        args: { path: "./src" },
        status: "completed",
        timestamp: "10:24:10",
        result: "12 tests passed, 1 test failed (fixed automatically)"
    },
    {
        id: "call_4",
        tool: "lint_fix",
        args: { path: "./src/components" },
        status: "completed",
        timestamp: "10:24:22",
        result: "Fixed 8 warnings and 2 errors"
    },
    {
        id: "call_5",
        tool: "deploy_preview",
        args: { env: "staging" },
        status: "running",
        timestamp: "10:25:00",
    }
];

export const MOCK_DIFFS = [
    {
        path: "/src/auth.ts",
        type: "modify",
        original: `export function auth() {\n  return false;\n}`,
        modified: `export function auth() {\n  // Implementation of JWT\n  return true;\n}`
    },
    {
        path: "/src/components/Header.tsx",
        type: "modify",
        original: `<header>Old Header</header>`,
        modified: `<header><nav>New Header Navigation</nav></header>`
    },
    {
        path: "/src/hooks/useSession.ts",
        type: "create",
        original: ``,
        modified: `import { useState } from 'react';\nexport function useSession() { const [user, setUser] = useState(null); return { user, setUser }; }`
    },
    {
        path: "/src/lib/logger.ts",
        type: "modify",
        original: `console.log("Logging...")`,
        modified: `console.info("Structured logging initialized")`
    },
];
