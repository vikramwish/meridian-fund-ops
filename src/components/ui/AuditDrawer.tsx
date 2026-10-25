import React from 'react'
import { X, ShieldCheck, FileText, Hash, CheckCircle2, History } from 'lucide-react'

interface AuditDrawerProps {
  isOpen: boolean
  metricName: string
  details: string
  onClose: () => void
}

export const AuditDrawer: React.FC<AuditDrawerProps> = ({
  isOpen,
  metricName,
  details,
  onClose
}) => {
  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderLeft: '1px solid var(--border-subtle)',
          padding: '2rem 1.75rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} style={{ color: '#34D399' }} />
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#34D399', textTransform: 'uppercase', fontWeight: 600 }}>
              Immutable Audit Provenance
            </span>
          </div>
          <button className="btn btn-ghost" style={{ padding: '0.35rem' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }} className="font-mono">
            Audited Financial Item
          </span>
          <h3 className="font-display" style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {metricName}
          </h3>
        </div>

        <div style={{ background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }} className="font-mono">
            Recorded Provenance & Trail
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            {details}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Audited Fund</span>
            <span className="font-mono" style={{ color: 'var(--text-main)' }}>Meridian Horizon IV LP</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Accounting Standard</span>
            <span className="font-mono" style={{ color: 'var(--text-main)' }}>US GAAP (ASC 946)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Integrity Verification</span>
            <span className="pill pill-emerald">Zero Variance (Clean)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Authorized Sign-off</span>
            <span className="font-mono" style={{ color: '#34D399' }}>Marcus Vance, CPA (Controller)</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid var(--emerald-border)', borderRadius: '6px', padding: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34D399', fontSize: '0.72rem', textTransform: 'uppercase' }} className="font-mono">
            <Hash size={13} /> Cryptographic Proof Hash
          </div>
          <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem', wordBreak: 'break-all' }}>
            sha256:8f4c2b9a718d0932e185c7d0b301b44d7e29aa3182fc600c329df02a772c
          </div>
        </div>
      </div>
    </div>
  )
}
