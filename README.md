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
| 🤖 *More coming soon...* | AI & DevTools | Next-generation AI agents and legal automation tools | 🚧 Planned | — |

---

## 🛠️ Repository Architecture

```text
ai-code/
├── nda-generator/             # Mutual NDA Creator & Legal Agreement Templates
│   ├── frontend/             # React 18 + Vite Web Application
│   ├── templates/            # Common Paper Legal Agreements (.md)
│   ├── catalog.json          # Legal templates catalog index
│   └── README.md             # Project-specific documentation
├── index.html                # Workspace Hub Landing Page (GitHub Pages)
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD Workflow
├── README.md                 # Monorepo Workspace Guide
└── .gitignore                # Global workspace gitignore
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
