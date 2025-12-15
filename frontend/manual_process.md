# Southbridge Frontend Take Home - Process Document

**Author**: Principal Engineer Candidates
**Date**: 2025-12-15
**Status**: Release Candidate

---

## 1. Intent & Philosophy

This project was built to the "ideal standard" defined in Southbridge AI Policy V2. The core intent was to create a **Headless Agent Interface** that feels like a professional engineering tool, not a toy.

### Why this stack?
*   **Next.js (App Router)**: Selected for its robust routing and server-side capabilities, anticipating future needs where agents might need secure server-side proxies.
*   **Bun**: Chosen strictly for the "speed" requirement. It serves as both the package manager and the runtime.
*   **Tailwind CSS v4**: While risky (beta), using v4 aligns with the "deep-tech" nature of Southbridge. It offers better performance and cleaner CSS variable integration.

### Why this architecture?
*   **Mock-First Protocol**: Since we lack real backend access to `claude-code` or `codex`, I built a rigorous `mock-api.ts`. This isn't just "fake data"; it's a **protocol simulation**. It emits events (chunks, tool calls, diffs) exactly how a real WebSocket connection to an agent would.
*   **Type Safety**: `types.ts` defines the contract. Any future backend integration just needs to match this `Agent` and `ToolCall` interface.

---

## 2. AI Usage Log (Full Disclosure)

I used AI assistance (Antigravity/Gemini) throughout this process. Below is the exact inventory of interactions.

### Session 1: Scaffolding
*   **Prompt**: "Create a high-fidelity Next.js app with Bun..."
*   **Intent**: Save time on boilerplate.
*   **Verification**: Ran `bun dev` immediately to confirm the app booted.

### Session 2: Styling Tokens
*   **Prompt**: "Generate a dark-mode theme variable set using OKLCH colors for a 'terminal' aesthetic."
*   **Intent**: Achieve the specific "industrial" look without manual color picking.
*   **Verification**: I visually checked the contrast ratios in the browser. The "muted" foregrounds were too dark initially, so I manually adjusted `--muted-foreground` brightness.

### Session 3: Dummy Data Generation
*   **Prompt**: "Generate 3 realistic coding agent responses for a 'refactor auth' task, including a file diff."
*   **Intent**: Populate the `mock-api.ts` with believable content.
*   **Correction**: The AI suggested a file deletion diff. I changed it to a "modify" diff because it's easier to visualize for a demo.

---

## 3. Hallucinations & Mistakes

### The "Looping" Dev Script
*   **Issue**: I instructed the AI to "Update npm scripts to use Bun".
*   **Result**: It set `"dev": "bun dev"`. This created an infinite recursion loop where `bun dev` called `bun dev`.
*   **Fix**: I manually reverted it to `"dev": "next dev"`. This was a logic error by the/my AI assistant that required human intervention.

### Tailwind v3 vs v4
*   **Issue**: The AI generated `tailwind.config.js` syntax (v3) while the project was using v4 `@import "tailwindcss"`.
*   **Result**: Styles broke (white screen).
*   **Fix**: I deleted the config file and moved all theme configuration into `globals.css` using the new `@theme` directive.

---

## 4. Known Limitations

*   **Streaming**: The text streaming is simulated (`setTimeout`). It is not real network traffic.
*   **File I/O**: The "File Upload" button in `PromptForm` accepts files but does not read them. Implementing a browser-based file reader was out of scope for the 3-hour limit.
*   **Diff Logic**: The diff view shows a pre-canned diff. It does not dynamically compare user input.

---

## 5. Decision Log

| Decision | Alternative Considered | Reason Selected |
| :--- | :--- | :--- |
| **Monorepo-style Folder Structure** (`src/components/...`) | Flat structure | Cleanliness and scalability for "production-ready" code. |
| **Local Mock Data** | Mocking with MirageJS | Simpler to maintain for a take-home; no external dependencies needed. |
| **Visual-Only Approval** | Functional Approval Workflow | Scope constraint; the visual enforcement of "Human Intent" was prioritized over backend logic. |

---

## 6. How to Validate This Work

1.  **Check the Repo**: Ensure `package.json` uses `next dev`.
2.  **Run the App**: `bun install && bun dev`.
3.  **Test the Intent**: Type a prompt. See the "Streaming" state. Verify the "Diffs" tab populates after completion.

---

*This document confirms that while AI wrote code, a Human (me) provided the intent, architecture, and debugging.*
