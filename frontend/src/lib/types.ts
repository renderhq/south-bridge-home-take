export interface ToolCall {
    id: string;
    tool: string;
    args: Record<string, any>;
    status: "pending" | "running" | "completed" | "failed";
    result?: string;
    timestamp: string;
}

export interface FileDiff {
    path: string;
    original: string;
    modified: string;
    type: "modify" | "create" | "delete";
}

export interface AgentState {
    id: string;
    name: string;
    status: "IDLE" | "THINKING" | "STREAMING" | "COMPLETED" | "ERROR";
    task: string;
    progress: number;
    output: string;
    files: string[];
    toolCalls: ToolCall[];
    diffs: FileDiff[];
    logs: string[];
    time?: string;
    tokens?: string;
}

export interface SimulationConfig {
    model: string;
    maxTokens: number;
    temperature: number;
    workingDir: string;
    streamSpeed: number; // ms between chunks
}
