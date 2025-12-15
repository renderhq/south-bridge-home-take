# Manual Process Document - Southbridge Frontend Take Home

## 1. Project Overview
This project implements the "Frontend Take Home Level 2" specification for Southbridge, a high-fidelity interface for multi-agent coding workflows. It is built with Next.js and Bun, featuring a strict, industrial-style UI.

## 2. Engineering Decisions & Architecture

### Stack & Infrastructure
- **Next.js (App Router)**: Chosen for server-side rendering capability, robust routing for future multi-page needs, and deep ecosystem support.
- **Bun**: Used strictly as the runtime and package manager (`bun install`, `bun dev`). This aligns with the "speed" requirement.
- **Tailwind CSS v4**: Adopted for the styling engine. While technically in beta/alpha states during some recent development cycles, its performance and zero-config nature align with "production-ready" forward-thinking.
- **Lucide React**: Chosen for iconography to maintain a clean, consistent, low-weight visual language.

### UI/UX Philosophy: "Industrial Professional"
The design mandate "no cringe" and "senior principle engineer" led to a brutally functional aesthetic:
- **Palette**: Deep slate/zinc backgrounds, avoiding pure blacks to reduce eye strain, with high-contrast accent colors (OKLCH color space used for vibrancy).
- **Density**: High information density. The `AgentPanel` is designed to show logs, diffs, and tool calls simultaneously in a tabbed interface rather than hiding information behind deep navigation.
- **Feedback**: Every action has a reaction. "Streaming" states are visualized with pulsing indicators; progress bars show granular movement; tool calls have explicit success/fail markers.

### Mocking Strategy (Headless Protocol Simulation)
Authentication and connection to real `claude-code`, `gemini-cli`, or `codex` APIS were out of scope for a strictly frontend task without backend keys.
- **`src/lib/mock-api.ts`**: Acts as the "Headless Server".
- **Streaming Emulation**: A custom `streamResponse` function emits text chunks with random jitter delays to mimic the non-deterministic latency of LLM tokens.
- **Data Structures**: `ToolCall` and `FileDiff` types were defined to rigorously structure the mock data, ensuring the frontend code is type-safe and ready for real API integration (just swap the mock for a `fetch` call).

## 3. Prompt Logs
The following prompts were used during the development session to generate assets, debug, or clarify requirements. These are summarized from the interaction logs:

1.  **"Create a high-fidelity Next.js app with Bun..."**: Initial scaffolding.
2.  **"Generate a dark-mode theme variable set using OKLCH colors..."**: Generated the CSS variables in `globals.css` to ensure accessible and vibrant contrast ratios.
3.  **"Scaffold a sidebar layout with progress bars..."**: generated the initial skeleton for `AgentPanel`.
4.  **"Refactor AgentPanel to support Tabs for Tools and Diffs..."**: Used to upgrade the component from a simple text dump to the complex interactive view required by recent specs.
5.  **"Implement exact Southbridge specs..."**: Used to verify the final checklist (Next.js, Bun, Agents, Diffs, Tools).

## 4. AI Assistance & Hallucinations

### Interaction Log
- **Setup**: AI (Antigravity/Gemini) was used to generate the initial `create-next-app` command and the `globals.css` variable definitions.
- **Refactoring**: AI assisted in moving components to the `src/components` directory and updating imports to clean up the project structure.
- **Mock Data**: AI generated the dummy "JWT Auth" code snippets used in the simulated diffs.

### Hallucinations / Issues Encountered & Resolved
- **Tailwind Config Versioning**: The AI initially attempted to configure Tailwind v3 (`tailwind.config.js`) while the project template used Tailwind v4 logic (`@import "tailwindcss"`). This caused styles to break.
    - *Resolution*: I manually overwrote `globals.css` with the correct CSS variables and directives to enforce the theme.
- **Import Aliases**: The AI assumed `@/components` would work out of the box.
    - *Resolution*: Verified `tsconfig.json` to ensure the `paths` configuration matched the folder structure.
- **Looping Content**: At one point, the AI got stuck generating the same file content repeatedly.
    - *Resolution*: I intervened to force specific, smaller file edits (splitting `types.ts` from `mock-api.ts`) to break the context loop.

## 5. Known Limitations
- **Visual-Only Diffs**: The "Live Diff" feature visualizes a pre-set diff string. It does not actually run a `diff` algorithm on user input, as that would require a heavier client-side library or a real backend.
- **File Uploads**: The multi-modal input accepts files, but they are not processed in this demo version.
- **State Persistence**: Reloading the page resets the agent states to the mock defaults.

## 6. Verification of Intent
Every component in `src/components` exists to serve a specific user need defined in the spec:
- `status-bar.tsx`: Provides system health context, reinforcing the "Headless Server" metaphor.
- `agent-panel.tsx`: The primary workspace. Tabs for "OUTPUT" (text), "DIFFS" (code changes), and "TOOL CALLS" (audit trail) were implemented specifically to meet the "inspect tool calls" and "view file diffs" requirements.
- `prompt-form.tsx`: The input mechanism for explicit human intent.
