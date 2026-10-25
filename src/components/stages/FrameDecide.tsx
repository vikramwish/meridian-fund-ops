import React, { useState } from 'react'
import { JudgmentItem } from '../../types/fund'
import { CheckCircle2, XCircle, Edit3, Sparkles, Brain, ArrowRight, Shield, HelpCircle, Check } from 'lucide-react'

interface FrameDecideProps {
  items: JudgmentItem[]
  onApproveItem: (id: string, reviewerName: string) => void
  onRejectItem: (id: string, reason: string) => void
  onModifyItem: (id: string, note: string) => void
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameDecide: React.FC<FrameDecideProps> = ({
  items,
  onApproveItem,
  onRejectItem,
  onModifyItem,
  onInspectProvenance
}) => {
  const [selectedId, setSelectedId] = useState(items[0]?.id || '')
  const [editingNote, setEditingNote] = useState('')
  const [isRefining, setIsRefining] = useState(false)

  const activeItem = items.find(i => i.id === selectedId) || items[0]
  const pendingCount = items.filter(i => i.status === 'pending').length
  const approvedCount = items.filter(i => i.status === 'approved').length

  const handleApprove = () => {
    if (!activeItem) return
    onApproveItem(activeItem.id, 'Marcus Vance, CPA (Controller)')
  }

  const handleReject = () => {
    if (!activeItem) return
    onRejectItem(activeItem.id, 'Accounting standards criteria not satisfied.')
  }

  const handleSaveRefinement = () => {
    if (!activeItem || !editingNote.trim()) return
    onModifyItem(activeItem.id, editingNote)
    setIsRefining(false)
    setEditingNote('')
  }

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-amber">Stage 03 · Supervised Judgment</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>HUMAN-IN-THE-LOOP QUEUE</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Rules do the routine. Your reviewer decides the rest.
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            What needs judgment is queued with its reasoning chain and confidence score. The approval that protects the books also becomes fund memory.
          </p>
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.625rem 1rem' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Judgment Queue</div>
            <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {pendingCount} Pending · {approvedCount} Decided
            </div>
          </div>
          <span className={`pill ${pendingCount === 0 ? 'pill-emerald' : 'pill-amber'}`}>
            {pendingCount === 0 ? 'Queue Cleared' : `${pendingCount} Require Review`}
          </span>
        </div>
      </div>

      {/* Main Grid: Left List, Right Detailed Reasoning Chain */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.8fr)', gap: '1.25rem', marginTop: '1.25rem' }}>
        {/* Left Side: Items Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {items.map(item => {
            const isSelected = item.id === selectedId
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  background: isSelected ? 'var(--bg-surface-subtle)' : 'var(--bg-surface-elevated)',
                  border: `1px solid ${isSelected ? 'var(--border-focus)' : 'var(--border-subtle)'}`,
                  borderRadius: '6px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {item.title}
                  </span>
                  <span className={`pill ${item.status === 'approved' ? 'pill-emerald' : item.status === 'rejected' ? 'pill-rose' : 'pill-amber'}`}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span className="font-mono" style={{ color: '#38BDF8' }}>
                    ${(item.amount / 1_000_000).toFixed(2)}M {item.currency}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Brain size={12} style={{ color: '#34D399' }} />
                    <span className="font-mono" style={{ color: '#34D399' }}>{(item.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Active Item Deep Reasoning Inspector */}
        {activeItem && (
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <span className="pill pill-sky" style={{ marginBottom: '0.35rem' }}>
                  {activeItem.category.replace('_', ' ')}
                </span>
                <h3 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  {activeItem.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Counterparty: <strong style={{ color: 'var(--text-main)' }}>{activeItem.counterparty}</strong></span>
                  <span>Date: <strong style={{ color: 'var(--text-main)' }}>{activeItem.transactionDate}</strong></span>
                </div>
              </div>

              {/* Confidence Meter */}
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>AI Confidence</span>
                <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#34D399' }}>
                  {(activeItem.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Recommendation Box */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--emerald-border)', borderRadius: '6px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }} className="font-mono">
                <Sparkles size={14} /> Agent Recommendation
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginTop: '0.35rem', fontWeight: 500 }}>
                {activeItem.recommendation}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <strong>Impact:</strong> {activeItem.impact}
              </p>
            </div>

            {/* Multi-step Reasoning Trace */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }} className="font-mono">
                How It Reasoned (Step-by-Step Chain of Thought)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeItem.reasoningSteps.map(step => (
                  <div key={step.step} style={{ background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 600 }}>
                        Step {step.step}: {step.title}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {(step.confidence * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviewer Note / Status */}
            {activeItem.status === 'approved' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface-subtle)', border: '1px solid var(--emerald-border)', borderRadius: '6px', padding: '0.75rem' }}>
                <CheckCircle2 size={16} style={{ color: '#34D399' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-main)' }}>
                  Confirmed by <strong style={{ color: '#34D399' }}>{activeItem.reviewedBy}</strong>. Added to Fund Institutional Memory.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            {activeItem.status === 'pending' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => setIsRefining(!isRefining)}
                >
                  <Edit3 size={14} /> Provide Alternative Reasoning
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-danger"
                    onClick={handleReject}
                  >
                    <XCircle size={14} /> Reject
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleApprove}
                  >
                    <CheckCircle2 size={14} /> Approve Proposal & Remember
                  </button>
                </div>
              </div>
            )}

            {/* Inline Refinement Box */}
            {isRefining && (
              <div style={{ background: 'var(--bg-obsidian)', border: '1px solid var(--border-focus)', borderRadius: '6px', padding: '0.875rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                  Explain why this proposal is wrong or modify the rule:
                </span>
                <textarea
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                  placeholder="e.g. Per amended side letter dated Aug 2026, offset rate is 85% instead of 80%..."
                  style={{ width: '100%', height: '60px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', resize: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="btn btn-ghost" style={{ fontSize: '0.75rem' }} onClick={() => setIsRefining(false)}>Cancel</button>
                  <button className="btn btn-primary" style={{ fontSize: '0.75rem' }} onClick={handleSaveRefinement}>Save & Re-run Rule</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
