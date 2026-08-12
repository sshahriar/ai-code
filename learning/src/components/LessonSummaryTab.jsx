import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getCachedSummary, setCachedSummary, summarizeLesson } from '../lib/openrouter'

function SummarySkeleton() {
  return (
    <div className="summary-skeleton" aria-hidden="true">
      <div className="skel-line skel-title" />
      <div className="skel-line" />
      <div className="skel-line" />
      <div className="skel-line skel-short" />
      <div className="skel-gap" />
      <div className="skel-line skel-title" />
      <div className="skel-line" />
      <div className="skel-line skel-mid" />
      <div className="skel-line skel-short" />
      <div className="skel-gap" />
      <div className="skel-line" />
      <div className="skel-line skel-mid" />
    </div>
  )
}

export default function LessonSummaryTab({ slug, title, body, active }) {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(() => getCachedSummary(slug))
  const [error, setError] = useState('')

  useEffect(() => {
    setSummary(getCachedSummary(slug))
    setError('')
    setLoading(false)
  }, [slug])

  useEffect(() => {
    if (!active || !body) return undefined
    const cached = getCachedSummary(slug)
    if (cached) {
      setSummary(cached)
      return undefined
    }

    let cancelled = false
    async function run() {
      setLoading(true)
      setError('')
      setSummary('')
      try {
        const text = await summarizeLesson({ title, body })
        if (cancelled) return
        setSummary(text)
        setCachedSummary(slug, text)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to summarize')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [active, slug, title, body])

  async function regenerate() {
    setLoading(true)
    setError('')
    setSummary('')
    try {
      const text = await summarizeLesson({ title, body })
      setSummary(text)
      setCachedSummary(slug, text)
    } catch (err) {
      setError(err.message || 'Failed to summarize')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`summary-tab ${loading ? 'is-loading' : ''}`}>
      <div className="summary-tab-head">
        <div>
          <h2>Summary</h2>
          <p className="muted">
            {loading ? 'Generating a concise overview of this lesson…' : 'AI overview of the current lesson'}
          </p>
        </div>
        <button type="button" className="btn ghost" onClick={regenerate} disabled={loading || !body}>
          {loading ? 'Working…' : 'Regenerate'}
        </button>
      </div>

      <div className="summary-tab-body">
        {error && <p className="error-text">{error}</p>}
        {loading && <SummarySkeleton />}
        {!loading && summary && (
          <div className="markdown-body">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        )}
        {!loading && !summary && !error && <p className="muted">Open this tab to generate a summary.</p>}
      </div>
    </div>
  )
}
