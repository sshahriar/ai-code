import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { summarizeLesson } from '../lib/openrouter'

const summaryModules = import.meta.glob('/content/summaries/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
})

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

function canUseLiveAi() {
  return Boolean(import.meta.env.DEV)
}

export default function LessonSummaryTab({ slug, title, body, active }) {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')
  const [source, setSource] = useState('static')

  useEffect(() => {
    let cancelled = false

    async function loadStatic() {
      setError('')
      setSource('static')
      setSummary('')
      if (!slug) return

      const key = Object.keys(summaryModules).find((k) => k.endsWith(`${slug}.md`))
      if (!key) {
        setError('Prebuilt summary not found. Run npm run build:content')
        return
      }

      setLoading(true)
      try {
        const md = await summaryModules[key]()
        if (!cancelled) setSummary(md)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load summary')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadStatic()
    return () => {
      cancelled = true
    }
  }, [slug])

  async function regenerate() {
    if (!canUseLiveAi()) {
      setError('Live regenerate only works with npm run dev. Hosted builds use pre-generated summaries.')
      return
    }
    if (!body) return

    setLoading(true)
    setError('')
    setSource('live')
    try {
      const text = await summarizeLesson({ title, body })
      setSummary(text)
    } catch (err) {
      setError(err.message || 'Failed to regenerate summary')
      setSource('static')
    } finally {
      setLoading(false)
    }
  }

  if (!active && !summary && !loading) {
    return null
  }

  return (
    <div className={`summary-tab ${loading ? 'is-loading' : ''}`}>
      <div className="summary-tab-head">
        <div>
          <h2>Summary</h2>
          <p className="muted">
            {loading
              ? source === 'live'
                ? 'Generating with OpenRouter…'
                : 'Loading prebuilt summary…'
              : source === 'live'
                ? 'Live AI summary (local only)'
                : 'Prebuilt lesson summary'}
          </p>
        </div>
        {canUseLiveAi() && (
          <button type="button" className="btn ghost" onClick={regenerate} disabled={loading || !body}>
            {loading && source === 'live' ? 'Working…' : 'Regenerate'}
          </button>
        )}
      </div>

      <div className="summary-tab-body">
        {error && <p className="error-text">{error}</p>}
        {loading && <SummarySkeleton />}
        {!loading && summary && (
          <div className="markdown-body">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        )}
        {!loading && !summary && !error && <p className="muted">No summary available for this lesson.</p>}
      </div>
    </div>
  )
}
