/**
 * Rewrite lesson markdown from transcripts with OpenRouter (Grok 4.5).
 * Extracts topics and writes docs-style pages — does NOT paste raw subtitles.
 *
 * Usage:
 *   node scripts/generate-content.mjs --all
 *   node scripts/generate-content.mjs --slug 01-welcome-...
 *   node scripts/generate-content.mjs --limit 5 --all
 *   node scripts/generate-content.mjs --concurrency 1 --all
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
const summariesDir = path.join(contentDir, 'summaries')
const manifestPath = path.join(contentDir, 'manifest.json')

const args = process.argv.slice(2)
const forceAll = args.includes('--all')
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity
const slugIdx = args.indexOf('--slug')
const onlySlug = slugIdx >= 0 ? args[slugIdx + 1] : null
const concurrencyIdx = args.indexOf('--concurrency')
const concurrency = Math.max(1, Number(concurrencyIdx >= 0 ? args[concurrencyIdx + 1] : 1) || 1)

const apiKey = process.env.OPENROUTER_API_KEY
const model = process.env.OPENROUTER_GEN_MODEL || 'x-ai/grok-4.5'
const MIN_LESSON_CHARS = 800

if (!apiKey) {
  console.error('Missing OPENROUTER_API_KEY in .env.local')
  process.exit(1)
}

if (!fs.existsSync(manifestPath)) {
  console.error('Run npm run build:content first')
  process.exit(1)
}

fs.mkdirSync(lessonsDir, { recursive: true })
fs.mkdirSync(summariesDir, { recursive: true })

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

function hasAiStamp(md) {
  return md.includes('<!-- ai-generated:true -->') && md.includes('## Topics')
}

const LESSON_SYSTEM = `You write technical course docs (react.dev style) from spoken transcripts.

Rules:
- NEVER paste the transcript. No filler, no word-for-word narration.
- Extract main topics and rewrite in clear prose.
- Put the bulk of the page under ## Topics with 4-8 ### topic sections.
- Each ### topic must explain what / why / how in detail (still faithful to the source).
- Do not invent tools or steps not mentioned.
- Markdown only. No outer code fence.

Structure:
# {title}
> {Week} | {Day}

## Overview
## You will learn
## Topics
### ...
## Walkthrough
## Practical tips
## Common pitfalls
## Summary`

const SUMMARY_SYSTEM = `Write a concise lesson summary in markdown:
# Title
## At a glance
## Key takeaways
## You will learn
## Bottom line
Rewrite; never paste transcript.`

async function chat(messages, { temperature = 0.3, max_tokens = 3500 } = {}) {
  let lastError = null
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://sshahriar.github.io/ai-code/learning/',
          'X-Title': 'AI Coder Learning Content Gen',
        },
        body: JSON.stringify({
          model,
          temperature,
          max_tokens,
          messages,
          reasoning: { effort: 'low' },
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        const err = new Error(`OpenRouter ${res.status}: ${text}`)
        if (res.status === 429 || res.status >= 500) {
          lastError = err
          await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
          continue
        }
        throw err
      }

      const data = await res.json()
      let md = data.choices?.[0]?.message?.content?.trim() || ''
      md = md.replace(/^```markdown\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '')
      return md
    } catch (err) {
      lastError = err
      await new Promise((r) => setTimeout(r, 2500 * (attempt + 1)))
    }
  }
  throw lastError || new Error('chat failed')
}

function cleanLessonMd(md, title) {
  if (!md.startsWith('#')) md = `# ${title}\n\n${md}`
  return `<!-- ai-generated:true -->\n<!-- model:${model} -->\n${md.trim()}\n`
}

async function enhanceLesson(lesson, { retries = 2 } = {}) {
  const transcriptPath = path.join(root, lesson.transcriptPath)
  const lessonPath = path.join(lessonsDir, `${lesson.slug}.md`)
  const summaryPath = path.join(summariesDir, `${lesson.slug}.md`)
  const transcript = fs.readFileSync(transcriptPath, 'utf8')
  const existing = fs.existsSync(lessonPath) ? fs.readFileSync(lessonPath, 'utf8') : ''

  if (!forceAll && !onlySlug && hasAiStamp(existing) && existing.length >= MIN_LESSON_CHARS) {
    return { skipped: true }
  }

  const user = `Lesson: ${lesson.title}
${lesson.weekTitle || ''} | ${lesson.dayTitle || ''}

SOURCE TRANSCRIPT (rewrite into topic-wise docs; do not paste):
${transcript.slice(0, 12000)}`

  let lessonMd = ''
  let lastError = null
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      lessonMd = await chat(
        [
          { role: 'system', content: LESSON_SYSTEM },
          { role: 'user', content: user },
        ],
        { temperature: 0.3, max_tokens: 4000 },
      )
      if (lessonMd.length >= MIN_LESSON_CHARS && /##\s+Topics/i.test(lessonMd)) break
      lastError = new Error(`Output too short or missing Topics (${lessonMd.length} chars)`)
    } catch (err) {
      lastError = err
    }
  }

  if (!lessonMd || lessonMd.length < MIN_LESSON_CHARS) {
    throw lastError || new Error('Empty lesson output')
  }

  fs.writeFileSync(lessonPath, cleanLessonMd(lessonMd, lesson.title), 'utf8')

  try {
    const summaryMd = await chat(
      [
        { role: 'system', content: SUMMARY_SYSTEM },
        {
          role: 'user',
          content: `Summarize "${lesson.title}" from this docs page:\n\n${lessonMd.slice(0, 7000)}`,
        },
      ],
      { temperature: 0.25, max_tokens: 1000 },
    )
    const summaryOut = summaryMd.startsWith('#') ? summaryMd : `# ${lesson.title}\n\n${summaryMd}`
    if (summaryOut.length > 200) {
      fs.writeFileSync(summaryPath, `${summaryOut.trim()}\n`, 'utf8')
    }
  } catch {
    /* summary optional */
  }

  return { skipped: false, chars: lessonMd.length }
}

async function mapPool(items, size, fn) {
  const results = []
  let index = 0

  async function worker() {
    while (index < items.length) {
      const current = index
      index += 1
      results[current] = await fn(items[current], current)
    }
  }

  await Promise.all(Array.from({ length: Math.min(size, items.length) }, () => worker()))
  return results
}

async function main() {
  let lessons = manifest.lessons
  if (onlySlug) lessons = lessons.filter((l) => l.slug === onlySlug)
  lessons = lessons.slice(0, Number.isFinite(limit) ? limit : lessons.length)

  console.log(`Rewriting ${lessons.length} lesson(s) with ${model} (concurrency=${concurrency})…`)
  let done = 0
  let skipped = 0
  let failed = 0

  await mapPool(lessons, concurrency, async (lesson) => {
    process.stdout.write(`- ${lesson.slug} … `)
    try {
      const result = await enhanceLesson(lesson)
      if (result.skipped) {
        skipped += 1
        console.log('skipped')
      } else {
        done += 1
        console.log(`ok (${result.chars} chars)`)
        await new Promise((r) => setTimeout(r, 1500))
      }
    } catch (err) {
      failed += 1
      console.log(`FAIL: ${err.message}`)
      await new Promise((r) => setTimeout(r, 3000))
    }
  })

  console.log(`Finished. Generated: ${done}, skipped: ${skipped}, failed: ${failed}`)
  if (failed > 0) process.exitCode = 1
}

main()
