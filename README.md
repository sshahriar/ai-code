# 🚀 AI-Code Workspace

Welcome to **ai-code**, a multi-project monorepo workspace for building open-source AI tools, legal technology software, and developer applications.

[![Live Portal](https://img.shields.io/badge/🌐_Workspace_Portal-https%3A%2F%2Fsshahriar.github.io%2Fai--code%2F-indigo?style=for-the-badge)](https://sshahriar.github.io/ai-code/)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT_/_CC_BY_4.0-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 🌐 Live Workspace Hub

Explore the live projects directory on GitHub Pages:  
👉 **[https://sshahriar.github.io/ai-code/](https://sshahriar.github.io/ai-code/)**

---

## 📂 Sub-Projects Directory

| Project Name | Category | Description | Status | Live Demo |
| :--- | :--- | :--- | :--- | :--- |
| 📜 **[nda-generator](./nda-generator/)** | Legal Tech | Interactive Mutual NDA Creator & Legal Templates Dataset based on Common Paper standards | 🟢 Active | [Launch App](https://sshahriar.github.io/ai-code/nda-generator/) |
| 📋 **[kanban-gemini](./kanban-gemini/)** | DevTools | Modern drag-and-drop Kanban project management web application | 🟢 Active | [Launch App](https://sshahriar.github.io/ai-code/kanban-gemini/) |
| 👤 **[portfolio](./portfolio/)** | Web App | Personal software engineering portfolio with glassmorphism UI & interactive timeline | 🟢 Active | [Launch App](https://sshahriar.github.io/ai-code/portfolio/) |
| 📈 **[finally](./finally/)** | FinTech | AI-powered trading workstation with real-time SSE market streaming & LLM copilot | 🟢 Active | - |
| 📚 **[learning](./learning/)** | Education | Docs-style AI Coder course notes with Content/Summary tabs and OpenRouter Ask chat | 🟢 Active | [Launch App](https://sshahriar.github.io/ai-code/learning/) |
| 🛰️ **[agentic-workflow](./agentic-workflow/)** | Education | Mission-control dashboard: Jira ticket to deploy via an orchestrated agent team | 🟢 Active | [Launch App](https://sshahriar.github.io/ai-code/agentic-workflow/) |

---

## 🛠️ Repository Architecture

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
├── portfolio/                 # Sub-Project 3: Software Engineering Portfolio (Next.js 15)
├── finally/                   # Sub-Project 4: AI Trading Workstation (FastAPI + Next.js)
├── learning/                  # Sub-Project 5: AI Coder Learn (React + Vite)
└── agentic-workflow/          # Sub-Project 6: Agentic Ops dashboard (static HTML)
```

---

## 🚀 Quick Start for Developers

### Clone the Repository
```bash
git clone https://github.com/sshahriar/ai-code.git
cd ai-code
```

### Run `nda-generator` Locally
```bash
cd nda-generator/frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 📄 License & Contribution

- Repository code is open-source under the MIT License.
- Legal templates in `nda-generator/templates/` originate from [Common Paper](https://github.com/CommonPaper) under Creative Commons Attribution 4.0 International (CC BY 4.0).
- Pull requests and contributions for new projects under `ai-code` are welcome!
