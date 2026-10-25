import React, { useState } from 'react'
import { LPATerms } from '../../types/fund'
import { FileText, ShieldCheck, CheckCircle2, ChevronRight, Layers, Award, ArrowUpRight } from 'lucide-react'

interface FrameSetupProps {
  terms: LPATerms
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameSetup: React.FC<FrameSetupProps> = ({ terms, onInspectProvenance }) => {
  const [selectedEntity, setSelectedEntity] = useState(terms.entities[0].id)
  const [activeTab, setActiveTab] = useState<'entities' | 'waterfall' | 'sideletters'>('entities')

  const formatUSD = (val: number) => `$${(val / 1_000_000).toFixed(1)}M`

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-emerald">Stage 01 · Legal Ingestion</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>LPA_SEC_2023_V4.PDF</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Fund Governance, Entity Map & Structured Rules
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Extracted from the executed Limited Partnership Agreement, 4 Side Letters, and Management Advisory Contracts.
          </p>
        </div>

        {/* Dual Authorization Pill */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.625rem 0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--amber-base)' }}>● Drafted:</span>
            <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{terms.draftedBy}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
            <ShieldCheck size={14} style={{ color: '#34D399' }} />
            <span style={{ color: '#34D399', fontWeight: 500 }}>Approved & Locked:</span>
            <span className="font-mono" style={{ color: 'var(--text-main)' }}>{terms.approvedBy} ({terms.approvalDate})</span>
          </div>
        </div>
      </div>

      {/* Key Highlights Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
        <div 
          style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
          onClick={() => onInspectProvenance('Total Commitments', 'Parsed from LPA Section 2.1 Schedule A')}
        >
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Total Fund Capital</div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {formatUSD(terms.totalCommitments)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle2 size={12} /> 4 Parallel Vehicles
          </div>
        </div>

        <div 
          style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
          onClick={() => onInspectProvenance('Management Fee Base', 'LPA Section 7.1: 2.0% per annum on Committed Capital during Investment Period')}
        >
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Management Fee</div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {terms.managementFeePct.toFixed(1)}% p.a.
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            On Committed Capital
          </div>
        </div>

        <div 
          style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
          onClick={() => onInspectProvenance('Hurdle & Carry', 'LPA Section 8.2: 8.0% Preferred Return hurdle followed by 50% GP catch-up to 20% carry')}
        >
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Hurdle & Carry</div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {terms.preferredReturnHurdlePct.toFixed(1)}% / {terms.gpCarryPct.toFixed(0)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--amber-base)', marginTop: '0.25rem' }}>
            European Whole-Fund
          </div>
        </div>

        <div 
          style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
          onClick={() => onInspectProvenance('Side Letters', '3 Institutional side letters with negotiated management fee offsets and MFN clauses')}
        >
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Side Letter Rules</div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {terms.sideLetters.length} Enforced
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7DD3FC', marginTop: '0.25rem' }}>
            CalPERS · ADIA · OTPP
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
        <button 
          className={`btn ${activeTab === 'entities' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === 'entities' ? '2px solid #10B981' : 'none' }}
          onClick={() => setActiveTab('entities')}
        >
          <Layers size={14} /> Multi-Entity Structure ({terms.entities.length})
        </button>
        <button 
          className={`btn ${activeTab === 'waterfall' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === 'waterfall' ? '2px solid #10B981' : 'none' }}
          onClick={() => setActiveTab('waterfall')}
        >
          <Award size={14} /> Waterfall Tiers & Catchup Rules
        </button>
        <button 
          className={`btn ${activeTab === 'sideletters' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === 'sideletters' ? '2px solid #10B981' : 'none' }}
          onClick={() => setActiveTab('sideletters')}
        >
          <FileText size={14} /> Side Letter Overrides ({terms.sideLetters.length})
        </button>
      </div>

      {/* Tab 1: Entities */}
      {activeTab === 'entities' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {terms.entities.map(entity => (
              <div
                key={entity.id}
                onClick={() => setSelectedEntity(entity.id)}
                style={{
                  background: selectedEntity === entity.id ? 'var(--bg-surface-subtle)' : 'var(--bg-surface-elevated)',
                  border: `1px solid ${selectedEntity === entity.id ? 'var(--emerald-border)' : 'var(--border-subtle)'}`,
                  borderRadius: '6px',
                  padding: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{entity.name}</span>
                  <span className={`pill ${entity.entityType === 'master' ? 'pill-emerald' : entity.entityType === 'feeder' ? 'pill-sky' : 'pill-ghost'}`}>
                    {entity.entityType}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{entity.jurisdiction}</span>
                  <span className="font-mono">{formatUSD(entity.commitment)} ({entity.ownershipPct.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Entity Detail Inspector */}
          {(() => {
            const ent = terms.entities.find(e => e.id === selectedEntity) || terms.entities[0]
            return (
              <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-display" style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>{ent.name}</h3>
                  <span className="pill pill-emerald">Active In Period</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem', fontSize: '0.8125rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Tax Classification</span>
                    <span className="font-mono" style={{ color: 'var(--text-main)' }}>{ent.taxStatus}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Legal Jurisdiction</span>
                    <span className="font-mono" style={{ color: 'var(--text-main)' }}>{ent.jurisdiction}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Committed Capital</span>
                    <span className="font-mono" style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600 }}>{formatUSD(ent.commitment)}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Pro-Rata Allocation Weight</span>
                    <span className="font-mono" style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600 }}>{ent.ownershipPct}%</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: 'var(--bg-obsidian)', borderRadius: '6px', border: '1px dashed var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.375rem' }} className="font-mono">
                    System of Record Integration Link
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Entity mapped to FIS Investran Ledger ID: <code className="font-mono" style={{ color: '#38BDF8' }}>INV-ENT-9024-DEL</code>. Balances reconciled automatically during Stage 05.
                  </p>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Tab 2: Waterfall Tiers */}
      {activeTab === 'waterfall' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="pill pill-emerald">Tier 1 · Capital Return</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>100% to LP</span>
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.75rem' }}>Return of Contributed Capital</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              All distributable proceeds return 100% of cumulative invested capital and fund expenses until unreturned capital reaches $0.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="pill pill-emerald">Tier 2 · Preferred Hurdle</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>8.0% p.a.</span>
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.75rem' }}>Preferred Return Hurdle</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              100% to LPs until LPs achieve an 8.0% internal rate of return compounded annually on drawn capital.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="pill pill-amber">Tier 3 · GP Catchup</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--amber-base)' }}>50% Catch-Up</span>
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.75rem' }}>Carried Interest Catch-Up</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              50% to GP and 50% to LPs until GP has received 20% of aggregate profits across Tier 2 and Tier 3.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="pill pill-sky">Tier 4 · Final Split</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: '#7DD3FC' }}>80% / 20%</span>
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.75rem' }}>Residual Profit Sharing</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Thereafter, all remaining proceeds are split 80% pro-rata to Limited Partners and 20% to the General Partner vehicle.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Side Letters */}
      {activeTab === 'sideletters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {terms.sideLetters.map((sl, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{sl.investor}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="pill pill-sky">{sl.feeDiscountPct}% Management Fee Break</span>
                  <span className="pill pill-ghost">{formatUSD(sl.commitment)} Committed</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>Special Governance:</strong> {sl.specialTerms}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
