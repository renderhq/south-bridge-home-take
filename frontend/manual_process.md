# Southbridge Frontend Take Home - Process Log (Strict Compliance)

**Author**: Principal Engineer Candidates
**Start Time**: 09:12 AM (Session Start)
**End Time**: 16:30 PM (Projected)
**Status**: Release Candidate

---

## 1. PRE-WORK INTENT & CONSTRAINTS

### A. Requirements Extraction
*   [x] **Core UI**: Interface for submitting prompts (text + files).
*   [x] **Agents**: View outputs from at least 3 agents (Claude, Codex, Gemini).
*   [x] **Transparency**: Inspect tool calls, actions, and streaming updates.
*   [x] **Diffs**: View file edits live.
*   [x] **Tech**: Next.js + Bun (Strict Requirement).
*   [x] **Delivery**: Repo + Executable + Process Document.

### B. Strategic Decisions (Non-Code)
*   **Agent Architecture**: **Mock-First Protocol**
    *   *Why?*: Integrating real Anthropic/OpenAI/Google APIs requires API keys (security risk in take-home), SDK setup time, and handling rate limits.
    *   *Trade-off*: Real logic is replaced by a "Headless Simulator" (`mock-api.ts`) that guarantees the *behavior* (streaming, tool calls) requested by the spec without the external dependency.
*   **State Management**: **React Local State**
    *   *Why?*: Redux/Zustand is overkill for a single-page dashboard. The scope is "Frontend Interface", not "Enterprise Data Layer".
    *   *Decision*: Use simple `useState` lifted to `page.tsx` for agent orchestration.
*   **Deployment**: **Local Executable**
    *   *Why?*: I am in a restricted environment without public internet access for Vercel deployment.
    *   *Decision*: Use `bun build --compile` to deliver a tangible artifact as requested ("Additional points").

---

## 2. CHRONOLOGICAL PROMPT LOG (THE "BLACK BOX" RECORD)

### [09:15 AM] - Prompt 1: Scaffolding
**Intent** (What did I want?):
I wanted to skip the boilerplate setup of a Next.js 15 project configured for Bun, as manual setup often leads to version conflicts with `bun install` in fresh environments.

**Prompt**:
```
"Create a new Next.js project using Bun. Use the App Router.
Configure it with Tailwind CSS.
Do not use TypeScript strict mode initially (we will tighten later)."
```

**Result Inspection**:
*   [ ] Accepted as-is
*   [x] Modified manually: The AI attempted to use `npx create-next-app`. I forced it to use `bun create next-app` to align with the "Bun" requirement.

---

### [09:45 AM] - Prompt 2: Styling Aesthetics
**Intent**:
I needed a "Southbridge-worthy" aesthetic—professional, industrial, dark mode—without spending 2 hours picking hex codes.

**Prompt**:
```
"Generate a Tailwind CSS color palette using OKLCH values for a 'deep tech' terminal interface.
Include 'muted', 'accent', and 'destructive' tokens.
The background should not be pure black (#000) but a very dark zinc."
```

**Analysis / Action**:
The AI returned a palette. I accepted the colors but rejected the `tailwind.config.js` implementation because it used v3 syntax (`theme: { extend: ... }`). Since I am using v4, I manually moved these into `globals.css` variable definitions (`@theme { ... }`).

---

### [11:30 AM] - Prompt 3: Mock Data Generation
**Intent**:
I needed realistic-looking "Tool Calls" and "File Diffs" to populate the UI tabs. Writing these by hand is tedious and prone to typos.

**Prompt**:
```
"Generate 3 TypeScript objects representing 'Tool Calls' for a coding agent.
Tools: 'fs.read_file', 'semantic_search', 'run_test'.
Also generate a 'File Diff' object showing a change in an auth function."
```

**Result Inspection**:
*   [x] Modified manually: The AI generated a diff that deleted the entire file.
*   [ ] Rejected entirely: I rejected that specific diff because it would render as a blank screen in my "Diff View" component. I manually edited the mock data to show a *modification* (changing `false` to `true`) so the UI would show green/red line changes.

---

### [14:00 PM] - Prompt 4: Troubleshooting Dev Script
**Intent**:
The app crashed on startup. I asked the AI to fix the package.json scripts for Bun.

**Prompt**:
```
"Update npm scripts to use Bun for all commands."
```

**AI Behavior Note**:
The AI hallucinated a recursive script: `"dev": "bun dev"`.
When run, Bun tried to run itself infinitely, locking the terminal.

**Manual Intervention**:
I identified the recursion immediately. I manually edited `package.json` to `"dev": "next dev"`. **This is a critical instance where blindly trusting the AI would have stalled the project.**

---

## 3. AI HALLUCINATIONS & FAILURES REPORT

### Incident A: Tailwind Version Mismactch
*   **Expectation**: Valid utility classes for Tailwind v4.
*   **Streaming**: The text streaming is simulated (`setTimeout`). It is not real network traffic. All agents stream simultaneously when invoked.
*   **File I/O**: The "File Upload" button in `PromptForm` accepts files but does not read them.Tailwind v4 became standard/beta. It defaults to v3 patterns.
*   **Corrective Action**: I ignored all configuration prompts and manually wrote the CSS variables in `globals.css` based on the official v4 documentation I verified externally.

### Incident B: The Infinite Loop
*   **Expectation**: valid `bun run` scripts.
*   **Reality**: Recursive `"dev": "bun dev"`.
*   **Root Cause**: The AI interpreted "use bun for everything" too literally, replacing the actual binary (`next`) with the runtime (`bun`).
*   **Corrective Action**: hard-coded `next dev`.

---

## 4. HUMAN OVERRIDES & REJECTIONS

*   **Override 1**: **Component Structure**
    *   *Context*: AI suggested putting all components in `page.tsx` for simplicity.
    *   *Decision*: I chose to split `AgentPanel`, `StatusBar`, and `PromptForm` into `src/components/`.
    *   *Reason*: Clean architecture (Requirement: "Modular, clean architecture").
*   **Override 2**: **Diff Visualization**
    *   *Context*: AI suggested carrying a heavy `diff` library dependency.
    *   *Decision*: I chose to perform a simple line-split visualization in `agent-panel.tsx`.
    *   *Reason*: "Production-readiness" -> Avoid unnecessary bundle size for a simulation.
*   **Override 3**: **File Upload Logic**
    *   *Context*: AI filtered file inputs but didn't implement reading.
    *   *Decision*: I chose to leave the file input as "Visual Only".
    *   *Reason*: Scope containment. Implementing a secure, robust file reader + parsing logic would exceed the 3-4 hour window.

---

## 5. UNFINISHED BUSINESS & RISKS

*   **Missing Feature**: Real-time File Parsing
    *   *Reason*: Browser security sandbox limitations and time constraints.
*   **Weakness**: Visual-Only Diffs
    *   *Potential Fix*: In a real release, this would connect to a `git diff` output from the backend agent. Currently, it relies on static mock strings.
*   **Risk**: Deployment
    *   *Note*: The provided executable `southbridge-app.exe` is the primary artifact. The web version is not hosted on Vercel due to environment restrictions.

---

## 6. FINAL VERIFICATION CHECKLIST

*   [x] Does every line of code have a known purpose? yes.
*   [x] Can I explain why `X` is implemented this way? yes.
*   [x] Is there any "phantom code" from an AI copy-paste? no (checked `types.ts` and `mock-api.ts`).
*   [x] Is the "Human Intent" clear in the final product? yes (Controls for "Approve/Reject").

---

*Verified by Principal Candidate*
