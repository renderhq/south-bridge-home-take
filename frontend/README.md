# Southbridge Frontend Take Home (Level 2)

This repository contains the high-fidelity frontend implementation for the Southbridge multi-agent interface.

## 🚀 Getting Started

### Prerequisites
- **Bun**: This project explicitly uses Bun as the runtime and package manager.
  ```bash
  # Install Bun if needed
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

## 🏗 Features

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

**All settings changes immediately affect the next agent execution** - no restart required!

### UI/UX Features
- **Industrial Dark Theme**: Professional engineering-focused design
- **Tabbed Agent View**: Switch between Output, Files, and Logs
- **Dynamic Status Bar**: Real-time CPU/Memory metrics and active model display
- **Agent Selection**: Choose which agents to run via checkboxes
- **Progress Tracking**: Visual progress bars and status indicators
- **Responsive Layout**: Sidebar navigation with agent session management

## 🎮 Usage

1. **Select Target Agents**: Use the checkboxes at the bottom to select which agents should execute
2. **Enter a Prompt**: Type your coding task in the prompt input area
3. **Submit**: Press Enter or click the arrow button
4. **View Results**: 
   - Switch between agents in the sidebar
   - Use tabs to view Output, Files, or Logs
   - Click on files to see diffs
5. **Adjust Settings**: Click Settings in the top-right to modify simulation parameters

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun 1.x
- **Styling**: Tailwind CSS v4 + Lucide React
- **Language**: TypeScript (Strict Mode)

## 📁 Project Structure
```
src/
├── app/
│   ├── page.tsx              # Main application logic
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── AgentPanel.tsx        # Agent output/files/logs viewer
│   ├── FileDiffViewer.tsx    # Side-by-side diff display
│   ├── PromptForm.tsx        # Input form with file upload
│   ├── settings.tsx          # Configuration modal
│   └── ui/
│       └── status-bar.tsx    # Top status bar
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── mock-api.ts           # Agent simulation engine
```

## 🧪 Simulation Details

The mock agent simulation includes:
- **Configurable streaming speed** based on Settings
- **Temperature-influenced randomness** for tool calls and logs
- **Realistic tool invocations** (fs.read_file, ast.parse, test.run, etc.)
- **File diff generation** for common auth/config files
- **Progress tracking** with completion detection
- **Internal logging** with categorized prefixes ([SYSTEM], [TOOL], [THOUGHT], etc.)

## 📄 Documentation
See [manual_process.md](./manual_process.md) for a detailed breakdown of engineering decisions, AI usage logs, and compliance with the Southbridge AI Specs.

