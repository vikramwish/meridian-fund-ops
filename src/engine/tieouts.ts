import { TieOutItem } from '../types/fund'

export interface TieOutSummary {
  totalItems: number
  passedCount: number
  varianceCount: number
  blockingFailures: number
  canLockPeriod: boolean
  totalAbsVariance: number
}

export function evaluateTieOuts(items: TieOutItem[]): TieOutSummary {
  let passedCount = 0
  let varianceCount = 0
  let blockingFailures = 0
  let totalAbsVariance = 0

  for (const item of items) {
    const diff = Math.abs(item.glSystemValue - item.verifiedComputedValue)
    totalAbsVariance += diff

    // Floating tolerance: within 1 dollar or 0.0001%
    const isClean = diff < 1.0

    if (isClean && item.status === 'pass') {
      passedCount++
    } else {
      varianceCount++
      if (item.isBlocking) {
        blockingFailures++
      }
    }
  }

  return {
    totalItems: items.length,
    passedCount,
    varianceCount,
    blockingFailures,
    canLockPeriod: blockingFailures === 0,
    totalAbsVariance
  }
}
