# AGENTS.md — AI Coding Guidelines for `ai-code` Workspace

Welcome to **ai-code**, a multi-project monorepo workspace for building open-source AI tools, legal technology platforms, and developer applications.

---

## 🏗️ Repository Architecture

This repository is structured as a **multi-project monorepo**. Each application or tool lives in its own top-level subfolder.

```text
ai-code/
├── AGENTS.md                  # AI agent guidelines & repository standards
├── README.md                  # Workspace monorepo index & project directory
├── index.html                 # Root landing page for GitHub Pages hub
├── .gitignore                 # Monorepo git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions automated deployment
├── nda-generator/             # Sub-Project 1: Mutual NDA Creator (React 18 + Vite)
├── kanban-gemini/             # Sub-Project 2: Kanban Project Management (Next.js 15)
└── portfolio/                 # Sub-Project 3: Software Engineering Portfolio (Next.js 15)
```

---

## 🛠️ Monorepo Rules & Best Practices

### 1. Sub-Project Isolation
- Every new tool or project **must** live inside its own directory under the root (e.g., `ai-code/<new-project>/`).
- Keep project-specific source code, assets, dependencies (`package.json`), and documentation inside that subfolder.

### 2. GitHub Pages Deployment Configuration
- All web apps are deployed together to GitHub Pages:
  - Workspace Hub: `https://sshahriar.github.io/ai-code/`
  - Sub-Projects: `https://sshahriar.github.io/ai-code/<project-name>/`
- **Vite Projects**: Set base path in `vite.config.js`:
  ```js
  export default defineConfig({
    plugins: [react()],
    base: '/ai-code/<project-name>/',
  })
  ```
- **Next.js Projects**: Set static export and basePath in `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    output: "export",
    basePath: "/ai-code/<project-name>",
    images: { unoptimized: true }
  };
  ```

### 3. Registering New Sub-Projects
When adding a new sub-project to `ai-code`:
1. Add the project card to the root **[index.html](./index.html)** in the `.projects-grid` section.
2. Add a row to the project directory table in the root **[README.md](./README.md)**.
3. Update `.github/workflows/deploy.yml` to build the new project's static assets into `public_site/<project-name>/`.

---

## 🧪 Verification & Build Instructions

Before submitting changes or opening a PR:
1. Run local build inside the relevant sub-project:
   ```bash
   cd nda-generator/frontend
   npm install
   npm run build
   ```
2. Ensure there are no broken imports, missing dependencies, or path errors.
3. Keep git history clean by committing clear, scoped messages.
