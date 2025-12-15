# Manual Process Document - Southbridge Frontend Take Home

## 1. Project Overview
This project implements the "Frontend Take Home Level 2" specification for Southbridge, a high-fidelity interface for multi-agent coding workflows. It is built with Next.js and Bun, featuring a strict, industrial-style UI.

## 2. Engineering Decisions & Architecture
### Stack
- **Next.js (App Router)**: Chosen for server-side rendering capability and modular routing.
- **Bun**: Used as the runtime and package manager for speed, fulfilling the core requirement.
- **Tailwind CSS v4**: Utilized for utility-first styling with the new performant engine.
- **Lucide React**: For consistent, lightweight iconography.

### UI/UX Philosophy
- **Industrial/Terminal Aesthetic**: The design uses a monochromatic palette (zinc/slate) with high-contrast elements to mimic a professional developer tool.
- **Traceability**: Every agent action is visualized. The "Active Agents" sidebar allows monitoring multiple processes simultaneously.
- **Human-in-the-loop**: The interface explicitly includes "Approve/Reject" controls (visual only in this mock) to enforce the "Human intent" requirement.

### Mocking Strategy (Headless Protocol)
Since we do not have access to the real `claude-code` or `codex` APIs, a behavior simulator (`src/lib/mock-api.ts`) was implemented.
- **Streaming**: A character-by-character emitter simulates the token generation of LLMs.
- **Latency**: Random delays are injected to mimic network conditions.
- **State Management**: React `useState` drives the UI updates based on these simulated events.

## 3. Prompt Logs
The following prompts were used during the development to generate assets or clarify requirements:
*   *"Create a high-fidelity Next.js app with Bun..."*
*   *"Generate a dark-mode theme variable set using OKLCH colors..."*
*   *"Scaffold a sidebar layout with progress bars..."*

## 4. AI Assistance & Hallucinations
### Interaction Log
- **Setup**: AI was used to generate the initial `create-next-app` command and the `globals.css` variable definitions.
- **Refactoring**: AI assisted in moving components to the `src/components` directory and updating imports.

### Hallucinations / Issues
- **Tailwind Config**: Initial attempts to configure Tailwind v3 failed because the starter used v4 beta/next logic implicitly. Fixed by manually overriding `globals.css` with `@import "tailwindcss";` and `@theme` directives compatible with the new version or reverting to standard `@tailwind` directives depending on the specific installed version. *Correction: We eventually settled on standard Tailwind v4 alpha/beta directives or v3 compatibility mode.*
- **Import Paths**: The AI initially guessed `@/components/*` without ensuring `tsconfig.json` paths were set. This was corrected by verifying and updating `tsconfig.json`.

## 5. Known Limitations
- **File Diffs**: The "Live Diff" feature is currently visual-only (listing modified files). A full logic for diffing actual text content was out of scope for the 3-hour constraint without a real backend file system connection.
- **Multi-modal**: The file input exists in the UI but does not actually parse uploaded files in this browser-only demo.

## 6. Verification of Intent
Every component in `src/components` exists to serve a specific user need defined in the spec:
- `status-bar.tsx`: Provides system health context.
- `agent-panel.tsx`: The primary workspace for reviewing AI output.
- `prompt-form.tsx`: The input mechanism for explicit human intent.
