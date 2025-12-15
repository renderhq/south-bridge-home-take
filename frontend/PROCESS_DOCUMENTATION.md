# Process Documentation

## 1. Prompts & Workflow

This project was built using an iterative, prompt-driven development approach. Below are the key prompts and directives that shaped the final application:

### Key Prompts

**Phase 1: God-Tier UI & Core Architecture**
> "Implement a 'God-tier' upgrade to the multi-agent simulation UI. Enhance mock-api.ts for realistic streaming. Rewrite AgentPanel.tsx, FileDiffViewer.tsx, and StreamingConsole.tsx to be production-ready with animations and dynamic status updates."

**Phase 2: Refinement & Polish**
> "Finalize UI functionality: Make status bar dynamic, center and clean prompt input, refine tab badges, ensure clickable file lists."

**Phase 3: Specific UX Adjustments**
> "TOKENS AND TIME AND TOOLS SHOULD BE NAMED INSTEAD OF SYMBOLS"  
> *Reasoning: Clear labeling is critical for complex dashboards.*

**Phase 4: Deployment & Fixes**
> "404: NOT_FOUND... fix and give vercel.json"  
> *Action: Detected Vercel build root issue and created vercel.json configuration.*

---

## 2. AI Assistance & Implementation

**Role of AI (Agentic Coding):**
The AI acted as a pair programmer, handling the heavy lifting of boilerplate code and complex UI logic while following high-level architectural directives.

**Specific Contributions:**
- **Mock API Generation**: Created a robust `mock-api.ts` that simulates streaming text, file system operations, and variable latency without needing a real backend.
- **Component Architecture**: Structured the `AgentPanel` to handle multiple parallel agent states (Output, Files, Logs) cleanly using React state.
- **Visual Polish**: Generated Tailwind CSS classes for the "industrial dark mode" aesthetic, including glassmorphism effects and custom scrollbars.
- **Bug Fixing**: Identified and fixed the `duplicate key` error in the file viewer by making list keys unique (`${index}-${path}`).

---

## 3. Problems Encountered & Solutions

### Issue 1: Duplicate Key Error in Diff Viewer
**Problem:** The `FileDiffViewer` crashed with a "duplicate key" React error when multiple agents or steps modified the same file path.
**Solution:** Updated the mapping function to use a composite key (`index + file.path`) to ensure uniqueness across the render cycle.
**Diff:**
```typescript
// Before
key={diff.path}

// After
key={`${index}-${diff.path}`}
```

### Issue 2: Vercel 404 on Deployment
**Problem:** Deploying the monorepo structure resulted in a 404 because Vercel treated the root directory as the build target, but the Next.js app lives in `/frontend`.
**Solution:** Created a `vercel.json` file to explicitly point the build process to the frontend directory.
```json
{
  "builds": [{ "src": "frontend/package.json", "use": "@vercel/next" }],
  "routes": [{ "src": "/(.*)", "dest": "/frontend/$1" }]
}
```

### Issue 3: Local Port Conflicts
**Problem:** Frequent `EADDRINUSE: 3000` errors because multiple instances of `bun dev` were running.
**Resolution:** Manually killed zombie processes or allowed Next.js to auto-assign port 3001.

---

## 4. Design Decisions & Reasoning

### "God-Tier" Aesthetic (Industrial Dark Mode)
**Reasoning:** Developer tools should feel precise and durable. We chose a palette of deep grays, subtle borders, and monospace fonts (JetBrains Mono/Geist) to reduce eye strain and emphasize code content.
**Tech:** Tailwind CSS v4 for rapid styling, `lucide-react` for consistent iconography.

### Split-Pane Layout
**Reasoning:** Context switching kills productivity. The layout puts the Agent's "Thought Process" (Logs) and "Work Product" (Diffs) side-by-side or easily toggleable, allowing the user to trust *and* verify the agent's actions simultaneously.

### Mock API Approach
**Reasoning:** To ensure the UI is purely deterministic and testable without burning expensive API credits during development. The `mock-api.ts` allows us to simulate edge cases (network delays, long streaming responses) that are hard to reproduce with real LLMs.

---

## 5. Limitations

1.  **Mock Agents Only**: The current application simulates agent behavior. It does not connect to real Claude/OpenAI endpoints. All "responses" are pre-scripted or algorithmically generated string streams.
2.  **In-Memory File System**: File changes shown in the UI are ephemeral and stored in the localized mock state. They do not persist to the actual server disk or git history.
3.  **Single Session**: While the UI supports "Session Persistence" in theory, the current mock implementation resets state on page refresh (unless localStorage persistence is fully enabled/refined).

---

*This document was manually compiled to reflect the actual development process.*
