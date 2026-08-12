import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { applyTheme } from './lib/theme'
import './styles/index.css'

try {
  const saved = localStorage.getItem('learning-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light')
} catch {
  applyTheme('light')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/ai-code/learning">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
