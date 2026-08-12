import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LessonPage from './components/LessonPage'
import manifest from '../content/manifest.json'

export default function App() {
  const firstSlug = manifest.lessons?.[0]?.slug

  if (!firstSlug) {
    return (
      <div className="boot-error">
        <h1>Content not built</h1>
        <p>No lessons found in content/manifest.json</p>
        <pre>npm run build:content</pre>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/learn/${firstSlug}`} replace />} />
      <Route path="/learn" element={<Layout manifest={manifest} />}>
        <Route index element={<Navigate to={`/learn/${firstSlug}`} replace />} />
        <Route path=":slug" element={<LessonPage manifest={manifest} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
