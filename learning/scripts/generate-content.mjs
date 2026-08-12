/**
 * Enhance lesson markdown with OpenRouter (optional polish pass).
 * Usage:
 *   node scripts/generate-content.mjs              # all lessons missing AI stamp
 *   node scripts/generate-content.mjs --all         # regenerate all
 *   node scripts/generate-content.mjs --slug 01-... # one lesson
 *   node scripts/generate-content.mjs --limit 3
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
config({ path: path.join(root, '.env.local') })
config({ path: path.join(root, '.env') })

const contentDir = path.join(root, 'content')
const lessonsDir = path.join(contentDir, 'lessons')
const transcriptsDir = path.join(contentDir, 'transcripts')
const manifestPath = path.join(contentDir, 'manifest.json')

const args = process.argv.slice(2)
const forceAll = args.includes('--all')
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity
const slugIdx = args.indexOf('--slug')
const onlySlug = slugIdx >= 0 ? args[slugIdx + 1] : null

const apiKey = process.env.OPENROUTER_API_KEY
const model = process.env.OPENROUTER_GEN_MODEL || process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'

if (!apiKey) {
  console.error('Missing OPENROUTER_API_KEY in .env.local')
  process.exit(1)
}

if (!fs.existsSync(manifestPath)) {
  console.error('Run npm run build:content first')
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

function hasAiStamp(md) {
  return md.includes('<!-- ai-generated:true -->')
}

async function enhanceLesson(lesson) {
  const transcriptPath = path.join(root, lesson.transcriptPath)
  const lessonPath = path.join(lessonsDir, `${lesson.slug}.md`)
  const transcript = fs.readFileSync(transcriptPath, 'utf8')
  const existing = fs.existsSync(lessonPath) ? fs.readFileSync(lessonPath, 'utf8') : ''

  if (!forceAll && !onlySlug && hasAiStamp(existing)) {
    return { skipped: true }
  }

  const system = `You are a technical course documentation writer. Turn spoken lesson transcripts into clear docs-style markdown similar to react.dev.
Rules:
- Stay faithful to the transcript; do not invent tools, APIs, or steps not mentioned
- Use this structure with ## / ### headings:
  # Title
  ## Overview
  ## You will learn (bullets)
  ## Key concepts (with ### subsections)
  ## Walkthrough
  ## Practical tips
  ## Common pitfalls
  ## Summary
- Output markdown only, no code fences around the whole document`

  const user = `Course lesson: ${lesson.title}
Week: ${lesson.weekTitle || ''}
Day: ${lesson.dayTitle || ''}

Transcript:
${transcript.slice(0, 24000)}`

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'AI Coder Learning Content Gen',
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenRouter ${res.status}: ${text}`)
  }

  const data = await res.json()
  let md = data.choices?.[0]?.message?.content?.trim() || ''
  md = md.replace(/^```markdown\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '')
  if (!md.startsWith('#')) {
    md = `# ${lesson.title}\n\n${md}`
  }
  md = `<!-- ai-generated:true -->\n${md}\n`
  fs.writeFileSync(lessonPath, md, 'utf8')
  return { skipped: false }
}

async function main() {
  let lessons = manifest.lessons
  if (onlySlug) lessons = lessons.filter((l) => l.slug === onlySlug)
  lessons = lessons.slice(0, Number.isFinite(limit) ? limit : lessons.length)

  console.log(`Enhancing ${lessons.length} lesson(s) with ${model}…`)
  let done = 0
  let skipped = 0

  for (const lesson of lessons) {
    process.stdout.write(`- ${lesson.slug} … `)
    try {
      const result = await enhanceLesson(lesson)
      if (result.skipped) {
        skipped += 1
        console.log('skipped')
      } else {
        done += 1
        console.log('ok')
      }
    } catch (err) {
      console.log(`FAIL: ${err.message}`)
    }
  }

  console.log(`Finished. Generated: ${done}, skipped: ${skipped}`)
}

main()
