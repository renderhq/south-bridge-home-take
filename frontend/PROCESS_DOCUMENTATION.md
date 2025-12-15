# Southbridge Frontend Take-Home - Process Documentation

**Candidate:** Jayad  
**Date:** December 15, 2025  
**Level:** Level 2 - Multi-Agent Interface Simulation  
**Runtime:** Bun 1.x  
**Framework:** Next.js 15 (App Router)  

---

## Executive Summary

This document details the complete development process for the Southbridge multi-agent coding interface simulation. The application successfully implements a realistic simulation of three AI coding agents (Claude Code, Gemini CLI, Codex) with full settings integration, streaming output, file diff visualization, tool call tracking, and interactive controls.

**Key Achievement:** Built a production-quality simulation that feels like a real AI agent system without requiring actual AI SDKs or API connections.

---

## 1. AI Assistance Used

### Primary AI Assistant: Google Gemini (Antigravity)

**Total Interaction Time:** ~2 hours  
**Number of Iterations:** 108+ steps  
**Approach:** Iterative development with continuous refinement

### AI Assistance Breakdown:

#### Phase 1: Initial Setup & Architecture (Steps 1-20)
- **Prompts Used:**
  - "Build a Next.js + Bun frontend application that simulates the Southbridge Frontend Take Home Level 2 app"
  - "Create multi-agent interface with Claude Code, Gemini CLI, and Codex"
  - "Add Settings modal with configuration options"

- **AI Contributions:**
  - Generated initial project structure
  - Created TypeScript interfaces for AgentState, ToolCall, FileDiff
  - Built mock API simulation engine
  - Implemented basic UI components

- **Problems Encountered:**
  - Initial streaming was too simple (just random text)
  - Settings modal was just UI, didn't affect simulation
  - Limited mock data (only 2 files)

#### Phase 2: Settings Integration (Steps 21-40)
- **Prompts Used:**
  - "Make Settings actually control simulation behavior"
  - "Add SimulationConfig interface"
  - "Pass config to simulateAgent function"
  - "Update status bar to show active model"

- **AI Contributions:**
  - Created SimulationConfig type
  - Modified simulateAgent to accept config parameter
  - Temperature now affects tool call frequency and verbosity
  - Stream speed controls output delay
  - Model name displays in status bar

- **Problems Encountered:**
  - TypeScript errors when passing config (fixed with proper typing)
  - Settings changes didn't persist (fixed with state management)
  - Status bar showed hardcoded model (fixed with prop passing)

#### Phase 3: Enhanced Mock Data (Steps 41-60)
- **Prompts Used:**
  - "Add lots of mock data - make files change dynamically"
  - "Expand from 2 files to 13+ files"
  - "Add more tool types (fs, ast, test, lint, db, git, npm)"
  - "Make simulation feel like real agent"

- **AI Contributions:**
  - Expanded MOCK_DIFFS from 2 to 13 files
  - Added 17 different tool types
  - Increased diff trigger frequency from 4% to 15%
  - Added realistic file changes (auth, middleware, validators, tests, Docker, CI/CD)

- **Problems Encountered:**
  - Not enough files appearing (fixed by increasing trigger frequency)
  - Files were backend-only (fixed by adding DevOps, database, config files)

#### Phase 4: Functional Buttons & Toasts (Steps 61-80)
- **Prompts Used:**
  - "Make Approve/Reject/Modify buttons actually work"
  - "Replace alert() popups with clean toast notifications"
  - "Buttons should update agent state, not just show messages"

- **AI Contributions:**
  - Created toast notification system with success/error/info types
  - Made APPROVE add commit logs and change status
  - Made REJECT clear all files and reset state
  - Made MODIFY enable interactive mode
  - Added onUpdateAgent callback for state changes

- **Problems Encountered:**
  - Alert popups were ugly (replaced with toast system)
  - Buttons didn't modify state (fixed with callback pattern)
  - Toast notifications needed proper TypeScript types (fixed)

#### Phase 5: Streaming Fix (Steps 81-100)
- **Prompts Used:**
  - "Fix streaming - it's showing broken words and repeated text"
  - "Make output smooth and dynamic, not random fragments"
  - "Stream complete sentences character by character"

- **AI Contributions:**
  - Replaced random word selection with character-by-character streaming
  - Streams 2-4 characters at a time for smooth flow
  - Completes full sentences before moving to next
  - Adds proper line breaks between thoughts

- **Problems Encountered:**
  - **Major Issue:** Streaming showed "Analyzing Analyzing dependencies... potential imports."
  - **Root Cause:** Random word selection from sentences
  - **Solution:** Character-by-character streaming of complete sentences
  - **Result:** Smooth, professional output

#### Phase 6: Final Polish (Steps 101-108)
- **Prompts Used:**
  - "Add even more mock data - 25+ files covering full stack"
  - "Ensure everything is dynamic and feels real"
  - "Create comprehensive documentation"

- **AI Contributions:**
  - Expanded to 25+ files (database, Docker, CI/CD, email service, health checks)
  - Added detailed metrics in logs
  - Created multiple documentation files
  - Ensured all features work together seamlessly

---

## 2. Problems Encountered with AI

### Problem 1: Over-Simplification
**Issue:** AI initially created very basic simulations  
**Example:** Only 2 mock files, 4 tool types, simple streaming  
**Solution:** Explicitly requested "lots of mock data" and "make it feel real"  
**Learning:** Need to be specific about scale and realism

### Problem 2: Broken Streaming Output
**Issue:** Streaming showed random word fragments: "Analyzing Analyzing dependencies..."  
**Root Cause:** AI used `Math.random()` to pick words from sentences  
**Solution:** Requested character-by-character streaming of complete sentences  
**Impact:** This was the biggest issue - made app look broken  
**Fix Time:** ~15 minutes to identify and resolve

### Problem 3: Non-Functional UI Elements
**Issue:** Buttons showed alerts instead of doing real actions  
**Solution:** Requested "buttons should actually work and update state"  
**Learning:** AI defaults to simple implementations unless asked for full functionality

### Problem 4: TypeScript Errors
**Issue:** Multiple lint errors when adding new features  
**Examples:**
  - Missing props in component interfaces
  - Type mismatches in callbacks
  - Undefined properties
**Solution:** AI fixed these proactively when pointed out  
**Learning:** AI is good at fixing TypeScript errors when they're highlighted

### Problem 5: Settings Not Connected
**Issue:** Settings modal was just UI, didn't affect simulation  
**Solution:** Requested "Settings should actually control simulation behavior"  
**Result:** Temperature, speed, tokens all now affect simulation  
**Learning:** Need to explicitly request functional integration

---

## 3. Development Process

### Iteration 1: Basic Structure (30 minutes)
- Created Next.js app with Bun
- Built AgentPanel, PromptForm, Settings components
- Implemented basic state management
- Added mock API with simple simulation

### Iteration 2: Settings Integration (20 minutes)
- Added SimulationConfig interface
- Connected Settings to simulation
- Made temperature affect behavior
- Added stream speed control

### Iteration 3: Data Expansion (25 minutes)
- Expanded from 2 to 13 files
- Added 17 tool types
- Increased diff frequency
- Added realistic code changes

### Iteration 4: Toast System (15 minutes)
- Created toast notification component
- Replaced alert() popups
- Added success/error/info types
- Implemented auto-dismiss

### Iteration 5: Functional Buttons (20 minutes)
- Made APPROVE add commit logs
- Made REJECT clear all changes
- Made MODIFY enable edit mode
- Added state update callbacks

### Iteration 6: Streaming Fix (10 minutes)
- Identified broken streaming issue
- Replaced random word selection
- Implemented character-by-character streaming
- Tested and verified smooth output

### Iteration 7: Final Expansion (15 minutes)
- Added 12 more files (25+ total)
- Covered full stack (backend, database, DevOps)
- Added Docker, CI/CD, email service
- Created comprehensive docs

**Total Development Time:** ~2 hours 15 minutes

---

## 4. Key Technical Decisions

### Decision 1: Character-by-Character Streaming
**Why:** Provides smooth, realistic output like real AI agents  
**Alternative Considered:** Word-by-word streaming  
**Chosen Because:** More control over flow, looks more professional

### Decision 2: Toast Notifications
**Why:** Modern UX pattern, non-intrusive  
**Alternative Considered:** Alert popups, inline messages  
**Chosen Because:** Clean, stackable, auto-dismiss, matches app aesthetic

### Decision 3: State Update Callbacks
**Why:** Allows child components to modify parent state  
**Alternative Considered:** Context API, Redux  
**Chosen Because:** Simple, direct, no overhead for this scale

### Decision 4: 25+ Mock Files
**Why:** Feels like real agent working on production codebase  
**Alternative Considered:** 5-10 files  
**Chosen Because:** More impressive, covers full stack, shows scale

### Decision 5: Configurable Simulation
**Why:** Settings actually affect behavior (temperature, speed, tokens)  
**Alternative Considered:** Static simulation  
**Chosen Because:** More realistic, demonstrates understanding of AI parameters

---

## 5. Features Implemented

### ✅ Core Requirements
- [x] Multi-agent interface (3 agents: Claude Code, Gemini CLI, Codex)
- [x] Settings modal with configuration
- [x] Settings affect simulation behavior
- [x] Streaming output
- [x] Tool call tracking
- [x] File diff visualization
- [x] Multi-modal input (text + file upload)
- [x] No real AI SDKs (100% simulated)

### ✅ Enhanced Features
- [x] Toast notification system
- [x] Functional Approve/Reject/Modify buttons
- [x] 25+ mock files covering full stack
- [x] 17 different tool types
- [x] Color-coded logs
- [x] Real-time progress tracking
- [x] Export logs to file
- [x] Parallel agent execution
- [x] Dynamic status bar
- [x] Smooth character-by-character streaming

---

## 6. Testing Performed

### Manual Testing
1. **Streaming Test:** Verified smooth output without broken words ✅
2. **Settings Test:** Changed temperature, speed, model - all affect simulation ✅
3. **Button Test:** APPROVE adds logs, REJECT clears files, MODIFY enables mode ✅
4. **Toast Test:** All three toast types appear and auto-dismiss ✅
5. **File Test:** 5-10 files appear per execution ✅
6. **Logs Test:** Color-coded entries appear in LOGS tab ✅
7. **Multi-Agent Test:** All three agents run in parallel ✅
8. **Export Test:** Log file downloads successfully ✅

### Edge Cases Tested
- Clicking buttons while streaming (disabled correctly) ✅
- Clicking buttons with no files (disabled correctly) ✅
- Multiple toast notifications (stack correctly) ✅
- Switching agents during execution (maintains separate state) ✅
- Changing settings mid-execution (applies to next run) ✅

---

## 7. AI Prompts Used (Chronological)

1. "Build Next.js + Bun app simulating Southbridge multi-agent interface"
2. "Add Settings modal with model, tokens, temperature, working directory"
3. "Make Settings actually control simulation behavior"
4. "Add more mock files - at least 10+ realistic files"
5. "Make Approve/Reject/Modify buttons actually work, not just alerts"
6. "Replace alert() with clean toast notifications"
7. "Fix streaming - it's showing broken words like 'Analyzing Analyzing dependencies...'"
8. "Add even more mock data - 25+ files covering full stack"
9. "Ensure everything is dynamic and feels like a real agent"
10. "Create comprehensive documentation"

---

## 8. Challenges & Solutions

### Challenge 1: Realistic Simulation
**Problem:** How to make simulation feel real without actual AI  
**Solution:** 
- 25+ mock files with realistic code
- Character-by-character streaming
- Dynamic tool calls and diffs
- Configurable behavior via Settings

### Challenge 2: Smooth Streaming
**Problem:** Output showed "Analyzing Analyzing dependencies... potential"  
**Solution:** 
- Changed from random word selection to character-by-character
- Stream 2-4 chars at a time
- Complete full sentences before moving to next

### Challenge 3: Functional Buttons
**Problem:** Buttons just showed alerts  
**Solution:**
- Added onUpdateAgent callback
- APPROVE adds commit logs
- REJECT clears files and diffs
- MODIFY enables edit mode
- All changes visible in LOGS tab

### Challenge 4: Settings Integration
**Problem:** Settings were just UI  
**Solution:**
- Created SimulationConfig interface
- Pass config to simulateAgent
- Temperature affects tool calls and logs
- Speed controls streaming delay
- Model shows in status bar

---

## 9. What Works Well

1. **Streaming:** Smooth, professional, character-by-character
2. **Buttons:** Fully functional with real state changes
3. **Toasts:** Clean, modern, auto-dismiss
4. **Mock Data:** 25+ files covering full stack
5. **Settings:** Actually control simulation behavior
6. **Logs:** Color-coded, detailed, exportable
7. **Multi-Agent:** All three agents work in parallel
8. **UI/UX:** Professional, responsive, polished

---

## 10. Future Enhancements (If This Were Real)

1. Connect to actual AI SDKs (Anthropic, OpenAI)
2. Implement real file system operations
3. Add session persistence (save/load)
4. WebSocket for true streaming
5. Agent collaboration features
6. Code execution sandbox
7. Git integration
8. Deploy to production

---

## 11. Conclusion

Successfully built a production-quality multi-agent coding interface simulation that:
- ✅ Meets all Southbridge Level 2 requirements
- ✅ Feels like a real AI agent system
- ✅ Has functional buttons and settings
- ✅ Shows 25+ realistic file changes
- ✅ Provides smooth streaming output
- ✅ Includes comprehensive documentation

**Total Development Time:** ~2 hours 15 minutes  
**AI Assistance:** Essential for rapid development  
**Key Learning:** Be specific about scale, realism, and functionality when working with AI

---

## Appendix: File Structure

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
│       ├── status-bar.tsx    # Top status bar
│       └── toast.tsx         # Toast notification system
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── mock-api.ts           # Agent simulation engine (25+ files, 17 tools)
```

---

**Document Prepared By:** Jayad  
**Date:** December 15, 2025  
**For:** Southbridge Frontend Take-Home Assessment
