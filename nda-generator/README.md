# 📜 Prelegal: Mutual NDA Creator & Legal Templates Dataset

An open-source legal technology platform for generating, customizing, and exporting standard legal agreements based on Common Paper open standards.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-https%3A%2F%2Fsshahriar.github.io%2Fai--code%2Fnda--generator%2F-indigo?style=for-the-badge)](https://sshahriar.github.io/ai-code/nda-generator/)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-CC_BY_4.0-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 🌐 Live Demo

Visit the live web application hosted on GitHub Pages:  
👉 **[https://sshahriar.github.io/ai-code/nda-generator/](https://sshahriar.github.io/ai-code/nda-generator/)**

---

## ✨ Features

- **📄 Interactive Mutual NDA Creator (`frontend/`)**: React-based web application to input agreement parameters, party information, and custom modifications with real-time legal document preview.
- **⚡ Live Preview & Highlighting**: Dynamic side-by-side or tabbed view rendering Common Paper Cover Page & Standard Terms (Version 1.0) with real-time field highlights.
- **✨ 1-Click Sample Data Loader**: Instantly populate form fields with sample enterprise and startup company parameters.
- **📥 Export Options**: Download document as Markdown (`.md`), Plain Text (`.txt`), copy to clipboard, or print / save as PDF.
- **🌙 Dark & Light Mode**: Modern glassmorphism UI supporting dark and light themes with responsive layouts.
- **📚 Curated Legal Templates (`templates/`)**: Collection of 12 standard Common Paper legal agreement templates (`Mutual NDA`, `CSA`, `SLA`, `DPA`, `BAA`, `PSA`, `Software License`, `AI Addendum`, etc.) mapped via `catalog.json`.

---

## 🛠️ Tech Stack

- **Frontend App**: React 18, Vite, Lucide Icons
- **Styling**: Modern CSS3 (CSS Variables, Dark/Light Themes, Glassmorphism, Print Media Queries)
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/sshahriar/ai-code.git
cd ai-code/nda-generator/frontend
```

### 2. Run the React Frontend Locally
```bash
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 📂 Project Structure

```text
├── frontend/                  # React + Vite Mutual NDA Creator App
│   ├── src/
│   │   ├── components/       # Header, NDAForm, NDAPreview, ExportToolbar
│   │   ├── App.jsx           # Main state management & export handlers
│   │   ├── index.css         # Design system & dark/light theme CSS
│   │   └── main.jsx          # React entrypoint
│   ├── index.html            # Vite HTML template
│   ├── package.json          # Dependencies & scripts
│   └── vite.config.js        # Vite configuration (base: './')
├── templates/                 # Common Paper Legal Agreement Templates (.md)
│   ├── Mutual-NDA.md
│   ├── CSA.md
│   ├── DPA.md
│   ├── LICENSE.txt           # CC BY 4.0 License Notice
│   └── ...
├── catalog.json              # Index mapping legal agreement titles & descriptions
└── README.md                 # Project documentation
```

---

## 📄 License & Attribution

Legal agreement templates in `templates/` originate from [Common Paper](https://github.com/CommonPaper) and are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
