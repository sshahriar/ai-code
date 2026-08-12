import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import RightToc from './RightToc'
import Chatbot from './Chatbot'
import ThemeToggle from './ThemeToggle'
import { findLesson } from '../lib/courseTree'

export default function Layout({ manifest }) {
  const { slug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [lessonBody, setLessonBody] = useState('')
  const [progressVersion, setProgressVersion] = useState(0)
  const lesson = findLesson(manifest, slug)

  useEffect(() => {
    setHeadings([])
    setActiveId('')
  }, [slug])

  return (
    <div className="app-shell">
      <header className="topbar">
        <button type="button" className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          ☰
        </button>
        <div className="brand">
          <span className="brand-mark">AI</span>
          <div>
            <strong>AI Coder Learn</strong>
            <p>Agentic engineering course notes</p>
          </div>
        </div>
        <div className="topbar-right">
          <span className="top-meta">{manifest?.lessonCount || 0} lessons</span>
          <ThemeToggle />
        </div>
      </header>

      {menuOpen && (
        <button type="button" className="backdrop mobile-only" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
      )}

      <div className="docs-grid">
        <LeftSidebar
          manifest={manifest}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          progressVersion={progressVersion}
        />

        <main className="docs-main">
          <Outlet
            context={{
              setHeadings,
              setActiveId,
              setLessonBody,
              lessonBody,
              onProgressChange: () => setProgressVersion((v) => v + 1),
            }}
          />
        </main>

        <RightToc headings={headings} activeId={activeId} />
      </div>

      <Chatbot lessonTitle={lesson?.title} lessonBody={lessonBody} />
    </div>
  )
}
