import { describe, it, expect } from 'vitest'
import { calculateEuropeanWaterfall } from '../engine/waterfall'
import { evaluateTieOuts } from '../engine/tieouts'
import { findMatchingRule } from '../engine/memory'
import { TieOutItem, MemoryRule } from '../types/fund'

describe('Waterfall Engine', () => {
  it('distributes return of capital first before profits', () => {
    const res = calculateEuropeanWaterfall({
      distributableCash: 50_000_000,
      cumulativeInvestedCapital: 40_000_000,
      cumulativeCapitalReturned: 10_000_000,
      preferredReturnAccrued: 5_000_000,
      preferredReturnPaid: 0,
      gpCatchupRate: 0.5,
      gpCarryRate: 0.2
    })

    // Unreturned capital is 30M. 30M goes to capital return.
    expect(res.investedCapitalReturned).toBe(30_000_000)
    // 20M remaining. 5M goes to preferred return.
    expect(res.preferredReturnDistributed).toBeGreaterThanOrEqual(5_000_000)
    expect(res.totalLpProceeds + res.totalGpProceeds).toBeCloseTo(50_000_000)
    expect(res.unreturnedCapitalRemaining).toBe(0)
  })

  it('allocates GP carry and catchup correctly when capital & hurdle are cleared', () => {
    const res = calculateEuropeanWaterfall({
      distributableCash: 10_000_000,
      cumulativeInvestedCapital: 50_000_000,
      cumulativeCapitalReturned: 50_000_000,
      preferredReturnAccrued: 2_000_000,
      preferredReturnPaid: 2_000_000,
      gpCatchupRate: 0.5,
      gpCarryRate: 0.2
    })

    // Capital & hurdle already satisfied, remaining cash splits 80% LP / 20% GP
    expect(res.investedCapitalReturned).toBe(0)
    expect(res.finalSplitLpDistributed).toBe(8_000_000)
    expect(res.finalSplitGpDistributed).toBe(2_000_000)
    expect(res.totalLpProceeds).toBe(8_000_000)
    expect(res.totalGpProceeds).toBe(2_000_000)
  })
})

describe('TieOut Integrity Engine', () => {
  it('blocks period lock if any blocking tie-out has variance', () => {
    const mockTieOuts: TieOutItem[] = [
      {
        id: '1',
        module: 'cash',
        label: 'Bank vs GL Cash',
        glSystemValue: 12_450_000,
        verifiedComputedValue: 12_450_000,
        variance: 0,
        isBlocking: true,
        status: 'pass',
        provenance: { sourceDocs: ['doc1'], ruleFormula: 'A=B', verifiedBy: 'Alex' }
      },
      {
        id: '2',
        module: 'nav',
        label: 'Net Asset Value',
        glSystemValue: 345_000_000,
        verifiedComputedValue: 344_850_000,
        variance: 150_000,
        isBlocking: true,
        status: 'variance',
        provenance: { sourceDocs: ['doc2'], ruleFormula: 'Assets-Liabilities', verifiedBy: 'Alex' }
      }
    ]

    const evalResult = evaluateTieOuts(mockTieOuts)
    expect(evalResult.blockingFailures).toBe(1)
    expect(evalResult.canLockPeriod).toBe(false)
  })

  it('allows period lock when all blocking tie-outs pass', () => {
    const cleanTieOuts: TieOutItem[] = [
      {
        id: '1',
        module: 'cash',
        label: 'Bank vs GL Cash',
        glSystemValue: 12_450_000,
        verifiedComputedValue: 12_450_000,
        variance: 0,
        isBlocking: true,
        status: 'pass',
        provenance: { sourceDocs: ['doc1'], ruleFormula: 'A=B', verifiedBy: 'Alex' }
      }
    ]

    const evalResult = evaluateTieOuts(cleanTieOuts)
    expect(evalResult.blockingFailures).toBe(0)
    expect(evalResult.canLockPeriod).toBe(true)
  })
})

describe('Memory Matching Engine', () => {
  it('prefers fund-level memory rule over global rule', () => {
    const rules: MemoryRule[] = [
      {
        id: 'g1',
        level: 'global',
        scope: 'Global',
        condition: 'Apex Capital',
        ruleStatement: 'Treat Apex as vendor',
        confirmedBy: 'System',
        confirmedAt: '2025-01-01',
        isRetired: false,
        timesApplied: 10
      },
      {
        id: 'f1',
        level: 'fund',
        scope: 'Horizon IV',
        condition: 'Apex Capital',
        ruleStatement: 'Treat Apex as parallel fund distribution',
        confirmedBy: 'Sarah (Controller)',
        confirmedAt: '2026-06-15',
        isRetired: false,
        timesApplied: 3
      }
    ]

    const match = findMatchingRule('Apex Capital', 'wire', rules)
    expect(match).toBeDefined()
    expect(match?.level).toBe('fund')
    expect(match?.id).toBe('f1')
  })
})
