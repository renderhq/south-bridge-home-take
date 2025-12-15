
// Simulates a stream of characters for a coding response
export async function streamResponse(
    prompt: string,
    onChunk: (chunk: string) => void,
    onComplete: (files: string[]) => void
) {
    const responses = [
        `// Analyzing request: ${prompt}\n// Identifying relevant files...\n// Found match in auth module.\n\nfunction validateSession(token) {\n  const decoded = decode(token);\n  return decoded.isValid;\n}`,
        `# Checking dependencies...\n# Installing missing packages...\nbun add @auth/core\n\n# Configuration updated.`,
        `/* Refactoring component structure */\n\nexport const AgentView = () => {\n  return <div>Agent Online</div>\n}`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    let currentText = "";
    const chars = randomResponse.split("");

    for (const char of chars) {
        currentText += char;
        onChunk(currentText); // In a real app, this would be delta chunks, but full text is easier for this mock
        await new Promise(resolve => setTimeout(resolve, 15 + Math.random() * 30));
    }

    onComplete(["/src/components/Auth.tsx", "/src/lib/api.ts"]);
}

export const MOCK_AGENTS = [
    {
        id: "claude-code",
        name: "CLAUDE.CODE",
        status: "IDLE", // Changed from static STREAMING
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
]
