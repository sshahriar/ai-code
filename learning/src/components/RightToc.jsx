import { useEffect, useState } from 'react'

export default function RightToc({ headings, activeId }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(headings.length > 0)
  }, [headings])

  if (!visible) return null

  function onClick(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <aside className="right-toc">
      <p className="toc-label">On this page</p>
      <nav aria-label="On this page">
        <ul>
          {headings.map((h) => (
            <li key={h.id} className={`level-${h.level} ${activeId === h.id ? 'active' : ''}`}>
              <a href={`#${h.id}`} onClick={(e) => onClick(e, h.id)}>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
