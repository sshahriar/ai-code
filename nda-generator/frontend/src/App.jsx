import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NDAForm from './components/NDAForm'
import NDAPreview from './components/NDAPreview'
import ExportToolbar from './components/ExportToolbar'

const initialData = {
  purpose: 'Evaluating whether to enter into a business relationship with the other party.',
  effectiveDate: new Date().toISOString().split('T')[0],
  mndaTerm: '1 year(s)',
  confidentialityTerm: '1 year(s) from Effective Date',
  governingLaw: 'Delaware',
  jurisdiction: 'courts located in New Castle, DE',
  modifications: 'None (Standard Common Paper terms apply without modification)',
  party1: {
    company: 'Acme Technologies Inc.',
    printName: 'Jane Doe',
    title: 'Chief Executive Officer',
    address: 'legal@acmetech.example.com'
  },
  party2: {
    company: 'Innovate Solutions LLC',
    printName: 'John Smith',
    title: 'Managing Director',
    address: 'notices@innovatesolutions.example.com'
  }
}

export default function App() {
  const [formData, setFormData] = useState(initialData)
  const [theme, setTheme] = useState('dark')
  const [viewMode, setViewMode] = useState('split') // 'split' | 'form' | 'preview'
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePartyChange = (partyKey, field, value) => {
    setFormData(prev => ({
      ...prev,
      [partyKey]: {
        ...prev[partyKey],
        [field]: value
      }
    }))
  }

  const handleLoadSample = () => {
    setFormData({
      purpose: 'Evaluating a potential strategic partnership, technology integration, and joint enterprise solution offering.',
      effectiveDate: '2026-08-08',
      mndaTerm: '2 year(s)',
      confidentialityTerm: '3 year(s) from Effective Date',
      governingLaw: 'California',
      jurisdiction: 'courts located in San Francisco County, CA',
      modifications: 'Section 6: Electronic copies confirmed stored in compliance with standard enterprise backup policies.',
      party1: {
        company: 'Vanguard Systems AI Inc.',
        printName: 'Sarah Jenkins',
        title: 'VP of Corporate Development',
        address: 'legal@vanguardsystems.ai'
      },
      party2: {
        company: 'NextGen Cloud Dynamics LLC',
        printName: 'Marcus Vance',
        title: 'Chief Legal Officer',
        address: 'notices@nextgencloud.io'
      }
    })
  }

  const generateMarkdownText = () => {
    return `# Mutual Non-Disclosure Agreement

## Cover Page

### Purpose
${formData.purpose}

### Effective Date
${formData.effectiveDate}

### MNDA Term
Expires ${formData.mndaTerm} from Effective Date.

### Term of Confidentiality
${formData.confidentialityTerm}, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.

### Governing Law & Jurisdiction
- **Governing Law:** ${formData.governingLaw}
- **Jurisdiction:** ${formData.jurisdiction}

### MNDA Modifications
${formData.modifications || "None"}

By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.

| FIELD | PARTY 1 (Disclosing Party) | PARTY 2 (Receiving Party) |
| :--- | :--- | :--- |
| **Print Name** | ${formData.party1.printName} | ${formData.party2.printName} |
| **Title** | ${formData.party1.title} | ${formData.party2.title} |
| **Company** | ${formData.party1.company} | ${formData.party2.company} |
| **Notice Address** | ${formData.party1.address} | ${formData.party2.address} |
| **Date** | ${formData.effectiveDate} | ${formData.effectiveDate} |

---

## Standard Terms (Version 1.0)
Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0.
`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownText()
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Mutual-NDA-${formData.party1.company.replace(/\s+/g, '_')}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadText = () => {
    const text = generateMarkdownText()
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Mutual-NDA-${formData.party1.company.replace(/\s+/g, '_')}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="app-container">
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLoadSample={handleLoadSample}
      />

      <main className={`main-content ${viewMode === 'form' ? 'form-only' : viewMode === 'preview' ? 'preview-only' : ''}`}>
        {(viewMode === 'split' || viewMode === 'form') && (
          <NDAForm 
            formData={formData}
            handleChange={handleChange}
            handlePartyChange={handlePartyChange}
          />
        )}

        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="preview-panel">
            <ExportToolbar 
              onCopy={handleCopy}
              onDownloadMarkdown={handleDownloadMarkdown}
              onDownloadText={handleDownloadText}
              onPrint={handlePrint}
              copied={copied}
            />
            <NDAPreview formData={formData} />
          </div>
        )}
      </main>

      {copied && (
        <div className="toast">
          ✓ Mutual NDA text copied to clipboard!
        </div>
      )}
    </div>
  )
}
