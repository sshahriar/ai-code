import React from 'react'

export default function NDAPreview({ formData }) {
  const {
    purpose,
    effectiveDate,
    mndaTerm,
    confidentialityTerm,
    governingLaw,
    jurisdiction,
    modifications,
    party1,
    party2
  } = formData

  return (
    <div className="preview-document">
      {/* Cover Page */}
      <div className="doc-header">
        <h1 className="doc-title">Mutual Non-Disclosure Agreement</h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
          Common Paper Mutual NDA Version 1.0 (Cover Page)
        </p>
      </div>

      <p style={{ margin: '1rem 0' }}>
        This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("<strong>Cover Page</strong>") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("<strong>Standard Terms</strong>") identical to those posted at <a href="https://commonpaper.com/standards/mutual-nda/1.0" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)' }}>commonpaper.com/standards/mutual-nda/1.0</a>. Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.
      </p>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>Purpose</h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.25rem' }}>
          How Confidential Information may be used
        </p>
        <div className="doc-highlight">
          {purpose || "[Evaluating whether to enter into a business relationship with the other party.]"}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>Effective Date</h3>
        <div className="doc-highlight">
          {effectiveDate || "[Effective Date]"}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>MNDA Term</h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.25rem' }}>
          The length of this MNDA
        </p>
        <div className="doc-highlight">
          Expires {mndaTerm || "1 year(s)"} from Effective Date.
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>Term of Confidentiality</h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.25rem' }}>
          How long Confidential Information is protected
        </p>
        <div className="doc-highlight">
          {confidentialityTerm || "1 year(s) from Effective Date"}, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>Governing Law & Jurisdiction</h3>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Governing Law:</strong> <span className="doc-highlight">{governingLaw || "[Fill in state]"}</span>
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Jurisdiction:</strong> <span className="doc-highlight">{jurisdiction || "[Fill in city or county and state]"}</span>
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--document-header)' }}>MNDA Modifications</h3>
        <div className="doc-highlight">
          {modifications || "None"}
        </div>
      </div>

      <p style={{ fontWeight: 600, margin: '1rem 0 0.5rem 0' }}>
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
      </p>

      {/* Signatures Table */}
      <table className="doc-table">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>FIELD</th>
            <th style={{ width: '37.5%' }}>PARTY 1 (Disclosing Party)</th>
            <th style={{ width: '37.5%' }}>PARTY 2 (Receiving Party)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Signature</strong></td>
            <td>___________________________</td>
            <td>___________________________</td>
          </tr>
          <tr>
            <td><strong>Print Name</strong></td>
            <td className="doc-highlight">{party1.printName || "[Print Name]"}</td>
            <td className="doc-highlight">{party2.printName || "[Print Name]"}</td>
          </tr>
          <tr>
            <td><strong>Title</strong></td>
            <td className="doc-highlight">{party1.title || "[Title]"}</td>
            <td className="doc-highlight">{party2.title || "[Title]"}</td>
          </tr>
          <tr>
            <td><strong>Company</strong></td>
            <td className="doc-highlight">{party1.company || "[Company]"}</td>
            <td className="doc-highlight">{party2.company || "[Company]"}</td>
          </tr>
          <tr>
            <td><strong>Notice Address</strong></td>
            <td className="doc-highlight">{party1.address || "[Address / Email]"}</td>
            <td className="doc-highlight">{party2.address || "[Address / Email]"}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>{effectiveDate || "___________________________"}</td>
            <td>{effectiveDate || "___________________________"}</td>
          </tr>
        </tbody>
      </table>

      {/* Standard Terms Section */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--document-border)' }}>
        <h2 className="doc-section-title">Standard Terms (Version 1.0)</h2>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>1. Introduction.</strong> This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page) ("MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the Purpose <strong>({purpose || "Evaluating business relationship"})</strong> which (1) the Disclosing Party identifies to the receiving party ("Receiving Party") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("Confidential Information").
        </p>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>2. Use and Protection of Confidential Information.</strong> The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party’s prior written approval; and (c) protect Confidential Information using at least a reasonable standard of care.
        </p>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>3. Exceptions.</strong> The Receiving Party’s obligations do not apply to information that is or becomes publicly available through no fault of the Receiving Party, or was rightfully known prior to disclosure.
        </p>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>4. Disclosures Required by Law.</strong> The Receiving Party may disclose Confidential Information to the extent required by law or court order, provided advance notice is given to the Disclosing Party.
        </p>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>5. Term and Termination.</strong> This MNDA commences on <strong>{effectiveDate || "the Effective Date"}</strong> and expires at the end of the MNDA Term (<strong>{mndaTerm || "1 year"}</strong>). Confidentiality obligations survive for <strong>{confidentialityTerm || "1 year from Effective Date"}</strong>.
        </p>

        <p style={{ margin: '0.75rem 0' }}>
          <strong>6. Governing Law and Jurisdiction.</strong> This MNDA is governed by the laws of the State of <strong>{governingLaw || "Delaware"}</strong>, with jurisdiction in <strong>{jurisdiction || "courts in New Castle, DE"}</strong>.
        </p>

        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2rem', fontStyle: 'italic' }}>
          Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0.
        </p>
      </div>
    </div>
  )
}
