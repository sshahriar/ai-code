# 📋 Simple Kanban App

A sleek, lightweight, and responsive Kanban Board application built to help individuals and teams organize tasks, boost productivity, and track project workflows seamlessly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## ✨ Features


- **⚡ Interactive Drag & Drop**: Intuitively drag tasks across custom workflow columns (e.g., *To Do*, *In Progress*, *Done*).
- **🎨 Custom Categories & Tags**: Color-coded labels and priority tags (Low, Medium, High, Urgent) for instant visual hierarchy.
- **💾 Local Persistence**: Automatically saves your board state to `localStorage` so your tasks persist across sessions.
- **🔍 Quick Search & Filter**: Search tasks by title, description, priority, or assigned tags in real-time.
- **🌙 Dark / Light Mode**: Beautiful modern UI styled with custom CSS supporting dark and light themes.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism UI)
- **Icons**: Lucide / FontAwesome
- **Storage**: Browser `localStorage` (or optional REST API backend integration)

---

## 🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari).
- *(Optional)* [Node.js](https://nodejs.org/) if running with a local server or building additional features.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sshahriar/ai-code.git
   cd ai-code
   ```

2. **Run locally**:
   - Open `index.html` directly in your browser, or
   - Use a lightweight live server:
     ```bash
     npx serve .
     ```

---

## 📂 Project Structure

```text
├── index.html          # Main HTML markup & board layout
├── css/
│   └── styles.css      # Design system, themes & animations
├── js/
│   ├── app.js          # Core application logic & event listeners
│   ├── kanban.js       # Board state management & drag-and-drop handler
│   └── storage.js      # LocalStorage serialization helpers
└── README.md           # Project documentation
```

---

## 📖 Usage Guide

1. **Adding a Task**: Click the `+ Add Task` button in any column, enter the title, description, priority, and click **Save**.
2. **Moving Tasks**: Click and hold a task card, then drag it to your desired column.
3. **Editing/Deleting**: Click on any task card to edit its details or remove it.
4. **Filtering**: Use the top search bar to instantly filter tasks by keywords or priority levels.

---

## 🗺️ Roadmap

- [ ] Multi-board support & workspace switcher
- [ ] User authentication & real-time collaboration via WebSockets
- [ ] Export board data to JSON / CSV
- [ ] Integration with GitHub Issues & Webhooks

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements:

1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.
