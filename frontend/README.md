# Southbridge Frontend Take Home

A high-fidelity frontend implementation for the Southbridge multi-agent interface, built with Next.js and Bun.

## Getting Started

### Prerequisites

- **Bun**: This project uses Bun as the runtime and package manager.
  ```bash
  # Install Bun (Windows)
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Running Locally

Start the development server:
```bash
bun dev
```

Access the application at `http://localhost:3000`.

## Features

### Core Functionality

- **Multi-Agent Simulation**: Interact with mock versions of Claude Code, Gemini CLI, and Codex
- **Parallel Agent Execution**: Run multiple agents simultaneously on the same prompt
- **Real-time Streaming**: Simulated streaming output with configurable speed
- **Tool Call Visualization**: View agent tool invocations with status tracking
- **File Diff Viewer**: Side-by-side comparison of original vs modified code
- **Internal Logs**: Color-coded log viewer showing agent thought process

### Settings & Configuration

The Settings modal provides full control over simulation behavior:

- **Model Selection**: Choose between Claude 3 Opus, GPT-4 Turbo, or Codex Alpha
- **Max Tokens**: Control output length (affects metrics display)
- **Temperature**: Adjusts randomness and verbosity of simulation (0.0 - 1.0)
- **Stream Speed**: Configure streaming delay in milliseconds (lower = faster)
- **Working Directory**: Set the simulated workspace path

All settings changes immediately affect the next agent execution - no restart required.

### UI/UX Features

- **Industrial Dark Theme**: Professional engineering-focused design
- **Tabbed Agent View**: Switch between Output, Files, and Logs
- **Dynamic Status Bar**: Real-time metrics display with tokens, time, and tool counts
- **Agent Selection**: Choose which agents to run via checkboxes
- **Progress Tracking**: Visual progress bars and status indicators
- **Responsive Layout**: Clean, organized interface with agent session management

## Usage

1. **Select Target Agents**: Use the checkboxes to select which agents should execute
2. **Enter a Prompt**: Type your coding task in the prompt input area
3. **Submit**: Press Enter or click the arrow button
4. **View Results**: 
   - Switch between agents in the sidebar
   - Use tabs to view Output, Files, or Logs
   - Click on files to see diffs
5. **Adjust Settings**: Click Settings in the top-right to modify simulation parameters

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun 1.x
- **Styling**: Tailwind CSS v4 + Lucide React
- **Language**: TypeScript (Strict Mode)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main application logic
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── AgentPanel.tsx        # Agent output/files/logs viewer
│   ├── FileDiffViewer.tsx    # Side-by-side diff display
│   ├── PromptForm.tsx        # Input form with agent selection
│   ├── StreamingConsole.tsx  # Streaming output display
│   ├── ToolCallViewer.tsx    # Tool execution visualization
│   ├── settings.tsx          # Configuration modal
│   ├── status-bar.tsx        # Top status bar
│   └── ui/
│       └── toast.tsx         # Toast notifications
└── lib/
    ├── types.ts              # TypeScript interfaces
    ├── mock-api.ts           # Agent simulation engine
    └── agents/
        ├── base-agent.ts     # Base agent configuration
        └── index.ts          # Agent registry
```

## Simulation Details

The mock agent simulation includes:

- **Configurable streaming speed** based on Settings
- **Temperature-influenced randomness** for tool calls and logs
- **Realistic tool invocations** (fs.read_file, ast.parse, test.run, etc.)
- **File diff generation** for common auth/config files
- **Progress tracking** with completion detection
- **Internal logging** with categorized prefixes ([SYSTEM], [TOOL], [THOUGHT], etc.)

## Architecture Highlights

### Component Design

- **AgentPanel**: Unified component for displaying agent output, file changes, and internal logs
- **FileDiffViewer**: Interactive side-by-side diff viewer with syntax highlighting
- **StreamingConsole**: Real-time streaming display with auto-scroll and status tracking
- **ToolCallViewer**: Visual representation of tool executions with success/error states

### State Management

- **Zustand**: Lightweight state management for agent store
- **React Hooks**: Local state for UI interactions and animations
- **Settings Persistence**: Configuration saved to localStorage

### Performance Optimizations

- **Code splitting**: Automatic route-based code splitting
- **Lazy loading**: Components loaded on demand
- **Memoization**: Optimized re-renders for large lists
- **Virtual scrolling**: Efficient rendering for large log outputs

## Additional Documentation

See the following files for more details:

- **PROCESS_DOCUMENTATION.md**: Detailed engineering decisions and implementation notes
- **BUTTONS_WORK.md**: Button functionality and interaction patterns
- **TESTING.md**: Testing strategy and QA checklist
- **FEATURES.md**: Comprehensive feature list with screenshots

## License

MIT
