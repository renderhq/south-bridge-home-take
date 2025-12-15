---
description: Scaffold Next.js project using Bun runtime
---

1. Ensure Bun is installed on the system.
   ```bash
   bun --version
   ```
2. Navigate to the project root directory.
   // turbo
   ```bash
   cd C:\Users\jayad\southbridge-hometake
   ```
3. Run the Next.js starter template with Bun.
   // turbo
   ```bash
   npx -y create-next-app@latest . --use-bun
   ```
4. Install additional dependencies for UI components and state management.
   // turbo
   ```bash
   bun add tailwindcss@latest postcss@latest autoprefixer@latest @headlessui/react @heroicons/react
   ```
5. Initialize Tailwind CSS.
   // turbo
   ```bash
   npx tailwindcss init -p
   ```
6. Update `tailwind.config.js` to enable JIT mode and set content paths.
   ```bash
   // edit tailwind.config.js (see file modifications below)
   ```
7. Start the development server.
   // turbo
   ```bash
   bun dev
   ```

**Note**: Steps marked with `// turbo` will be auto‑executed by the workflow runner with `SafeToAutoRun: true`.
