import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LessonSummaryTab from './LessonSummaryTab'
import { getAdjacentLessons, markLessonComplete, slugifyHeading } from '../lib/courseTree'

function extractHeadings(markdown) {
  const headings = []
  const seen = new Set()
  const lines = String(markdown || '').split(/\r?\n/)
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const level = match[1].length
    const text = match[2].replace(/[#*`]/g, '').trim()
    let id = slugifyHeading(text)
    if (seen.has(id)) id = `${id}-${seen.size}`
    seen.add(id)
    headings.push({ id, text, level })
  }
  return headings
}

function MarkdownHeading({ level, children }) {
  const text = Array.isArray(children)
    ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
    : String(children ?? '')
  const id = slugifyHeading(text)
  const Tag = `h${level}`
  return <Tag id={id}>{children}</Tag>
}

export default function LessonContent({
  manifest,
  lesson,
  markdown,
  onHeadingsChange,
  onActiveHeading,
  onProgressChange,
}) {
  const [tab, setTab] = useState('content')
  const headings = useMemo(() => extractHeadings(markdown), [markdown])
  const adjacent = lesson ? getAdjacentLessons(manifest, lesson.slug) : { prev: null, next: null }

  useEffect(() => {
    setTab('content')
  }, [lesson?.slug])

  useEffect(() => {
    onHeadingsChange?.(tab === 'content' ? headings : [])
  }, [headings, onHeadingsChange, tab])

  useEffect(() => {
    if (tab !== 'content' || !headings.length) return undefined

    const nodes = headings.map((h) => document.getElementById(h.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) onActiveHeading?.(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [headings, markdown, onActiveHeading, tab])

  if (!lesson) {
    return (
      <article className="lesson-article">
        <h1>Lesson not found</h1>
        <p>Pick a module from the left sidebar.</p>
      </article>
    )
  }

  return (
    <article className="lesson-article">
      <div className="lesson-actions">
        <div className="crumbs">
          <span>{lesson.weekTitle}</span>
          <span>/</span>
          <span>{lesson.dayTitle}</span>
        </div>
        <div className="action-row">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              markLessonComplete(lesson.slug)
              onProgressChange?.()
            }}
          >
            Mark complete
          </button>
        </div>
      </div>

      <div className="lesson-tabs" role="tablist" aria-label="Lesson view">
        <button
          type="button"
          role="tab"
          id="tab-content"
          aria-selected={tab === 'content'}
          aria-controls="panel-content"
          className={`lesson-tab ${tab === 'content' ? 'active' : ''}`}
          onClick={() => setTab('content')}
        >
          Content
        </button>
        <button
          type="button"
          role="tab"
          id="tab-summary"
          aria-selected={tab === 'summary'}
          aria-controls="panel-summary"
          className={`lesson-tab ${tab === 'summary' ? 'active' : ''}`}
          onClick={() => setTab('summary')}
        >
          Summary
        </button>
      </div>

      {tab === 'content' ? (
        <div
          className="markdown-body"
          role="tabpanel"
          id="panel-content"
          aria-labelledby="tab-content"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
              h3: ({ children }) => <MarkdownHeading level={3}>{children}</MarkdownHeading>,
            }}
          >
            {markdown || '_Loading lesson…_'}
          </ReactMarkdown>
        </div>
      ) : (
        <div role="tabpanel" id="panel-summary" aria-labelledby="tab-summary">
          <LessonSummaryTab
            key={lesson.slug}
            slug={lesson.slug}
            title={lesson.title}
            body={markdown}
            active={tab === 'summary'}
          />
        </div>
      )}

      <nav className="lesson-pager">
        {adjacent.prev ? (
          <Link to={`/learn/${adjacent.prev.slug}`} className="pager-link prev">
            <span>Previous</span>
            <strong>{adjacent.prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {adjacent.next ? (
          <Link to={`/learn/${adjacent.next.slug}`} className="pager-link next">
            <span>Next</span>
            <strong>{adjacent.next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
