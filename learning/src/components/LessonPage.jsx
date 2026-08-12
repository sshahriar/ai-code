import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import LessonContent from './LessonContent'
import { findLesson } from '../lib/courseTree'

const lessonModules = import.meta.glob('/content/lessons/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
})

export default function LessonPage({ manifest }) {
  const { slug } = useParams()
  const { setHeadings, setActiveId, setLessonBody, onProgressChange } = useOutletContext()
  const lesson = findLesson(manifest, slug)
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setError('')
      setMarkdown('')
      if (!lesson) return
      const key = Object.keys(lessonModules).find((k) => k.endsWith(`${lesson.slug}.md`))
      if (!key) {
        setError('Lesson content file not found. Run npm run build:content')
        return
      }
      try {
        const md = await lessonModules[key]()
        if (!cancelled) {
          setMarkdown(md)
          setLessonBody(md)
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load lesson')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [lesson, setLessonBody])

  if (error) {
    return (
      <article className="lesson-article">
        <h1>Could not load lesson</h1>
        <p className="error-text">{error}</p>
      </article>
    )
  }

  return (
    <LessonContent
      manifest={manifest}
      lesson={lesson}
      markdown={markdown}
      onHeadingsChange={setHeadings}
      onActiveHeading={setActiveId}
      onProgressChange={onProgressChange}
    />
  )
}
