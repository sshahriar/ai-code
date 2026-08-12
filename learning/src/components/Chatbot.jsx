import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { streamChat, truncateContext } from '../lib/openrouter'

const SUGGESTIONS = ['Summarize the key ideas', 'What should I practice?', 'Explain this more simply']

export default function Chatbot({ lessonTitle, lessonBody }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setMessages([])
    setError('')
  }, [lessonTitle])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 180)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [open])

  async function sendMessage(textOverride) {
    const text = (textOverride ?? input).trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError('')
    setOpen(true)
    setMessages([...nextMessages, { role: 'assistant', content: '' }])

    const system = {
      role: 'system',
      content: `You are a helpful tutor for the AI Coder course. Answer using ONLY the current lesson context when possible. If something is not covered, say so briefly. Keep answers clear and practical.

Current lesson: ${lessonTitle || 'Unknown'}

Lesson content:
${truncateContext(lessonBody || '', 10000)}`,
    }

    try {
      let assistant = ''
      for await (const delta of streamChat({
        messages: [system, ...nextMessages.slice(-8)],
      })) {
        assistant += delta
        setMessages([...nextMessages, { role: 'assistant', content: assistant }])
      }
      if (!assistant) {
        setMessages([...nextMessages, { role: 'assistant', content: 'No response received.' }])
      }
    } catch (err) {
      setError(err.message || 'Chat failed')
      setMessages(nextMessages)
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      {!open ? (
        <button type="button" className="chat-fab-compact icon-only" onClick={() => setOpen(true)} aria-label="Open chat">
          <span className="chat-fab-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
          </span>
        </button>
      ) : (
        <div className="chat-shell expanded">
          <div className="chat-panel">
            <div className="chat-head">
              <div className="chat-head-main">
                <span className="chat-avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                  </svg>
                </span>
                <div>
                  <strong>Ask</strong>
                  <p className="chat-lesson-title" title={lessonTitle}>
                    {lessonTitle || 'Select a lesson'}
                  </p>
                </div>
              </div>
              <div className="chat-actions">
                <button type="button" className="chat-icon-btn" onClick={() => setMessages([])} title="Clear chat">
                  Clear
                </button>
                <button
                  type="button"
                  className="chat-icon-btn square"
                  onClick={() => setOpen(false)}
                  aria-label="Minimize chat"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="chat-messages" ref={listRef}>
              {messages.length === 0 && (
                <div className="chat-empty-state">
                  <p className="chat-empty">Ask anything about this lesson — concepts, steps, or clarifications.</p>
                  <div className="chat-suggestions">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="chat-chip"
                        disabled={!lessonBody || loading}
                        onClick={() => sendMessage(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={`${m.role}-${i}`} className={`bubble ${m.role}`}>
                  {m.role === 'assistant' ? (
                    <ReactMarkdown>{m.content || (loading ? 'Thinking…' : '…')}</ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              ))}
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>

          <form className="chat-bar" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this lesson…"
              disabled={loading || !lessonBody}
              aria-label="Chat message"
            />

            <button
              type="submit"
              className="chat-send"
              disabled={loading || !input.trim() || !lessonBody}
              aria-label="Send message"
            >
              {loading ? (
                <span className="chat-spinner" aria-hidden="true" />
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h12M13 6l6 6-6 6" />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
