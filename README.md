
<<<<<<< HEAD
# Southbridge Frontend Take Home

=======

# Southbridge Frontend Take Home

A high-fidelity frontend implementation for the Southbridge multi-agent interface, built with Next.js and Bun.

>>>>>>> ab3519ea13f742b9249c1419b73bb7be2171b1f5
> **Note:** This project uses **mock APIs** to simulate agent behavior (Claude Code, Gemini CLI, Codex). No real agent backend is connected; all outputs are for UI demonstration and testing purposes.

---

## Getting Started

### Prerequisites

* Bun (latest)

### Installation

```bash
cd frontend
bun install
```

### Running Locally

```bash
bun dev
```

Access at [http://localhost:3000](http://localhost:3000)

---

## Features

### Core Functionality

* **Multi-Agent Simulation** with mock versions of Claude Code, Gemini CLI, and Codex
* **Parallel Agent Execution** on the same prompt
* **Real-time Streaming** with configurable speed
* **Tool Call Visualization** for simulated agent tools
* **File Diff Viewer** to compare code changes side-by-side
* **Internal Logs** with categorized execution steps

### Settings & Configuration

* **Model Selection**: Claude 3 Opus, GPT-4 Turbo, or Codex Alpha
* **Max Tokens**: Controls output length
* **Temperature**: Adjust randomness/verbosity (0.0–1.0)
* **Stream Speed**: Delay in milliseconds for simulated streaming
* **Working Directory**: Set mock workspace path

All changes affect the next agent execution immediately — no restart required.

### UI/UX Features

* Industrial dark theme
* Tabbed agent view (Output, Files, Logs)
* Dynamic status bar with metrics
* Agent selection checkboxes
* Progress tracking and visual indicators
* Responsive layout with session management

---

## Usage

1. Select target agents via checkboxes
2. Enter a prompt describing the coding task
3. Submit using Enter or the action button
4. View results:

   * Switch between agents in the sidebar
   * Use tabs for Output, Files, or Logs
   * Click files to inspect diffs
5. Adjust settings from the top-right configuration panel

---

## Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Runtime**: Bun 1.x
* **Styling**: Tailwind CSS v4 + Lucide React
* **Language**: TypeScript (Strict Mode)

---

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

---

## Simulation Details

* Configurable streaming speed
* Temperature-influenced randomness for tool calls
* Realistic tool invocations (`fs.read_file`, `ast.parse`, `test.run`)
* File diff generation for common configuration/source files
* Progress tracking and completion detection
* Categorized logs ([SYSTEM], [TOOL], [THOUGHT], etc.)

<<<<<<< HEAD

Do you want me to do that next?
=======
>>>>>>> ab3519ea13f742b9249c1419b73bb7be2171b1f5
