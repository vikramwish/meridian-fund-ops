import React, { useState } from 'react'
import { TieOutItem } from '../../types/fund'
import { evaluateTieOuts } from '../../engine/tieouts'
import { Lock, Unlock, CheckCircle2, AlertOctagon, HelpCircle, ArrowUpRight, History, ShieldAlert } from 'lucide-react'

interface FrameCloseProps {
  tieOuts: TieOutItem[]
  isPeriodLocked: boolean
  onTogglePeriodLock: () => void
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameClose: React.FC<FrameCloseProps> = ({
  tieOuts,
  isPeriodLocked,
  onTogglePeriodLock,
  onInspectProvenance
}) => {
  const [selectedModule, setSelectedModule] = useState<string>('all')

  const summary = evaluateTieOuts(tieOuts)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  const modules = ['all', 'cash', 'capital', 'investments', 'fees', 'nav', 'carry', 'valuation']

  const filtered = tieOuts.filter(t => {
    if (selectedModule === 'all') return true
    return t.module === selectedModule
  })

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-emerald">Stage 05 · Operations & Tie-Outs</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Q3 2026 GENERAL LEDGER LOCK</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Every blocking tie-out passes, or the period does not lock.
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Cash, capital activity, investments, fees, NAV and carry, each verified against source documents with previous values preserved.
          </p>
        </div>

        {/* Lock Status Pill / Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className={`btn ${isPeriodLocked ? 'btn-primary' : summary.canLockPeriod ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
            disabled={!summary.canLockPeriod && !isPeriodLocked}
            onClick={onTogglePeriodLock}
          >
            {isPeriodLocked ? (
              <>
                <Lock size={16} /> Period Locked & Released
              </>
            ) : (
              <>
                <Unlock size={16} /> Lock Q3 2026 Period
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tie-Out Summary Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Blocking Tie-Outs</span>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: summary.blockingFailures === 0 ? '#34D399' : '#FB7185', marginTop: '0.25rem' }}>
            {summary.passedCount} / {summary.totalItems} Clean
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {summary.blockingFailures === 0 ? '✓ All blocking conditions met' : `⚠️ ${summary.blockingFailures} blocking variance`}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Net Asset Value (NAV)</span>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            $544,650,500
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.25rem' }}>
            Recomputed & verified to penny
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>GP Carried Interest</span>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--amber-base)', marginTop: '0.25rem' }}>
            $18,420,000
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Superseded: <span className="font-mono" style={{ textDecoration: 'line-through' }}>$17,900,000</span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Integrity Lock Status</span>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: isPeriodLocked ? '#34D399' : 'var(--amber-base)', marginTop: '0.25rem' }}>
            {isPeriodLocked ? 'IMMUTABLE' : 'OPEN / READY'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {isPeriodLocked ? 'Approved by Marcus Vance, CPA' : 'Reviewer sign-off pending'}
          </div>
        </div>
      </div>

      {/* Module filter chips */}
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {modules.map(mod => (
          <button
            key={mod}
            className={`btn ${selectedModule === mod ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', textTransform: 'capitalize' }}
            onClick={() => setSelectedModule(mod)}
          >
            {mod === 'all' ? 'All Modules' : mod}
          </button>
        ))}
      </div>

      {/* Table of Tie-Out Items */}
      <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-obsidian)' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)' }} className="font-mono">MODULE & TIE-OUT ITEM</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'right' }} className="font-mono">GL SYSTEM VALUE</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'right' }} className="font-mono">VERIFIED COMPUTED</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'right' }} className="font-mono">VARIANCE</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'center' }} className="font-mono">CLASS</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'right' }} className="font-mono">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const hasVariance = Math.abs(item.variance) > 0.01
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                      Formula: {item.provenance.ruleFormula}
                    </div>
                    {item.provenance.supersededValue !== undefined && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--amber-base)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <History size={11} /> Previous value: <span style={{ textDecoration: 'line-through' }}>{formatCurrency(item.provenance.supersededValue)}</span> (superseded)
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(item.glSystemValue)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 600 }}>
                    {formatCurrency(item.verifiedComputedValue)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {hasVariance ? (
                      <span style={{ color: '#FB7185', fontWeight: 600 }}>{formatCurrency(item.variance)}</span>
                    ) : (
                      <span style={{ color: '#34D399' }}>$0.00</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span className={`pill ${item.isBlocking ? 'pill-emerald' : 'pill-ghost'}`}>
                      {item.isBlocking ? 'Blocking' : 'Advisory'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      onClick={() => onInspectProvenance(item.label, `Verified against: ${item.provenance.sourceDocs.join(', ')}. Approver: ${item.provenance.verifiedBy}`)}
                    >
                      Audit Trail
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
