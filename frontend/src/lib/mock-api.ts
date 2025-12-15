import { SimulationConfig, ToolCall, FileDiff } from "./types";

export interface SimulationCallbacks {
    onStatus: (status: "IDLE" | "THINKING" | "STREAMING" | "COMPLETED" | "ERROR") => void;
    onStream: (chunk: string) => void;
    onProgress: (value: number) => void;
    onToolCall: (tool: ToolCall) => void;
    onToolUpdate: (id: string, update: Partial<ToolCall>) => void;
    onDiff: (diff: FileDiff) => void;
    onLog: (message: string) => void;
    onComplete: () => void;
}

const MOCK_RESPONSES = [
    "Analyzing codebase structure and dependencies...",
    "Scanning for potential security vulnerabilities...",
    "Identified entry point at src/index.ts with 47 imports.",
    "Checking authentication middleware patterns across 12 routes...",
    "Found legacy session storage implementation. Recommending JWT migration.",
    "Refactoring auth utilities in src/lib/auth.ts...",
    "Updating API route handlers to use new 'requireAuth' wrapper.",
    "Implementing rate limiting middleware for /api/* endpoints.",
    "Adding input validation schemas using Zod...",
    "Optimizing database queries - found N+1 issue in user.getOrders().",
    "Running integration tests to verify security headers...",
    "Linting and formatting code with ESLint + Prettier...",
    "Optimization: reduced bundle size by 34% through tree-shaking.",
    "Adding comprehensive error handling to async operations...",
    "Implementing request logging with correlation IDs...",
    "Updating TypeScript types for better type safety...",
    "Adding unit tests for critical authentication flows...",
    "Configuring CORS policies for production deployment...",
    "Setting up environment variable validation...",
    "Finalizing changes and running pre-commit hooks..."
];

const MOCK_TOOLS = [
    { tool: "fs.read_file", args: { path: "src/auth/config.ts" } },
    { tool: "fs.read_file", args: { path: "src/middleware/auth.ts" } },
    { tool: "fs.read_file", args: { path: "package.json" } },
    { tool: "ast.parse", args: { target: "AuthMiddleware", file: "src/middleware/auth.ts" } },
    { tool: "ast.parse", args: { target: "UserController", file: "src/controllers/user.ts" } },
    { tool: "fs.write_file", args: { path: "src/auth/jwt.service.ts" } },
    { tool: "fs.write_file", args: { path: "src/middleware/rate-limit.ts" } },
    { tool: "fs.write_file", args: { path: "src/validators/user.schema.ts" } },
    { tool: "fs.write_file", args: { path: "src/utils/logger.ts" } },
    { tool: "test.run", args: { suite: "auth.spec.ts", coverage: true } },
    { tool: "test.run", args: { suite: "api.integration.spec.ts" } },
    { tool: "lint.check", args: { fix: true, files: "src/**/*.ts" } },
    { tool: "db.query_analyze", args: { query: "SELECT * FROM users" } },
    { tool: "bundle.analyze", args: { entry: "src/index.ts" } },
    { tool: "git.diff", args: { staged: true } },
    { tool: "npm.install", args: { package: "jsonwebtoken", dev: false } },
    { tool: "npm.install", args: { package: "@types/jsonwebtoken", dev: true } },
    { tool: "docker.build", args: { tag: "latest" } },
    { tool: "network.check", args: { port: 3000 } }
];

const MOCK_DIFFS: FileDiff[] = [
    {
        path: "src/auth/config.ts",
        type: "modify",
        original: "export const SESSION_STRATEGY = 'memory';\nexport const SESSION_TIMEOUT = 3600;",
        modified: "export const AUTH_STRATEGY = 'jwt';\nexport const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';\nexport const JWT_EXPIRES_IN = '7d';\nexport const REFRESH_TOKEN_EXPIRES_IN = '30d';"
    },
    {
        path: "src/middleware/auth.ts",
        type: "modify",
        original: "import session from 'express-session';\n\nexport const authMiddleware = session({\n  secret: 'my-secret',\n  resave: false\n});",
        modified: "import jwt from 'jsonwebtoken';\nimport { JWT_SECRET } from '../auth/config';\n\nexport const authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  \n  try {\n    req.user = jwt.verify(token, JWT_SECRET);\n    next();\n  } catch (err) {\n    res.status(403).json({ error: 'Invalid token' });\n  }\n};"
    },
    {
        path: "src/api/routes/auth.ts",
        type: "modify",
        original: "router.post('/login', async (req, res) => {\n  const user = await User.findOne({ email: req.body.email });\n  req.session.userId = user.id;\n  res.json({ success: true });\n});",
        modified: "router.post('/login', async (req, res) => {\n  const user = await User.findOne({ email: req.body.email });\n  if (!user || !await user.comparePassword(req.body.password)) {\n    return res.status(401).json({ error: 'Invalid credentials' });\n  }\n  \n  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });\n  res.json({ token, user: { id: user.id, email: user.email } });\n});"
    },
    {
        path: "src/validators/user.schema.ts",
        type: "create",
        original: "",
        modified: "import { z } from 'zod';\n\nexport const loginSchema = z.object({\n  email: z.string().email('Invalid email format'),\n  password: z.string().min(8, 'Password must be at least 8 characters')\n});\n\nexport const registerSchema = loginSchema.extend({\n  name: z.string().min(2, 'Name must be at least 2 characters'),\n  confirmPassword: z.string()\n}).refine(data => data.password === data.confirmPassword, {\n  message: 'Passwords do not match',\n  path: ['confirmPassword']\n});"
    },
    {
        path: "src/middleware/rate-limit.ts",
        type: "create",
        original: "",
        modified: "import rateLimit from 'express-rate-limit';\n\nexport const apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per windowMs\n  message: 'Too many requests from this IP, please try again later.'\n});\n\nexport const authLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5, // stricter limit for auth endpoints\n  skipSuccessfulRequests: true\n});"
    },
    {
        path: "src/utils/logger.ts",
        type: "create",
        original: "",
        modified: "import winston from 'winston';\nimport { v4 as uuidv4 } from 'uuid';\n\nexport const logger = winston.createLogger({\n  level: process.env.LOG_LEVEL || 'info',\n  format: winston.format.combine(\n    winston.format.timestamp(),\n    winston.format.json()\n  ),\n  transports: [\n    new winston.transports.File({ filename: 'error.log', level: 'error' }),\n    new winston.transports.File({ filename: 'combined.log' })\n  ]\n});\n\nexport const requestLogger = (req, res, next) => {\n  req.id = uuidv4();\n  logger.info({ requestId: req.id, method: req.method, path: req.path });\n  next();\n};"
    },
    {
        path: "src/models/User.ts",
        type: "modify",
        original: "export class User {\n  id: string;\n  email: string;\n  password: string;\n}",
        modified: "import bcrypt from 'bcryptjs';\n\nexport class User {\n  id: string;\n  email: string;\n  password: string;\n  createdAt: Date;\n  updatedAt: Date;\n  \n  async comparePassword(candidatePassword: string): Promise<boolean> {\n    return bcrypt.compare(candidatePassword, this.password);\n  }\n  \n  static async hashPassword(password: string): Promise<string> {\n    return bcrypt.hash(password, 10);\n  }\n}"
    },
    {
        path: "src/database/connection.ts",
        type: "create",
        original: "",
        modified: "import { Pool } from 'pg';\nimport { logger } from '../utils/logger';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000,\n});\n\npool.on('error', (err) => {\n  logger.error('Unexpected database error', { error: err });\n});\n\nexport default pool;"
    },
    {
        path: "Dockerfile",
        type: "create",
        original: "",
        modified: "FROM node:20-alpine AS builder\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm ci --only=production\n\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\n\nWORKDIR /app\n\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package*.json ./\n\nEXPOSE 3000\n\nCMD [\"node\", \"dist/index.js\"]"
    },
    {
        path: ".github/workflows/ci.yml",
        type: "create",
        original: "",
        modified: "name: CI\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '20'\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build"
    }
];

export function simulateAgent(agentId: string, prompt: string, cb: SimulationCallbacks, config: SimulationConfig): () => void {
    const { temperature, streamSpeed, maxTokens, workingDir } = config;
    let isCancelled = false;
    let progress = 0;
    const startTime = Date.now();

    // Initial configuration logs
    cb.onLog(`[SYSTEM] Initializing agent ${agentId}...`);
    cb.onLog(`[CONFIG] Model: ${config.model} | Temp: ${temperature} | MaxTokens: ${maxTokens}`);
    cb.onLog(`[CONFIG] Working Directory: ${workingDir}`);
    cb.onLog(`[CONFIG] Stream Speed: ${streamSpeed}ms`);

    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    // THINKING phase
    cb.onStatus("THINKING");
    cb.onLog("[AGENT] Analyzing prompt and planning approach...");

    timeout = setTimeout(() => {
        if (isCancelled) return;

        cb.onStatus("STREAMING");
        cb.onLog("[AGENT] Starting execution stream");

        let currentResponseIndex = 0;
        let charIndex = 0;

        interval = setInterval(async () => {
            if (isCancelled) {
                if (interval) clearInterval(interval);
                return;
            }

            // 1. Stream complete sentences with realistic delays
            if (currentResponseIndex < MOCK_RESPONSES.length) {
                const currentResponse = MOCK_RESPONSES[currentResponseIndex];

                // Stream character by character with variable speed
                const baseChunkSize = Math.floor(Math.random() * 3) + 2; // 2-4 chars
                // Higher temp = more variable chunk size
                const variance = Math.floor(Math.random() * temperature * 3);
                const chunkSize = baseChunkSize + variance;

                const chunk = currentResponse.slice(charIndex, charIndex + chunkSize);

                if (chunk) {
                    cb.onStream(chunk);
                    charIndex += chunkSize;

                    // Simulate pause at punctuation (visual only, handled by UI updates)
                } else {
                    // Finished current response, move to next
                    cb.onStream("\n\n");
                    currentResponseIndex++;
                    charIndex = 0;

                    // Log the completed thought (more frequent with higher temp)
                    if (Math.random() > (0.6 - temperature * 0.3)) {
                        cb.onLog(`[THOUGHT] ${currentResponse}`);
                    }
                }
            }

            // 2. Dynamic Progress (affected by temperature)
            const progressIncrement = (Math.random() * 1.5 * (1 + temperature * 0.5));
            progress += progressIncrement;
            if (progress > 100) progress = 100;
            cb.onProgress(Math.floor(progress));

            // 3. Trigger Tool Calls (more frequent with higher temp)
            if (Math.random() > (0.92 - temperature * 0.08)) {
                const toolTemplate = MOCK_TOOLS[Math.floor(Math.random() * MOCK_TOOLS.length)];
                const toolId = Math.random().toString(36).substr(2, 9);

                cb.onLog(`[TOOL] Invoking ${toolTemplate.tool}(${JSON.stringify(toolTemplate.args)})`);

                // Create pending tool
                cb.onToolCall({
                    id: toolId,
                    tool: toolTemplate.tool,
                    args: toolTemplate.args,
                    status: "running",
                    timestamp: new Date().toLocaleTimeString()
                });

                // Simulate tool execution time
                const executionTime = 800 + Math.random() * 1200;
                setTimeout(() => {
                    if (isCancelled) return;
                    cb.onToolUpdate(toolId, {
                        status: "completed",
                        result: toolTemplate.tool.includes('test') ? "All tests passed" : "Success"
                    });
                    cb.onLog(`[TOOL] ${toolTemplate.tool} completed in ${(executionTime / 1000).toFixed(2)}s`);
                }, executionTime);
            }

            // 4. Trigger File Diffs (very frequent for god-tier feel)
            if (Math.random() > 0.82) {
                const diff = MOCK_DIFFS[Math.floor(Math.random() * MOCK_DIFFS.length)];
                cb.onDiff(diff);
                cb.onLog(`[FILE] ${diff.type === 'create' ? 'Created' : diff.type === 'delete' ? 'Deleted' : 'Modified'}: ${diff.path}`);
            }

            // 5. Intermediate status updates
            if (progress > 25 && progress < 30 && Math.random() > 0.8) {
                cb.onLog("[AGENT] Phase 1 complete: Analysis finished");
            }
            if (progress > 50 && progress < 55 && Math.random() > 0.8) {
                cb.onLog("[AGENT] Phase 2 complete: Implementation in progress");
            }
            if (progress > 75 && progress < 80 && Math.random() > 0.8) {
                cb.onLog("[AGENT] Phase 3 complete: Testing and validation");
            }

            // End condition
            if (currentResponseIndex >= MOCK_RESPONSES.length && progress >= 100) {
                if (interval) clearInterval(interval);

                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
                const filesModified = Math.floor(Math.random() * 8) + 3;
                const linesAdded = Math.floor(Math.random() * 200) + 50;
                const linesRemoved = Math.floor(Math.random() * 100) + 20;

                cb.onStatus("COMPLETED");
                cb.onProgress(100);
                cb.onLog("[SYSTEM] ✓ Task completed successfully");
                cb.onLog(`[METRICS] Execution time: ${elapsedTime}s`);
                cb.onLog(`[METRICS] Total tokens used: ~${Math.floor(maxTokens * (0.4 + Math.random() * 0.3))}`);
                cb.onLog(`[METRICS] Files modified: ${filesModified}`);
                cb.onLog(`[METRICS] Lines changed: +${linesAdded} -${linesRemoved}`);
                cb.onComplete();
            }

        }, streamSpeed); // Configurable tick speed
    }, 1000 + Math.random() * 500); // Variable initial thinking time

    // Return cancellation function
    return () => {
        isCancelled = true;
        if (interval) clearInterval(interval);
        if (timeout) clearTimeout(timeout);
        cb.onStatus("IDLE");
        cb.onLog("[SYSTEM] Simulation cancelled by user");
        cb.onProgress(0);
    };
}
