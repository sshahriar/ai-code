import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAdjacentLessons, getExpandedState, getProgress, setExpandedState } from '../lib/courseTree'

export default function LeftSidebar({ manifest, open, onClose, progressVersion = 0 }) {
  const { slug } = useParams()
  const progress = useMemo(() => getProgress(), [progressVersion])
  const [expanded, setExpanded] = useState(() => getExpandedState())
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!manifest || !slug) return
    const lesson = manifest.lessons.find((l) => l.slug === slug)
    if (!lesson) return
    setExpanded((prev) => {
      const next = {
        ...prev,
        [lesson.weekId]: true,
        [`${lesson.weekId}:${lesson.dayId}`]: true,
      }
      setExpandedState(next)
      return next
    })
  }, [manifest, slug])

  const filteredWeeks = useMemo(() => {
    if (!manifest) return []
    const q = query.trim().toLowerCase()
    if (!q) return manifest.weeks

    return manifest.weeks
      .map((week) => ({
        ...week,
        days: week.days
          .map((day) => ({
            ...day,
            lessons: day.lessons.filter((l) => l.title.toLowerCase().includes(q)),
          }))
          .filter((day) => day.lessons.length > 0),
      }))
      .filter((week) => week.days.length > 0)
  }, [manifest, query])

  function toggle(key) {
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      setExpandedState(next)
      return next
    })
  }

  return (
    <aside className={`left-sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-head">
        <div>
          <p className="eyebrow">Course</p>
          <h2>{manifest?.courseTitle || 'Loading…'}</h2>
        </div>
        <button type="button" className="icon-btn mobile-only" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>

      <input
        className="search-input"
        type="search"
        placeholder="Search lessons…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <nav className="module-nav" aria-label="Course modules">
        {filteredWeeks.map((week) => {
          const weekOpen = query || expanded[week.id]
          return (
            <div key={week.id} className="nav-week">
              <button type="button" className="nav-toggle" onClick={() => toggle(week.id)}>
                <span>{weekOpen ? '▾' : '▸'}</span>
                {week.title}
              </button>
              {weekOpen &&
                week.days.map((day) => {
                  const dayKey = `${week.id}:${day.id}`
                  const dayOpen = query || expanded[dayKey]
                  return (
                    <div key={dayKey} className="nav-day">
                      <button type="button" className="nav-toggle day" onClick={() => toggle(dayKey)}>
                        <span>{dayOpen ? '▾' : '▸'}</span>
                        {day.title}
                      </button>
                      {dayOpen && (
                        <ul>
                          {day.lessons.map((lesson) => (
                            <li key={lesson.slug}>
                              <Link
                                to={`/learn/${lesson.slug}`}
                                className={lesson.slug === slug ? 'active' : ''}
                                onClick={onClose}
                              >
                                <span className={`dot ${progress[lesson.slug] ? 'done' : ''}`} />
                                <span>
                                  <small>{lesson.id}.</small> {lesson.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </nav>

      {slug && manifest && (
        <p className="sidebar-meta">
          {(() => {
            const { index, total } = getAdjacentLessons(manifest, slug)
            return index >= 0 ? `Lesson ${index + 1} of ${total}` : null
          })()}
        </p>
      )}
    </aside>
  )
}
