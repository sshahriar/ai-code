const MAX_CONTEXT = 12000

function apiErrorMessage(detail, status) {
  if (status === 404 || status === 405) {
    return 'AI features need the local Vite proxy (npm run dev). Lesson content still works on the hosted site.'
  }
  return typeof detail === 'string' ? detail : JSON.stringify(detail)
}

export async function chatCompletion({ messages, stream = false, temperature = 0.4 }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, stream, temperature }),
  })

  if (!res.ok) {
    let detail = res.statusText
    try {
      const data = await res.json()
      detail = data.error || detail
    } catch {
      /* ignore */
    }
    throw new Error(apiErrorMessage(detail, res.status))
  }

  if (stream) return res
  return res.json()
}

export function truncateContext(text, max = MAX_CONTEXT) {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.slice(0, max)}\n\n[…truncated for length…]`
}

export async function summarizeLesson({ title, body }) {
  const data = await chatCompletion({
    messages: [
      {
        role: 'system',
        content:
          'You write concise executive summaries of technical course lessons. Use short paragraphs and 4–6 bullet key takeaways. No preamble.',
      },
      {
        role: 'user',
        content: `Summarize this lesson titled "${title}":\n\n${truncateContext(body)}`,
      },
    ],
    temperature: 0.3,
  })
  return data.choices?.[0]?.message?.content?.trim() || ''
}

export async function* streamChat({ messages }) {
  const res = await chatCompletion({ messages, stream: true })
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n')
    buffer = parts.pop() || ''

    for (const line of parts) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const payload = trimmed.slice(5).trim()
      if (payload === '[DONE]') return
      try {
        const json = JSON.parse(payload)
        const delta = json.choices?.[0]?.delta?.content
        if (delta) yield delta
      } catch {
        /* ignore partial JSON */
      }
    }
  }
}

export function getCachedSummary(slug) {
  try {
    return localStorage.getItem(`summary:${slug}`) || ''
  } catch {
    return ''
  }
}

export function setCachedSummary(slug, text) {
  try {
    localStorage.setItem(`summary:${slug}`, text)
  } catch {
    /* ignore */
  }
}
