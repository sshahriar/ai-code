import React from 'react'
import { FileText, Building2, Calendar, ShieldCheck, Scale } from 'lucide-react'

export default function NDAForm({ formData, handleChange, handlePartyChange }) {
  return (
    <div className="form-panel">
      {/* Section 1: Agreement Parameters */}
      <h2 className="section-title">
        <ShieldCheck size={18} color="var(--accent-primary)" />
        <span>1. Agreement Parameters</span>
      </h2>

      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Purpose of Disclosure</label>
          <textarea 
            className="form-textarea"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Evaluating whether to enter into a business relationship with the other party."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Effective Date</label>
          <input 
            type="date"
            className="form-input"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">MNDA Term Duration</label>
          <select 
            className="form-select"
            name="mndaTerm"
            value={formData.mndaTerm}
            onChange={handleChange}
          >
            <option value="1 year(s)">Expires 1 year from Effective Date</option>
            <option value="2 year(s)">Expires 2 years from Effective Date</option>
            <option value="3 year(s)">Expires 3 years from Effective Date</option>
            <option value="Continues until terminated">Continues until terminated</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Term of Confidentiality</label>
          <select 
            className="form-select"
            name="confidentialityTerm"
            value={formData.confidentialityTerm}
            onChange={handleChange}
          >
            <option value="1 year(s) from Effective Date">1 year from Effective Date</option>
            <option value="2 year(s) from Effective Date">2 years from Effective Date</option>
            <option value="3 year(s) from Effective Date">3 years from Effective Date</option>
            <option value="In perpetuity">In perpetuity</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Governing Law (State)</label>
          <input 
            type="text"
            className="form-input"
            name="governingLaw"
            value={formData.governingLaw}
            onChange={handleChange}
            placeholder="Delaware"
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Jurisdiction (Courts Location)</label>
          <input 
            type="text"
            className="form-input"
            name="jurisdiction"
            value={formData.jurisdiction}
            onChange={handleChange}
            placeholder="courts located in New Castle, DE"
          />
        </div>
      </div>

      {/* Section 2: Party 1 Details */}
      <h2 className="section-title">
        <Building2 size={18} color="var(--accent-primary)" />
        <span>2. Party 1 Details (Disclosing Party)</span>
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party1.company}
            onChange={(e) => handlePartyChange('party1', 'company', e.target.value)}
            placeholder="Acme Corp Inc."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Signer Print Name</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party1.printName}
            onChange={(e) => handlePartyChange('party1', 'printName', e.target.value)}
            placeholder="Jane Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Signer Title</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party1.title}
            onChange={(e) => handlePartyChange('party1', 'title', e.target.value)}
            placeholder="Chief Executive Officer"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notice Email / Address</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party1.address}
            onChange={(e) => handlePartyChange('party1', 'address', e.target.value)}
            placeholder="legal@acme.com"
          />
        </div>
      </div>

      {/* Section 3: Party 2 Details */}
      <h2 className="section-title">
        <Building2 size={18} color="#8b5cf6" />
        <span>3. Party 2 Details (Receiving Party)</span>
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party2.company}
            onChange={(e) => handlePartyChange('party2', 'company', e.target.value)}
            placeholder="InnovateTech LLC"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Signer Print Name</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party2.printName}
            onChange={(e) => handlePartyChange('party2', 'printName', e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Signer Title</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party2.title}
            onChange={(e) => handlePartyChange('party2', 'title', e.target.value)}
            placeholder="Managing Director"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notice Email / Address</label>
          <input 
            type="text"
            className="form-input"
            value={formData.party2.address}
            onChange={(e) => handlePartyChange('party2', 'address', e.target.value)}
            placeholder="contact@innovatetech.io"
          />
        </div>
      </div>

      {/* Section 4: MNDA Modifications */}
      <h2 className="section-title">
        <Scale size={18} color="var(--text-secondary)" />
        <span>4. MNDA Modifications</span>
      </h2>

      <div className="form-group full-width">
        <label className="form-label">Special Terms or Modifications (Optional)</label>
        <textarea 
          className="form-textarea"
          name="modifications"
          value={formData.modifications}
          onChange={handleChange}
          placeholder="None (Standard Common Paper terms apply without modification)"
        />
      </div>
    </div>
  )
}
