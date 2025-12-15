# 🧪 Testing Guide - Southbridge Agent Console

## Quick Test Checklist

### ✅ Basic Functionality

1. **App Loads**
   - [ ] Navigate to http://localhost:3000
   - [ ] Status bar shows "AGENT.CONTROL | SYSTEM.ONLINE"
   - [ ] Green pulse indicator is visible
   - [ ] Model name displays in status bar

2. **Settings Modal**
   - [ ] Click "SETTINGS" in top-right
   - [ ] Modal opens with blur backdrop
   - [ ] All fields are populated with default values
   - [ ] Connection status shows green "SOUTHBRIDGE_RELAY_V1"
   - [ ] Click CANCEL - modal closes without changes
   
3. **Settings Functionality**
   - [ ] Open Settings again
   - [ ] Change Model to "GPT-4 Turbo"
   - [ ] Change Temperature to "0.9"
   - [ ] Change Stream Speed to "50"
   - [ ] Click SAVE
   - [ ] Status bar now shows "GPT-4-TURBO"
   - [ ] Modal closes

### ✅ Agent Execution

4. **Single Agent Test**
   - [ ] Ensure only "CLAUDE.CODE" is checked
   - [ ] Enter prompt: "Refactor authentication to use JWT tokens"
   - [ ] Press Enter or click submit button
   - [ ] Agent status changes: IDLE → THINKING → STREAMING
   - [ ] Output appears word-by-word
   - [ ] Progress bar fills up
   - [ ] Status badge animates (pulse effect)

5. **Multi-Agent Test**
   - [ ] Check all three agents: Claude Code, Gemini CLI, Codex
   - [ ] Enter prompt: "Add error handling to API routes"
   - [ ] Submit
   - [ ] All three agents start simultaneously
   - [ ] Each has independent progress bars
   - [ ] Click different agents in sidebar
   - [ ] Each shows different output

### ✅ Output Viewing

6. **OUTPUT Tab**
   - [ ] Streaming text appears
   - [ ] Cursor animation shows at end while streaming
   - [ ] Text is readable and formatted
   - [ ] Prompt is shown at top with ">" prefix

7. **FILES Tab**
   - [ ] Wait for files to appear (random during simulation)
   - [ ] Click FILES tab
   - [ ] File list shows (e.g., "src/auth/config.ts")
   - [ ] Click on a file
   - [ ] Diff viewer shows side-by-side comparison
   - [ ] Red side shows "ORIGINAL"
   - [ ] Green side shows "MODIFIED"
   - [ ] Line numbers are visible
   - [ ] Click back arrow to return to file list

8. **LOGS Tab**
   - [ ] Click LOGS tab
   - [ ] Logs appear in different colors:
     - Blue: [SYSTEM]
     - Purple: [TOOL]
     - Green: [THOUGHT]
     - Yellow: [FILE]
     - Cyan: [CONFIG]
     - Pink: [AGENT]
     - Orange: [METRICS]
   - [ ] Logs show configuration info
   - [ ] Logs show tool invocations
   - [ ] Final metrics appear at end

### ✅ Settings Impact

9. **Temperature Test**
   - [ ] Open Settings, set Temperature to 0.3
   - [ ] Save and run a prompt
   - [ ] Note: Fewer logs, slower progress
   - [ ] Open Settings, set Temperature to 0.9
   - [ ] Save and run same prompt
   - [ ] Note: More logs, more tool calls, faster progress

10. **Stream Speed Test**
    - [ ] Open Settings, set Stream Speed to 300
    - [ ] Save and run a prompt
    - [ ] Note: Slow, deliberate streaming
    - [ ] Open Settings, set Stream Speed to 50
    - [ ] Save and run same prompt
    - [ ] Note: Very fast streaming

### ✅ UI/UX

11. **Status Bar**
    - [ ] Time updates every second
    - [ ] CPU percentage changes
    - [ ] Memory value fluctuates
    - [ ] Model name matches Settings

12. **Sidebar**
    - [ ] Click different agents
    - [ ] Active agent has left border highlight
    - [ ] Active agent has lighter background
    - [ ] Hover effects work on all agents
    - [ ] Progress bars update independently

13. **Responsive Behavior**
    - [ ] Resize window
    - [ ] Layout adjusts appropriately
    - [ ] No horizontal scrolling
    - [ ] All content remains accessible

### ✅ Edge Cases

14. **Empty States**
    - [ ] Before running any prompt, FILES tab shows "NO FILES MODIFIED"
    - [ ] Before running any prompt, LOGS tab shows "NO LOGS AVAILABLE"
    - [ ] Uncheck all agents - submit button still works (nothing happens)

15. **Multiple Submissions**
    - [ ] Run a prompt
    - [ ] While streaming, submit another prompt
    - [ ] Previous output is cleared
    - [ ] New output starts fresh
    - [ ] Progress resets to 0

16. **Agent Switching During Execution**
    - [ ] Start a prompt with Claude Code
    - [ ] While streaming, click Gemini CLI in sidebar
    - [ ] Gemini CLI shows its own state
    - [ ] Click back to Claude Code
    - [ ] Claude Code still streaming

---

## 🎯 Expected Behavior Summary

### Settings → Simulation Mapping

| Setting | Default | Effect on Simulation |
|---------|---------|---------------------|
| Model | claude-3-opus | Displayed in status bar, logged in LOGS |
| Max Tokens | 4000 | Shown in final [METRICS] log |
| Temperature | 0.7 | Controls tool call frequency and log verbosity |
| Stream Speed | 150ms | Delay between output chunks |
| Working Dir | ./src | Shown in [CONFIG] logs |

### Temperature Effects

- **0.1 - 0.3**: Conservative, fewer tool calls, less verbose
- **0.4 - 0.6**: Balanced behavior
- **0.7 - 0.9**: Aggressive, many tool calls, very verbose
- **1.0**: Maximum randomness

### Stream Speed Effects

- **50ms**: Very fast, almost instant
- **150ms**: Default, good balance
- **300ms**: Slow, deliberate
- **500ms+**: Very slow, "typing" effect

---

## 🐛 Known "Features" (Not Bugs!)

1. **Random Output**: The simulation generates semi-random output - this is intentional
2. **Tool Calls Vary**: Number and timing of tool calls is randomized
3. **File Diffs**: Only 2 mock files are available (auth/config.ts, api/routes.ts)
4. **No Real Execution**: This is a simulation - no actual code is run
5. **Metrics Are Estimates**: Token counts and timing are approximations

---

## 🚀 Quick Test Scenarios

### Scenario 1: "Show Me Everything"
```
1. Open Settings
2. Set Temperature to 0.9
3. Set Stream Speed to 100
4. Save
5. Check all three agents
6. Submit: "Implement user authentication system"
7. Watch all three agents work
8. Switch between agents
9. Check FILES and LOGS tabs
```

### Scenario 2: "Slow and Steady"
```
1. Open Settings
2. Set Temperature to 0.3
3. Set Stream Speed to 300
4. Save
5. Check only Claude Code
6. Submit: "Add input validation"
7. Watch slow, deliberate output
8. Check LOGS for minimal entries
```

### Scenario 3: "Settings Impact"
```
1. Run with default settings, note behavior
2. Change only Temperature to 0.9
3. Run same prompt, compare logs
4. Change only Stream Speed to 50
5. Run same prompt, compare speed
```

---

## ✨ Success Criteria

The app is working correctly if:

1. ✅ Settings modal opens and closes
2. ✅ Settings changes persist after save
3. ✅ Status bar shows current model
4. ✅ Agents stream output when prompted
5. ✅ Multiple agents can run in parallel
6. ✅ LOGS tab shows color-coded entries
7. ✅ FILES tab shows diffs when available
8. ✅ Temperature affects simulation behavior
9. ✅ Stream speed affects output speed
10. ✅ No console errors

---

## 🎉 You're Done!

If all tests pass, the application is **fully functional** and ready for demo!

**Pro Tip**: Try extreme values (Temperature 0.1 vs 0.9, Speed 50 vs 500) to really see the Settings impact!
