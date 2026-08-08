import React from 'react'
import { Download, Copy, Printer, FileCode, Check } from 'lucide-react'

export default function ExportToolbar({ onCopy, onDownloadMarkdown, onDownloadText, onPrint, copied }) {
  return (
    <div className="preview-toolbar">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Live Document Preview</h3>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={onCopy}>
          {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Text'}</span>
        </button>

        <button className="btn btn-secondary" onClick={onDownloadMarkdown}>
          <FileCode size={16} />
          <span>Download .md</span>
        </button>

        <button className="btn btn-secondary" onClick={onDownloadText}>
          <Download size={16} />
          <span>Download .txt</span>
        </button>

        <button className="btn btn-primary" onClick={onPrint}>
          <Printer size={16} />
          <span>Print / PDF</span>
        </button>
      </div>
    </div>
  )
}
