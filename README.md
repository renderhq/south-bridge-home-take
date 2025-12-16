# Southbridge Frontend Take Home

A high‑fidelity frontend implementation of a **multi‑agent coding interface**, built with **Next.js** and **Bun**.

> **Note**: This project uses **mock APIs** to simulate agent behavior (Claude Code, Gemini CLI, Codex). No real agent backends are connected. All outputs are for **UI demonstration and testing** purposes only.

---

## Getting Started

### Prerequisites

* **Bun** (latest version)

### Installation

```bash
cd frontend
bun install
```

### Running Locally

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

### Core Functionality

* **Multi‑Agent Simulation** (Claude Code, Gemini CLI, Codex)
* **Parallel Agent Execution** on a single prompt
* **Real‑Time Streaming** with configurable speed
* **Tool Call Visualization** for simulated agent actions
* **File Diff Viewer** for side‑by‑side code comparisons
* **Internal Execution Logs** with categorized steps

### Settings & Configuration

* **Model Selection**: Claude 3 Opus, GPT‑4 Turbo, Codex Alpha
* **Max Tokens**: Controls response length
* **Temperature**: Adjusts randomness (0.0–1.0)
* **Stream Speed**: Delay (ms) for simulated streaming
* **Working Directory**: Mock workspace path

All configuration changes apply **immediately** to the next agent execution — no restart required.

### UI / UX Highlights

* Industrial dark theme
* Tabbed agent views (Output, Files, Logs)
* Dynamic status bar with execution metrics
* Agent selection via checkboxes
* Progress indicators and visual feedback
* Responsive layout with session state management

---

## Usage

1. Select one or more agents using the checkboxes
2. Enter a prompt describing the coding task
3. Submit via **Enter** or the action button
4. Review results:

   * Switch agents from the sidebar
   * Use tabs to view **Output**, **Files**, or **Logs**
   * Click files to inspect diffs

---

## Project Scope

This project focuses on **frontend architecture, UX, and interaction design** for AI coding agents. It intentionally avoids backend complexity to keep the evaluation centered on:

* Component structure
* State management
* Streaming & async UI handling
* Developer‑focused UX patterns

---

## Tech Stack

* **Next.js**
* **TypeScript**
* **Bun**
* **Tailwind CSS** (UI styling)

---

## Disclaimer

This is a **take‑home assessment project** built for evaluation purposes. Agent responses, tools, and file changes are simulated.
