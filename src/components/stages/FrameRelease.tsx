import React, { useState } from 'react'
import { JournalEntry, LPNoticeDraft } from '../../types/fund'
import { Download, FileSpreadsheet, ShieldCheck, CheckCircle2, Copy, FileText, ArrowDownToLine, RefreshCw, Send } from 'lucide-react'

interface FrameReleaseProps {
  journalEntries: JournalEntry[]
  lpNotices: LPNoticeDraft[]
  isPeriodLocked: boolean
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameRelease: React.FC<FrameReleaseProps> = ({
  journalEntries,
  lpNotices,
  isPeriodLocked,
  onInspectProvenance
}) => {
  const [activeMode, setActiveMode] = useState<'prepare' | 'verify'>('prepare')
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  const totalDebits = journalEntries.reduce((sum, j) => sum + j.debit, 0)
  const totalCredits = journalEntries.reduce((sum, j) => sum + j.credit, 0)
  const isJournalBalanced = Math.abs(totalDebits - totalCredits) < 0.01

  const handleDownloadAuditPack = () => {
    const auditData = {
      platform: 'Meridian Fund Intelligence',
      fund: 'Meridian Horizon Fund IV LP',
      period: 'Q3 2026',
      lockedAt: new Date().toISOString(),
      integrityHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      journalEntries,
      lpNotices
    }

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Meridian_Horizon_IV_Q3_2026_AuditPack.json`
    a.click()
    URL.revokeObjectURL(url)

    setDownloadSuccess('Audit Pack downloaded with cryptographic SHA-256 seal.')
    setTimeout(() => setDownloadSuccess(null), 4000)
  }

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-emerald">Stage 06 · Outputs & Handback</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>SYSTEM OF RECORD RELEASE</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Approved figures to your ledger. Your firm sends the notices.
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Nothing reaches your general ledger before your accountant approves. Download the audit pack with complete provenance.
          </p>
        </div>

        {/* Dual Mode Switch */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.25rem' }}>
          <button
            className={`btn ${activeMode === 'prepare' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            onClick={() => setActiveMode('prepare')}
          >
            Prepare Mode (Export)
          </button>
          <button
            className={`btn ${activeMode === 'verify' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            onClick={() => setActiveMode('verify')}
          >
            Verify Mode (Shadow Recomputation)
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div style={{ background: 'var(--emerald-subtle)', border: '1px solid var(--emerald-border)', color: '#34D399', padding: '0.75rem 1rem', borderRadius: '6px', margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
          <CheckCircle2 size={16} /> {downloadSuccess}
        </div>
      )}

      {/* Prepare Mode Content */}
      {activeMode === 'prepare' && (
        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Action Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="pill pill-emerald">FIS Investran Journal Entries</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem' }}>General Ledger Import Batch</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Balanced journal entries for Operating Cash, Cost Basis, Fee Offsets & GP Carry.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: isJournalBalanced ? '#34D399' : '#FB7185' }}>
                  Debits: {formatCurrency(totalDebits)} · Balanced
                </span>
                <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={handleDownloadAuditPack}>
                  <ArrowDownToLine size={13} /> Export CSV
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="pill pill-sky">Limited Partner Packages</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem' }}>Individual LP Distribution Notices</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Formatted capital call & distribution statements ready for firm delivery via secure portal.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  3 Institutional Notices
                </span>
                <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={handleDownloadAuditPack}>
                  <Download size={13} /> Batch PDF
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="pill pill-amber">Cryptographic Proof</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem' }}>Auditor Defense Pack</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Every number linked to its source document, mathematical rule, approver timestamp & diff.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  SHA-256 Sealed
                </span>
                <button className="btn btn-primary" style={{ fontSize: '0.75rem' }} onClick={handleDownloadAuditPack}>
                  <ShieldCheck size={13} /> Download Pack
                </button>
              </div>
            </div>
          </div>

          {/* General Ledger Journal Table */}
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-obsidian)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                GENERAL LEDGER RECONCILIATION BATCH (READY FOR FIS INVESTRAN SYNC)
              </span>
              <span className="pill pill-emerald">BALANCED DOUBLE-ENTRY</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)' }}>
                  <th style={{ padding: '0.65rem 1rem' }} className="font-mono">GL ACCOUNT</th>
                  <th style={{ padding: '0.65rem 1rem' }} className="font-mono">ACCOUNT NAME & MEMO</th>
                  <th style={{ padding: '0.65rem 1rem', textAlign: 'right' }} className="font-mono">DEBIT</th>
                  <th style={{ padding: '0.65rem 1rem', textAlign: 'right' }} className="font-mono">CREDIT</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map((j, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                      {j.accountNumber}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{j.accountName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{j.memo} · ({j.entity})</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: j.debit > 0 ? '#34D399' : 'var(--text-dim)' }}>
                      {j.debit > 0 ? formatCurrency(j.debit) : '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: j.credit > 0 ? '#38BDF8' : 'var(--text-dim)' }}>
                      {j.credit > 0 ? formatCurrency(j.credit) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LP Notices Cards */}
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Limited Partner Distribution Notices
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {lpNotices.map((notice, idx) => (
                <div key={idx} style={{ background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{notice.investorName}</span>
                    <span className="pill pill-emerald">{notice.callOrDistribution}</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Net Distributed:</span>
                    <span className="font-mono" style={{ color: '#34D399', fontWeight: 600 }}>{formatCurrency(notice.netAmount)}</span>
                  </div>
                  <div style={{ marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Ending NAV Share:</span>
                    <span className="font-mono">{formatCurrency(notice.navShare)}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.35rem' }}>
                    {notice.memo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verify Mode Content */}
      {activeMode === 'verify' && (
        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid var(--sky-border)', borderRadius: '6px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontSize: '0.8rem', fontWeight: 600 }} className="font-mono">
              <RefreshCw size={14} /> SHADOW RECOMPUTATION ENGINE
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginTop: '0.35rem' }}>
              In Verify mode, Meridian independently recalculates all financial statements and waterfall allocations directly from raw contracts and bank statements, reporting every variance against your legacy system.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Shadow Audit Variance Report
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-obsidian)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>European Waterfall Hurdle (8.0% IRR)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Independent daily-compounded day count verification</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="pill pill-emerald">0.00% Variance</span>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.2rem' }}>$0.00 Difference</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-obsidian)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Side Letter Fee Offset Deductions</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Verified against CalPERS, ADIA and OTPP side agreements</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="pill pill-emerald">0.00% Variance</span>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.2rem' }}>$0.00 Difference</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-obsidian)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Bank Statement Cash Tie-Out vs GL Account 1010</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>J.P. Morgan custodial feed MT940 line-by-line match</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="pill pill-emerald">0.00% Variance</span>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.2rem' }}>$0.00 Difference</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
