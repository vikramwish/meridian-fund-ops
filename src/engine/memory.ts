import { MemoryRule } from '../types/fund'

export function findMatchingRule(
  counterparty: string,
  txType: string,
  rules: MemoryRule[]
): MemoryRule | undefined {
  const activeRules = rules.filter(r => !r.isRetired)

  // Prioritize Fund specific first, then Organization, then Global
  const sorted = [...activeRules].sort((a, b) => {
    const weights = { fund: 3, organization: 2, global: 1 }
    return weights[b.level] - weights[a.level]
  })

  return sorted.find(r => {
    const c = r.condition.toLowerCase()
    return c.includes(counterparty.toLowerCase()) || c.includes(txType.toLowerCase())
  })
}
