import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseVtt, slugify, padId } from './lib/parseVtt.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const assetsDir = path.join(root, 'assets')
const contentDir = path.join(root, 'content')
const lessonsDir = path.join(contentDir, 'lessons')
const transcriptsDir = path.join(contentDir, 'transcripts')

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function toParagraphs(sentences, size = 3) {
  const paragraphs = []
  for (let i = 0; i < sentences.length; i += size) {
    paragraphs.push(sentences.slice(i, i + size).join(' '))
  }
  return paragraphs
}

function buildLessonMarkdown({ title, dayLabel, weekTitle, transcript }) {
  const sentences = splitSentences(transcript)
  const overview = toParagraphs(sentences.slice(0, Math.min(6, sentences.length)), 2)
  const bodySentences = sentences.slice(Math.min(6, sentences.length), Math.max(sentences.length - 4, 6))
  const summarySentences = sentences.slice(Math.max(sentences.length - 4, 0))

  const bodyParagraphs = toParagraphs(bodySentences, 3)
  const chunkSize = Math.max(2, Math.ceil(bodyParagraphs.length / 3))
  const sections = []
  for (let i = 0; i < bodyParagraphs.length; i += chunkSize) {
    sections.push(bodyParagraphs.slice(i, i + chunkSize))
  }

  const learnBullets = [
    `Understand the main ideas covered in **${title}**`,
    `Follow the practical walkthrough from ${weekTitle}, ${dayLabel}`,
    'Apply the techniques discussed in your own projects',
  ]

  const tips = bodyParagraphs
    .filter((p) => /\b(tip|important|remember|make sure|don't|do not|always|never|best)\b/i.test(p))
    .slice(0, 4)

  let md = `# ${title}\n\n`
  md += `> ${weekTitle} · ${dayLabel}\n\n`
  md += `## Overview\n\n`
  md += (overview.length ? overview : ['This lesson introduces key ideas from the course session.']).map((p) => `${p}\n`).join('\n')
  md += `\n## You will learn\n\n`
  md += learnBullets.map((b) => `- ${b}`).join('\n')
  md += `\n\n## Key concepts\n\n`

  if (sections.length === 0) {
    md += `### Core ideas\n\n${transcript.slice(0, 800)}\n\n`
  } else {
    sections.forEach((paras, idx) => {
      const label = ['Foundations', 'Deep dive', 'Putting it together'][idx] || `Part ${idx + 1}`
      md += `### ${label}\n\n`
      md += paras.map((p) => `${p}\n`).join('\n')
      md += '\n'
    })
  }

  md += `## Walkthrough\n\n`
  md += `This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.\n\n`
  if (bodyParagraphs[0]) {
    md += `${bodyParagraphs[0]}\n\n`
  }

  md += `## Practical tips\n\n`
  if (tips.length) {
    md += tips.map((t) => `- ${t}`).join('\n')
  } else {
    md += `- Pause and try the demonstrated steps in your own environment\n- Keep notes of commands, file names, and settings mentioned\n- Revisit earlier lessons if a concept feels unfamiliar\n`
  }

  md += `\n\n## Common pitfalls\n\n`
  md += `- Skipping setup steps called out early in the lesson\n- Copying outcomes without understanding the workflow behind them\n- Running ahead without verifying intermediate results\n\n`

  md += `## Summary\n\n`
  md += (summarySentences.length ? summarySentences : sentences.slice(0, 2)).join(' ')
  md += '\n'

  return md
}

function parseLessonFile(weekFolder, fileName) {
  const match = fileName.match(/^(\d+)\.\s+Day\s+(\d+)\s+-\s+(.+)\.vtt$/i)
  if (!match) return null
  const lessonNum = Number(match[1])
  const dayNum = Number(match[2])
  const title = match[3].replace(/_/g, "'").trim()
  const id = padId(lessonNum)
  const slug = `${id}-${slugify(title)}`
  return { lessonNum, dayNum, title, id, slug, fileName, weekFolder }
}

function main() {
  fs.mkdirSync(lessonsDir, { recursive: true })
  fs.mkdirSync(transcriptsDir, { recursive: true })

  const weekFolders = fs
    .readdirSync(assetsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const weeks = []
  const flatLessons = []

  for (const weekFolder of weekFolders) {
    const weekMatch = weekFolder.match(/Week\s+(\d+)/i)
    const weekNum = weekMatch ? Number(weekMatch[1]) : weeks.length + 1
    const weekId = `week-${weekNum}`
    const weekTitle = `Week ${weekNum}`
    const weekPath = path.join(assetsDir, weekFolder)

    const files = fs
      .readdirSync(weekPath)
      .filter((f) => f.toLowerCase().endsWith('.vtt'))
      .map((f) => parseLessonFile(weekFolder, f))
      .filter(Boolean)
      .sort((a, b) => a.lessonNum - b.lessonNum)

    const daysMap = new Map()

    for (const lesson of files) {
      const vttPath = path.join(weekPath, lesson.fileName)
      const vttText = fs.readFileSync(vttPath, 'utf8')
      const transcript = parseVtt(vttText)
      const relativeVtt = path.join('assets', weekFolder, lesson.fileName).replace(/\\/g, '/')

      fs.writeFileSync(path.join(transcriptsDir, `${lesson.slug}.txt`), transcript, 'utf8')

      const markdown = buildLessonMarkdown({
        title: lesson.title,
        dayLabel: `Day ${lesson.dayNum}`,
        weekTitle,
        transcript,
      })
      fs.writeFileSync(path.join(lessonsDir, `${lesson.slug}.md`), markdown, 'utf8')

      const dayId = `day-${lesson.dayNum}`
      if (!daysMap.has(dayId)) {
        daysMap.set(dayId, {
          id: dayId,
          title: `Day ${lesson.dayNum}`,
          dayNum: lesson.dayNum,
          lessons: [],
        })
      }

      const entry = {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        lessonNum: lesson.lessonNum,
        vttPath: relativeVtt,
        contentPath: `content/lessons/${lesson.slug}.md`,
        transcriptPath: `content/transcripts/${lesson.slug}.txt`,
      }
      daysMap.get(dayId).lessons.push(entry)
      flatLessons.push({
        ...entry,
        weekId,
        weekTitle,
        dayId,
        dayTitle: `Day ${lesson.dayNum}`,
      })
    }

    const days = [...daysMap.values()].sort((a, b) => a.dayNum - b.dayNum)
    weeks.push({ id: weekId, title: weekTitle, weekNum, days })
  }

  const manifest = {
    courseTitle: 'AI Coder — Agentic Engineering',
    generatedAt: new Date().toISOString(),
    lessonCount: flatLessons.length,
    weeks,
    lessons: flatLessons,
  }

  fs.writeFileSync(path.join(contentDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
  console.log(`Built ${flatLessons.length} lessons across ${weeks.length} weeks → content/`)
}

main()
