# 🚀 Quick Start Guide - Southbridge Multi-Agent Interface

**Get up and running in 2 minutes!**

---

## ⚡ **Instant Setup**

```bash
cd frontend
bun install
bun dev
```

**Open:** http://localhost:3000

**That's it!** 🎉

---

## 🎮 **Try It Now (30 Second Test)**

### 1. **Submit a Prompt** (5 seconds)
```
Type: "Implement JWT authentication"
Press: Enter
```

### 2. **Watch the Magic** (10 seconds)
- ✅ Smooth streaming output
- ✅ 5-10 files appear in FILES tab
- ✅ Progress bar fills up
- ✅ Color-coded logs in LOGS tab

### 3. **Test Settings** (5 seconds)
```
Click: SETTINGS (top-right)
Change: Temperature to 0.9
Change: Stream Speed to 100
Click: SAVE
```

### 4. **Test Buttons** (10 seconds)
```
Wait for completion
Click: ✓ APPROVE → See green toast + new logs
Click: ✗ REJECT → FILES tab clears!
Click: 🔧 MODIFY → Edit mode activates
Click: EXPORT_LOG → File downloads!
```

**Done!** You've tested everything in 30 seconds! ✅

---

## 📋 **Feature Checklist**

Try these features:

### Basic Features (1 minute)
- [ ] Submit a prompt
- [ ] Watch streaming output
- [ ] See files in FILES tab
- [ ] Click a file to view diff
- [ ] Check LOGS tab for color-coded entries

### Settings (1 minute)
- [ ] Open Settings
- [ ] Change temperature (try 0.3 vs 0.9)
- [ ] Change stream speed (try 50 vs 300)
- [ ] Save and see changes take effect

### Multi-Agent (1 minute)
- [ ] Check all 3 agents (Claude Code, Gemini CLI, Codex)
- [ ] Submit prompt
- [ ] Watch all 3 run in parallel
- [ ] Switch between agents in sidebar

### Actions (1 minute)
- [ ] Click APPROVE → See commit logs
- [ ] Click REJECT → See files clear
- [ ] Click MODIFY → See edit mode
- [ ] Click EXPORT_LOG → Download file

---

## 🎯 **Test Prompts**

### Quick Test (Simple)
```
Add input validation to user registration
```

### Medium Test (Realistic)
```
Implement JWT authentication with refresh tokens, bcrypt password hashing, and rate limiting
```

### Full Test (Complex)
```
Refactor the authentication system to use JWT tokens instead of sessions. Include:
1. JWT token generation and verification
2. Refresh token mechanism
3. Secure password hashing with bcrypt
4. Rate limiting middleware
5. Input validation with Zod
6. Comprehensive error handling
7. Unit tests for all auth functions
8. Docker configuration
9. CI/CD pipeline updates
```

---

## 🔥 **What You'll See**

### Streaming Output
```
> Implement JWT authentication

Analyzing codebase structure and dependencies...

Scanning for potential security vulnerabilities...

Identified entry point at src/index.ts with 47 imports.

Checking authentication middleware patterns across 12 routes...

Found legacy session storage implementation. Recommending JWT migration.

Refactoring auth utilities in src/lib/auth.ts...
```

### Files (5-10 per execution)
```
FILES (7)
├── src/auth/config.ts
├── src/middleware/auth.ts
├── src/api/routes/auth.ts
├── src/validators/user.schema.ts
├── src/utils/logger.ts
├── package.json
└── tests/auth.spec.ts
```

### Logs (Color-Coded)
```
[SYSTEM] Initializing agent claude-code...
[CONFIG] Model: claude-3-opus | Temp: 0.7
[AGENT] Starting thought process stream
[TOOL] Invoking fs.read_file({"path":"src/auth/config.ts"})
[FILE] Generated diff for src/middleware/auth.ts
[METRICS] Total tokens used: ~2400
[METRICS] Files modified: 7
```

---

## ⚙️ **Settings Guide**

### Temperature
- **0.1-0.3:** Conservative, fewer tool calls, less verbose
- **0.4-0.6:** Balanced behavior
- **0.7-0.9:** Aggressive, many tool calls, very verbose
- **1.0:** Maximum randomness

### Stream Speed
- **50ms:** Very fast, almost instant
- **100ms:** Fast, smooth
- **150ms:** Default, balanced
- **200ms:** Slower, deliberate
- **300ms+:** Very slow, "typing" effect

### Max Tokens
- **2000:** Quick tasks
- **4000:** Default, most tasks
- **8000:** Complex tasks
- **16000:** Very complex tasks

---

## 🎨 **UI Overview**

```
┌─────────────────────────────────────────────────────────┐
│ STATUS BAR: Time | CPU | Memory | Model | Settings     │
├──────────┬──────────────────────────────────────────────┤
│          │ AGENT PANEL                                  │
│ SIDEBAR  │ ┌──────────────────────────────────────────┐ │
│          │ │ OUTPUT | FILES | LOGS                    │ │
│ Claude   │ │                                          │ │
│ Gemini   │ │ [Streaming output or file diffs or logs] │ │
│ Codex    │ │                                          │ │
│          │ │                                          │ │
│          │ └──────────────────────────────────────────┘ │
│          │ [✓ APPROVE] [✗ REJECT] [🔧 MODIFY] [EXPORT] │
├──────────┴──────────────────────────────────────────────┤
│ PROMPT INPUT: Type your prompt here...                  │
│ [☑ Claude Code] [☑ Gemini CLI] [☐ Codex]               │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 **Troubleshooting**

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
bun install
bun dev
```

### Port 3000 already in use?
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Streaming looks broken?
- Check browser console for errors
- Refresh the page
- Clear browser cache

---

## 📚 **Documentation**

- **README.md** - Full setup and features
- **PROCESS_DOCUMENTATION.md** - Development process and AI assistance
- **EVERYTHING_WORKS.md** - Complete feature list
- **AGENT_PROMPTS.md** - Ready-to-use prompts
- **TESTING.md** - Comprehensive testing guide
- **FEATURES.md** - Feature breakdown
- **SUBMISSION_CHECKLIST.md** - Requirements checklist

---

## ✅ **Verification**

After setup, verify:

- [ ] App loads at http://localhost:3000
- [ ] Status bar shows time, CPU, memory
- [ ] 3 agents visible in sidebar
- [ ] Prompt input is ready
- [ ] Settings button works
- [ ] No console errors

---

## 🎯 **Next Steps**

1. **Test basic flow:** Submit prompt → Watch streaming → Check files
2. **Test settings:** Change temperature → See behavior change
3. **Test multi-agent:** Run all 3 agents → Compare outputs
4. **Test actions:** Approve → Reject → Modify → Export
5. **Read docs:** Check EVERYTHING_WORKS.md for full details

---

## 🚀 **You're Ready!**

The app is **fully functional** with:
- ✅ 25+ mock files
- ✅ 17 tool types
- ✅ Smooth streaming
- ✅ Functional buttons
- ✅ Toast notifications
- ✅ Color-coded logs
- ✅ Export functionality
- ✅ Multi-agent support

**Start coding!** 🎉

---

**Need Help?**
- Check PROCESS_DOCUMENTATION.md for detailed info
- Review EVERYTHING_WORKS.md for feature details
- See TESTING.md for test scenarios
- Read AGENT_PROMPTS.md for prompt examples

**Built with:** Next.js 15 + Bun + TypeScript + Tailwind CSS  
**Status:** Production Ready ✅
