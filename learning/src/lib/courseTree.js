export function flattenLessons(manifest) {
  return manifest?.lessons || []
}

export function findLesson(manifest, slug) {
  return flattenLessons(manifest).find((l) => l.slug === slug) || null
}

export function getAdjacentLessons(manifest, slug) {
  const lessons = flattenLessons(manifest)
  const index = lessons.findIndex((l) => l.slug === slug)
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
    index,
    total: lessons.length,
  }
}

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('lesson-progress') || '{}')
  } catch {
    return {}
  }
}

export function markLessonComplete(slug) {
  const progress = getProgress()
  progress[slug] = true
  localStorage.setItem('lesson-progress', JSON.stringify(progress))
  return progress
}

export function getExpandedState() {
  try {
    return JSON.parse(localStorage.getItem('sidebar-expanded') || '{}')
  } catch {
    return {}
  }
}

export function setExpandedState(state) {
  localStorage.setItem('sidebar-expanded', JSON.stringify(state))
}

export function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
