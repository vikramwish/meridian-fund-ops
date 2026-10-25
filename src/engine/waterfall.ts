export interface WaterfallResult {
  investedCapitalReturned: number
  preferredReturnDistributed: number
  gpCatchupDistributed: number
  finalSplitLpDistributed: number
  finalSplitGpDistributed: number
  totalLpProceeds: number
  totalGpProceeds: number
  unreturnedCapitalRemaining: number
  unpaidPreferredReturnRemaining: number
}

/**
 * Computes European Whole-Fund Private Equity Waterfall
 * 1. Return of Capital: 100% to LP until invested capital is returned
 * 2. Preferred Return: 100% to LP until preferred return hurdle (e.g. 8%) is met
 * 3. GP Catchup: e.g. 50% or 100% to GP until GP receives agreed % (e.g. 20%) of total profit
 * 4. Final Split: 80% to LP / 20% to GP
 */
export function calculateEuropeanWaterfall(params: {
  distributableCash: number
  cumulativeInvestedCapital: number
  cumulativeCapitalReturned: number
  preferredReturnAccrued: number
  preferredReturnPaid: number
  gpCatchupRate?: number // default 0.50 (50% catchup)
  gpCarryRate?: number // default 0.20 (20% carry)
}): WaterfallResult {
  const {
    distributableCash,
    cumulativeInvestedCapital,
    cumulativeCapitalReturned,
    preferredReturnAccrued,
    preferredReturnPaid,
    gpCatchupRate = 0.5,
    gpCarryRate = 0.2
  } = params

  let remainingCash = Math.max(0, distributableCash)

  // Tier 1: Return of Invested Capital
  const unreturnedCapital = Math.max(0, cumulativeInvestedCapital - cumulativeCapitalReturned)
  const tier1CapitalReturn = Math.min(remainingCash, unreturnedCapital)
  remainingCash -= tier1CapitalReturn

  // Tier 2: Preferred Return Hurdle
  const unpaidPref = Math.max(0, preferredReturnAccrued - preferredReturnPaid)
  const tier2PrefReturn = Math.min(remainingCash, unpaidPref)
  remainingCash -= tier2PrefReturn

  // Tier 3: GP Catch-up
  // Total profit so far distributed is (tier2PrefReturn). GP target is gpCarryRate / (1 - gpCarryRate) * tier2PrefReturn
  // In a 50% catch-up scenario, 50% of incoming cash goes to GP until GP has 20% of (Tier 2 + Tier 3)
  const targetGpCatchup = (gpCarryRate / (1 - gpCarryRate)) * tier2PrefReturn
  let tier3GpCatchup = 0
  let tier3LpShare = 0

  if (remainingCash > 0 && targetGpCatchup > 0) {
    const cashNeededForCatchup = targetGpCatchup / gpCatchupRate
    const cashAllocatedToCatchup = Math.min(remainingCash, cashNeededForCatchup)
    tier3GpCatchup = cashAllocatedToCatchup * gpCatchupRate
    tier3LpShare = cashAllocatedToCatchup * (1 - gpCatchupRate)
    remainingCash -= cashAllocatedToCatchup
  }

  // Tier 4: Final Split (80% LP / 20% GP)
  const tier4Lp = remainingCash * (1 - gpCarryRate)
  const tier4Gp = remainingCash * gpCarryRate

  const totalLp = tier1CapitalReturn + tier2PrefReturn + tier3LpShare + tier4Lp
  const totalGp = tier3GpCatchup + tier4Gp

  return {
    investedCapitalReturned: tier1CapitalReturn,
    preferredReturnDistributed: tier2PrefReturn + tier3LpShare,
    gpCatchupDistributed: tier3GpCatchup,
    finalSplitLpDistributed: tier4Lp,
    finalSplitGpDistributed: tier4Gp,
    totalLpProceeds: totalLp,
    totalGpProceeds: totalGp,
    unreturnedCapitalRemaining: unreturnedCapital - tier1CapitalReturn,
    unpaidPreferredReturnRemaining: unpaidPref - tier2PrefReturn
  }
}
