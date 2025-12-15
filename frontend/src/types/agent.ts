
export interface ToolCall {
    id: string;
    tool: string;
    args: Record<string, any>;
    status: "running" | "completed" | "failed";
    result?: string;
    timestamp: string;
}

export interface FileDiff {
    path: string;
    original: string;
    modified: string;
    type: "modify" | "create" | "delete";
}

// ... existing stream functions ...

export const MOCK_TOOL_CALLS: ToolCall[] = [
    {
        id: "call_1",
        tool: "fs.list_files",
        args: { path: "./src/components" },
        status: "completed",
        timestamp: "10:23:45",
        result: "Found: Header.tsx, Footer.tsx"
    },
    {
        id: "call_2",
        tool: "semantic_search",
        args: { query: "authentication middleware" },
        status: "completed",
        timestamp: "10:23:48",
        result: "Matches in src/middleware.ts (85%)"
    }
];

export const MOCK_DIFFS: FileDiff[] = [
    {
        path: "/src/auth.ts",
        type: "modify",
        original: `export function auth() {\n  return false;\n}`,
        modified: `export function auth() {\n  // Implementation of JWT\n  return true;\n}`
    }
];
