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
- **Multi-Agent Simulation**: Interact with mock versions of Claude Code, Gemini CLI, and Codex.
- **Headless Protocol Emulation**: Realistic streaming text and latency simulation.
- **Deep Inspection**: View "Tool Calls" and "File Diffs" in the Agent Panel.
- **Industrial UI**: Custom dark mode designed for professional engineering workflows.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun 1.x
- **Styling**: Tailwind CSS v4 + Lucide React
- **Language**: TypeScript (Strict Mode)

## 📄 Documentation
See [manual_process.md](./manual_process.md) for a detailed breakdown of engineering decisions, AI usage logs, and compliance with the Southbridge AI Specs.
