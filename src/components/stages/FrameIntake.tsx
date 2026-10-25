import React, { useState } from 'react'
import { PeriodInput } from '../../types/fund'
import { UploadCloud, CheckCircle2, AlertTriangle, FileText, ArrowRight, ShieldCheck, Database, RefreshCw } from 'lucide-react'

interface FrameIntakeProps {
  inputs: PeriodInput[]
  onUpdateInput: (id: string, updated: Partial<PeriodInput>) => void
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameIntake: React.FC<FrameIntakeProps> = ({ inputs, onUpdateInput, onInspectProvenance }) => {
  const [filter, setFilter] = useState<'all' | 'received' | 'missing'>('all')

  const total = inputs.length
  const received = inputs.filter(i => i.status === 'received').length
  const missing = inputs.filter(i => i.status === 'missing').length
  const blockingMissing = inputs.filter(i => i.status === 'missing' && i.isBlocking).length

  const handleSimulateReceive = (id: string) => {
    onUpdateInput(id, {
      status: 'received',
      receivedAt: new Date().toISOString(),
      fileSize: '3.6 MB',
      hash: 'sha256:4a89e...cd12'
    })
  }

  const filteredInputs = inputs.filter(item => {
    if (filter === 'received') return item.status === 'received'
    if (filter === 'missing') return item.status === 'missing'
    return true
  })

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-emerald">Stage 02 · Period Inputs</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Q3 2026 CLOSE INTAKE</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Day-1 Close Radar & Source Document Intake
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Every missing input is flagged on day one, not discovered at quarter-end tie-out.
          </p>
        </div>

        {/* Status Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.625rem 1rem' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Ingestion Status</div>
            <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {received} / {total} Received
            </div>
          </div>
          {blockingMissing > 0 ? (
            <span className="pill pill-amber" style={{ height: 'fit-content' }}>
              <AlertTriangle size={12} /> {blockingMissing} Blocking
            </span>
          ) : (
            <span className="pill pill-emerald" style={{ height: 'fit-content' }}>
              <CheckCircle2 size={12} /> Ready for Decisions
            </span>
          )}
        </div>
      </div>

      {/* Filter and stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', margin: '1.25rem 0' }}>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <button
            className={`btn ${filter === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setFilter('all')}
          >
            All Inputs ({total})
          </button>
          <button
            className={`btn ${filter === 'received' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setFilter('received')}
          >
            Received ({received})
          </button>
          <button
            className={`btn ${filter === 'missing' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            onClick={() => setFilter('missing')}
          >
            Missing ({missing})
          </button>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={14} style={{ color: '#38BDF8' }} /> Auto-sync enabled via J.P. Morgan, FIS Investran & SFTP
        </div>
      </div>

      {/* Table of inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {filteredInputs.map(item => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: `1px solid ${item.status === 'missing' ? 'var(--amber-border)' : 'var(--border-subtle)'}`,
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              transition: 'border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
              <div 
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '6px', 
                  background: item.status === 'received' ? 'var(--emerald-subtle)' : 'var(--amber-subtle)',
                  border: `1px solid ${item.status === 'received' ? 'var(--emerald-border)' : 'var(--amber-border)'}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {item.status === 'received' ? (
                  <CheckCircle2 size={18} style={{ color: '#34D399' }} />
                ) : (
                  <AlertTriangle size={18} style={{ color: 'var(--amber-base)' }} />
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</span>
                  {item.isBlocking && (
                    <span className="pill pill-rose">Blocking Lock</span>
                  )}
                  <span className={`pill ${item.status === 'received' ? 'pill-emerald' : 'pill-amber'}`}>
                    {item.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Source: {item.source}</span>
                  {item.fileSize && <span>· Size: {item.fileSize}</span>}
                  {item.hash && (
                    <span 
                      className="font-mono" 
                      style={{ color: '#38BDF8', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => onInspectProvenance(item.name, `Cryptographic Hash: ${item.hash}. Ingested via verified API pipeline.`)}
                    >
                      {item.hash}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              {item.status === 'missing' ? (
                <button
                  className="btn btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  onClick={() => handleSimulateReceive(item.id)}
                >
                  <UploadCloud size={14} /> Ingest / Receive Document
                </button>
              ) : (
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
                  onClick={() => onInspectProvenance(item.name, `Document verified and parsed. Arrival timestamp: ${item.receivedAt}`)}
                >
                  <FileText size={14} /> View Provenance
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
