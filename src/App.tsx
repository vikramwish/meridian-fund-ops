import React, { useState } from 'react'
import {
  sampleFundTerms,
  initialPeriodInputs,
  initialJudgmentItems,
  initialMemoryRules,
  initialTieOuts,
  initialJournalEntries,
  initialLPNotices
} from './data/fundData'
import {
  PeriodInput,
  JudgmentItem,
  MemoryRule,
  TieOutItem,
  JournalEntry
} from './types/fund'
import { FrameSetup } from './components/stages/FrameSetup'
import { FrameIntake } from './components/stages/FrameIntake'
import { FrameDecide } from './components/stages/FrameDecide'
import { FrameMemory } from './components/stages/FrameMemory'
import { FrameClose } from './components/stages/FrameClose'
import { FrameRelease } from './components/stages/FrameRelease'
import { AuditDrawer } from './components/ui/AuditDrawer'
import {
  ShieldCheck,
  ChevronRight,
  Database,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react'

export const App: React.FC = () => {
  // Navigation State
  const [currentStage, setCurrentStage] = useState<number>(1)

  // Fund Operational State
  const [fundTerms] = useState(sampleFundTerms)
  const [periodInputs, setPeriodInputs] = useState<PeriodInput[]>(initialPeriodInputs)
  const [judgmentItems, setJudgmentItems] = useState<JudgmentItem[]>(initialJudgmentItems)
  const [memoryRules, setMemoryRules] = useState<MemoryRule[]>(initialMemoryRules)
  const [tieOuts, setTieOuts] = useState<TieOutItem[]>(initialTieOuts)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries)
  const [isPeriodLocked, setIsPeriodLocked] = useState<boolean>(false)

  // Provenance Audit Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMetric, setDrawerMetric] = useState('')
  const [drawerDetails, setDrawerDetails] = useState('')

  const openAuditDrawer = (metricName: string, details: string) => {
    setDrawerMetric(metricName)
    setDrawerDetails(details)
    setDrawerOpen(true)
  }

  // Reactive Handlers
  const handleUpdateInput = (id: string, updated: Partial<PeriodInput>) => {
    setPeriodInputs(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    )
  }

  const handleApproveJudgmentItem = (id: string, reviewerName: string) => {
    setJudgmentItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'approved',
              reviewedBy: reviewerName,
              reviewedAt: new Date().toISOString()
            }
          : item
      )
    )

    // Automatically generate new fund memory rule
    const item = judgmentItems.find(i => i.id === id)
    if (item) {
      const newRule: MemoryRule = {
        id: `mem-${Date.now()}`,
        level: 'fund',
        scope: 'Meridian Horizon Fund IV LP',
        condition: `Inbound wires from ${item.counterparty}`,
        ruleStatement: `${item.recommendation} Verified and confirmed by ${reviewerName}.`,
        confirmedBy: reviewerName,
        confirmedAt: new Date().toISOString().split('T')[0],
        isRetired: false,
        timesApplied: 1
      }
      setMemoryRules(prev => [newRule, ...prev])
    }
  }

  const handleRejectJudgmentItem = (id: string, reason: string) => {
    setJudgmentItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'rejected',
              reviewerNote: reason,
              reviewedAt: new Date().toISOString()
            }
          : item
      )
    )
  }

  const handleModifyJudgmentItem = (id: string, note: string) => {
    setJudgmentItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'modified',
              reviewerNote: note,
              reviewedAt: new Date().toISOString()
            }
          : item
      )
    )
  }

  const handleToggleRetireRule = (id: string) => {
    setMemoryRules(prev =>
      prev.map(r => (r.id === id ? { ...r, isRetired: !r.isRetired } : r))
    )
  }

  const handleAddMemoryRule = (rule: Omit<MemoryRule, 'id' | 'timesApplied'>) => {
    const created: MemoryRule = {
      ...rule,
      id: `mem-${Date.now()}`,
      timesApplied: 0
    }
    setMemoryRules(prev => [created, ...prev])
  }

  const handleTogglePeriodLock = () => {
    setIsPeriodLocked(!isPeriodLocked)
  }

  const stages = [
    {
      id: 1,
      num: '01',
      name: 'Fund Setup',
      sub: 'LPA Terms & Multi-Entity Map',
      badge: `${fundTerms.entities.length} Vehicles`
    },
    {
      id: 2,
      num: '02',
      name: 'Period Inputs',
      sub: 'Day-1 Intake & Gap Radar',
      badge: `${periodInputs.filter(i => i.status === 'received').length}/${periodInputs.length} Ingested`
    },
    {
      id: 3,
      num: '03',
      name: 'Decide',
      sub: 'Supervised Judgment Queue',
      badge: `${judgmentItems.filter(i => i.status === 'pending').length} Pending`
    },
    {
      id: 4,
      num: '04',
      name: 'Remember',
      sub: 'Fund Institutional Memory',
      badge: `${memoryRules.filter(r => !r.isRetired).length} Active Rules`
    },
    {
      id: 5,
      num: '05',
      name: 'Close',
      sub: 'Operational Tie-Outs & Lock',
      badge: isPeriodLocked ? 'Locked' : 'Tie-outs Clean'
    },
    {
      id: 6,
      num: '06',
      name: 'Release',
      sub: 'GL Export & Shadow Verify',
      badge: 'Audit Pack'
    }
  ]

  return (
    <div className="bg-ledger-pattern min-h-screen pb-16">
      {/* Top Navigation Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(9, 13, 17, 0.92)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.35)'
              }}
            >
              <ShieldCheck size={20} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    color: 'var(--text-main)'
                  }}
                >
                  MERIDIAN
                </span>
                <span className="pill pill-emerald" style={{ fontSize: '0.62rem' }}>
                  System of Intelligence
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', margin: 0 }}>
                Private Markets Financial Operations
              </p>
            </div>
          </div>

          {/* Active Fund Switcher & Period Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Database size={13} style={{ color: '#38BDF8' }} />
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {fundTerms.fundName}
              </span>
              <span className="pill pill-ghost" style={{ fontSize: '0.62rem' }}>$650M</span>
            </div>

            <div
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--amber-base)' }}>● Q3 2026 Close</span>
            </div>

            <div
              style={{
                background: isPeriodLocked ? 'var(--emerald-subtle)' : 'var(--bg-surface-elevated)',
                border: `1px solid ${isPeriodLocked ? 'var(--emerald-border)' : 'var(--border-subtle)'}`,
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {isPeriodLocked ? (
                <>
                  <Lock size={13} style={{ color: '#34D399' }} />
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>
                    LOCKED
                  </span>
                </>
              ) : (
                <>
                  <Unlock size={13} style={{ color: 'var(--amber-base)' }} />
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--amber-base)' }}>
                    OPEN
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Narrative & Philosophy */}
      <section className="bg-radial-glow" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#34D399',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              Autonomous Financial Operations Platform
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--text-main)',
                lineHeight: 1.2
              }}
            >
              Meridian does the judgment work. Your fund accountants keep the authority.
            </h1>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginTop: '1rem',
                lineHeight: 1.6
              }}
            >
              Sits above your general ledgers (FIS Investran, eFront, Dynamo) and banking feeds. Rules do the routine. Agents propose with transparent multi-step reasoning. Accountants decide, and that decision becomes this fund's persistent institutional memory.
            </p>
          </div>

          {/* 3 Core Operating Principles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginTop: '1.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <CheckCircle2 size={14} style={{ color: '#34D399' }} /> The record stays the record
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Your general ledger is the sole source of truth. Nothing reaches it before your accountant approves.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <CheckCircle2 size={14} style={{ color: '#34D399' }} /> Nothing is written without a trail
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Every balance carries its legal source document, mathematical rule, approver timestamp, and previous value diff.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <CheckCircle2 size={14} style={{ color: '#34D399' }} /> Judgment is supervised, not surrendered
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Agents propose with confidence scores; your human team decides, and the decision becomes the fund's memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main style={{ maxWidth: '1280px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        {/* Six Stages Rail Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
              The Six Stages of a Close
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setCurrentStage(prev => (prev > 1 ? prev - 1 : 6))}
              >
                Previous Stage
              </button>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setCurrentStage(prev => (prev < 6 ? prev + 1 : 1))}
              >
                Next Stage <ChevronRight size={13} />
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.5rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '0.5rem'
            }}
          >
            {stages.map(st => {
              const isActive = currentStage === st.id
              return (
                <button
                  key={st.id}
                  onClick={() => setCurrentStage(st.id)}
                  style={{
                    background: isActive ? 'var(--bg-surface-elevated)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--emerald-border)' : 'transparent'}`,
                    borderRadius: '6px',
                    padding: '0.75rem 0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    outline: 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: isActive ? '#34D399' : 'var(--text-dim)'
                      }}
                    >
                      {st.num}
                    </span>
                    <span
                      className={`pill ${isActive ? 'pill-emerald' : 'pill-ghost'}`}
                      style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}
                    >
                      {st.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                      marginTop: '0.35rem'
                    }}
                  >
                    {st.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                      marginTop: '0.15rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {st.sub}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Stage Frame Viewport */}
        <div style={{ position: 'relative' }}>
          {currentStage === 1 && (
            <FrameSetup terms={fundTerms} onInspectProvenance={openAuditDrawer} />
          )}

          {currentStage === 2 && (
            <FrameIntake
              inputs={periodInputs}
              onUpdateInput={handleUpdateInput}
              onInspectProvenance={openAuditDrawer}
            />
          )}

          {currentStage === 3 && (
            <FrameDecide
              items={judgmentItems}
              onApproveItem={handleApproveJudgmentItem}
              onRejectItem={handleRejectJudgmentItem}
              onModifyItem={handleModifyJudgmentItem}
              onInspectProvenance={openAuditDrawer}
            />
          )}

          {currentStage === 4 && (
            <FrameMemory
              rules={memoryRules}
              onToggleRetire={handleToggleRetireRule}
              onAddRule={handleAddMemoryRule}
              onInspectProvenance={openAuditDrawer}
            />
          )}

          {currentStage === 5 && (
            <FrameClose
              tieOuts={tieOuts}
              isPeriodLocked={isPeriodLocked}
              onTogglePeriodLock={handleTogglePeriodLock}
              onInspectProvenance={openAuditDrawer}
            />
          )}

          {currentStage === 6 && (
            <FrameRelease
              journalEntries={journalEntries}
              lpNotices={initialLPNotices}
              isPeriodLocked={isPeriodLocked}
              onInspectProvenance={openAuditDrawer}
            />
          )}
        </div>
      </main>

      {/* Slide-out Immutable Audit Provenance Drawer */}
      <AuditDrawer
        isOpen={drawerOpen}
        metricName={drawerMetric}
        details={drawerDetails}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
