import React, { useState } from 'react'
import { MemoryRule } from '../../types/fund'
import { Database, ShieldCheck, Power, Plus, Sparkles, Filter, Check, Clock, UserCheck } from 'lucide-react'

interface FrameMemoryProps {
  rules: MemoryRule[]
  onToggleRetire: (id: string) => void
  onAddRule: (rule: Omit<MemoryRule, 'id' | 'timesApplied'>) => void
  onInspectProvenance: (metricName: string, details: string) => void
}

export const FrameMemory: React.FC<FrameMemoryProps> = ({
  rules,
  onToggleRetire,
  onAddRule,
  onInspectProvenance
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'fund' | 'organization' | 'global'>('all')
  const [isAdding, setIsAdding] = useState(false)
  const [newCondition, setNewCondition] = useState('')
  const [newRule, setNewRule] = useState('')
  const [newLevel, setNewLevel] = useState<'fund' | 'organization'>('fund')

  const activeRules = rules.filter(r => !r.isRetired)
  const retiredRules = rules.filter(r => r.isRetired)

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCondition.trim() || !newRule.trim()) return

    onAddRule({
      level: newLevel,
      scope: newLevel === 'fund' ? 'Meridian Horizon Fund IV LP' : 'All Meridian Private Funds',
      condition: newCondition.trim(),
      ruleStatement: newRule.trim(),
      confirmedBy: 'Marcus Vance, CPA (Controller)',
      confirmedAt: new Date().toISOString().split('T')[0],
      isRetired: false
    })

    setNewCondition('')
    setNewRule('')
    setIsAdding(false)
  }

  const filtered = rules.filter(r => {
    if (levelFilter === 'all') return true
    return r.level === levelFilter
  })

  return (
    <div className="card-glass animate-fade-in" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pill pill-emerald">Stage 04 · Institutional Memory</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>CONFIRMED KNOWLEDGE BASE</span>
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
            What you decide is what the fund remembers.
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Confirmed by human accountants, retirable at any time. Next period, nobody is asked again.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus size={14} /> Add Human Rule
        </button>
      </div>

      {/* 3-Tier Scope Architecture Explanation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#34D399', textTransform: 'uppercase' }}>Tier 1: Fund Specific</span>
            <span className="pill pill-emerald">This Fund Only</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.5rem', fontWeight: 500 }}>
            Specific to Meridian Horizon IV LP
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Counterparty overrides, side letter nuances, entity allocations. Zero cross-client data leak.
          </p>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#FBBF24', textTransform: 'uppercase' }}>Tier 2: Organization</span>
            <span className="pill pill-amber">House Conventions</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.5rem', fontWeight: 500 }}>
            Meridian Capital House Rules
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Standard broken-deal policy, fee offset reserves, and review hierarchies approved by the CFO.
          </p>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#7DD3FC', textTransform: 'uppercase' }}>Tier 3: Global System</span>
            <span className="pill pill-sky">Baseline Accounting</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.5rem', fontWeight: 500 }}>
            Statutory US GAAP / IFRS Rules
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            ASC 946 investment company accounting principles. No client private data retained.
          </p>
        </div>
      </div>

      {/* Add Rule Drawer/Form */}
      {isAdding && (
        <form onSubmit={handleCreateRule} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-focus)', borderRadius: '6px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Teach Fund Institutional Memory</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Scope Level</label>
              <select
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value as any)}
                style={{ width: '100%', background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.45rem', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                <option value="fund">Fund Specific (Horizon IV Only)</option>
                <option value="organization">Organization (All Meridian Funds)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>When Condition Matches</label>
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="e.g. Wires from Blackstone Strategic Capital"
                style={{ width: '100%', background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.45rem', borderRadius: '4px', fontSize: '0.8rem' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Then Apply Accounting Treatment</label>
            <textarea
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="e.g. Treat as co-investment management fee refund, credited against next capital call..."
              style={{ width: '100%', height: '50px', background: 'var(--bg-obsidian)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0.45rem', borderRadius: '4px', fontSize: '0.8rem', resize: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button type="button" className="btn btn-ghost" style={{ fontSize: '0.75rem' }} onClick={() => setIsAdding(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ fontSize: '0.75rem' }}>Confirm & Commit to Memory</button>
          </div>
        </form>
      )}

      {/* Rules List Filter Buttons */}
      <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem' }}>
        <button
          className={`btn ${levelFilter === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          onClick={() => setLevelFilter('all')}
        >
          All Memory Rules ({rules.length})
        </button>
        <button
          className={`btn ${levelFilter === 'fund' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          onClick={() => setLevelFilter('fund')}
        >
          Fund Specific ({rules.filter(r => r.level === 'fund').length})
        </button>
        <button
          className={`btn ${levelFilter === 'organization' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          onClick={() => setLevelFilter('organization')}
        >
          Organization ({rules.filter(r => r.level === 'organization').length})
        </button>
        <button
          className={`btn ${levelFilter === 'global' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          onClick={() => setLevelFilter('global')}
        >
          Global Baseline ({rules.filter(r => r.level === 'global').length})
        </button>
      </div>

      {/* Rules Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(rule => (
          <div
            key={rule.id}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: `1px solid ${rule.isRetired ? 'var(--border-subtle)' : 'var(--border-subtle)'}`,
              opacity: rule.isRetired ? 0.6 : 1,
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className={`pill ${rule.level === 'fund' ? 'pill-emerald' : rule.level === 'organization' ? 'pill-amber' : 'pill-sky'}`}>
                  {rule.level} level
                </span>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {rule.scope}
                </span>
                {rule.isRetired && (
                  <span className="pill pill-rose">Retired</span>
                )}
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Condition: <span style={{ color: '#38BDF8' }}>{rule.condition}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                {rule.ruleStatement}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <UserCheck size={12} /> Confirmed by {rule.confirmedBy}
                </span>
                <span>Date: {rule.confirmedAt}</span>
                <span className="font-mono" style={{ color: '#34D399' }}>Applied {rule.timesApplied} times</span>
              </div>
            </div>

            {/* Retire / Activate Toggle */}
            <div style={{ flexShrink: 0 }}>
              <button
                className={`btn ${rule.isRetired ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                onClick={() => onToggleRetire(rule.id)}
              >
                <Power size={13} style={{ color: rule.isRetired ? '#34D399' : 'var(--amber-base)' }} />
                {rule.isRetired ? 'Reactivate Rule' : 'Retire Rule'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
