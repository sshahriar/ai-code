/**
 * Parse WEBVTT content into plain transcript text.
 */
export function parseVtt(vttText) {
  const lines = vttText.replace(/^\uFEFF/, '').split(/\r?\n/)
  const cues = []
  let i = 0

  if (lines[0]?.trim().toUpperCase().startsWith('WEBVTT')) i = 1

  while (i < lines.length) {
    const line = lines[i].trim()
    i += 1
    if (!line) continue
    if (/^\d+$/.test(line)) continue
    if (line.includes('-->')) {
      const textLines = []
      while (i < lines.length && lines[i].trim()) {
        textLines.push(lines[i].trim())
        i += 1
      }
      const text = textLines
        .join(' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      if (text) cues.push(text)
      continue
    }
  }

  return cues.join(' ')
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function padId(n) {
  return String(n).padStart(2, '0')
}
