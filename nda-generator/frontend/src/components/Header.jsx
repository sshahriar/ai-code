import React from 'react'
import { FileText, Sun, Moon, Sparkles, Layout, Edit, Eye } from 'lucide-react'

export default function Header({ theme, toggleTheme, viewMode, setViewMode, onLoadSample }) {
  return (
    <header className="app-header">
      <div className="brand-container">
        <div className="brand-icon">
          <FileText size={20} />
        </div>
        <div>
          <h1 className="brand-title">Mutual NDA Creator</h1>
          <p className="brand-subtitle">Common Paper Prelegal Standard Template</p>
        </div>
      </div>

      <div className="header-actions">
        <button className="btn btn-secondary" onClick={onLoadSample} title="Load sample company data">
          <Sparkles size={16} color="var(--warning)" />
          <span>Load Sample Data</span>
        </button>

        <div className="view-tabs">
          <button 
            className={`view-tab ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
            title="Split View"
          >
            <Layout size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Split
          </button>
          <button 
            className={`view-tab ${viewMode === 'form' ? 'active' : ''}`}
            onClick={() => setViewMode('form')}
            title="Form Only"
          >
            <Edit size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Form
          </button>
          <button 
            className={`view-tab ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
            title="Preview Only"
          >
            <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Preview
          </button>
        </div>

        <button className="btn-icon" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
