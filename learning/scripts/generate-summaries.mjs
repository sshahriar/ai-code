/**
 * Optional OpenRouter polish for static summaries.
 * Usage:
 *   node scripts/generate-summaries.mjs
 *   node scripts/generate-summaries.mjs --limit 3
 *   node scripts/generate-summaries.mjs --slug 01-welcome-...
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
const summariesDir = path.join(contentDir, 'summaries')
const manifestPath = path.join(contentDir, 'manifest.json')

const args = process.argv.slice(2)
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

fs.mkdirSync(summariesDir, { recursive: true })
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

async function polishSummary(lesson) {
  const lessonPath = path.join(root, lesson.contentPath)
  const lessonMd = fs.readFileSync(lessonPath, 'utf8')

  const system = `You write concise course lesson summaries for a docs site.
Output markdown only with this structure:
# Title
## At a glance
## Key takeaways (5-7 bullets)
## You will learn (3-5 bullets)
## Bottom line
Stay faithful to the source. No invented tools or steps.`

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'AI Coder Learning Summaries',
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: `Create a summary for "${lesson.title}" from this lesson markdown:\n\n${lessonMd.slice(0, 16000)}`,
        },
      ],
    }),
  })

  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)
  }

  const data = await res.json()
  let md = data.choices?.[0]?.message?.content?.trim() || ''
  md = md.replace(/^```markdown\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '')
  if (!md.startsWith('#')) md = `# ${lesson.title}\n\n${md}`
  fs.writeFileSync(path.join(summariesDir, `${lesson.slug}.md`), `${md}\n`, 'utf8')
}

async function main() {
  let lessons = manifest.lessons
  if (onlySlug) lessons = lessons.filter((l) => l.slug === onlySlug)
  lessons = lessons.slice(0, Number.isFinite(limit) ? limit : lessons.length)

  console.log(`Polishing ${lessons.length} summary file(s) with ${model}…`)
  for (const lesson of lessons) {
    process.stdout.write(`- ${lesson.slug} … `)
    try {
      await polishSummary(lesson)
      console.log('ok')
    } catch (err) {
      console.log(`FAIL: ${err.message}`)
    }
  }
}

main()
