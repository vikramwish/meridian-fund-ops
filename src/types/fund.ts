export type WaterfallType = 'european_whole_fund' | 'american_deal_by_deal'

export interface FundEntity {
  id: string
  name: string
  jurisdiction: string
  taxStatus: string
  commitment: number
  ownershipPct: number
  entityType: 'master' | 'feeder' | 'parallel' | 'aiv' | 'gp'
}

export interface LPATerms {
  fundName: string
  vintage: number
  baseCurrency: string
  totalCommitments: number
  managementFeePct: number
  managementFeeBase: 'committed_capital' | 'invested_capital'
  preferredReturnHurdlePct: number
  gpCarryPct: number
  gpCatchupPct: number
  waterfallType: WaterfallType
  entities: FundEntity[]
  sideLetters: {
    investor: string
    commitment: number
    feeDiscountPct: number
    specialTerms: string
  }[]
  draftedBy: string
  approvedBy: string
  approvalDate: string
}

export interface PeriodInput {
  id: string
  name: string
  source: string
  category: 'bank' | 'valuation' | 'ledger' | 'instruction' | 'legal'
  receivedAt: string | null
  status: 'received' | 'missing' | 'review_required'
  isBlocking: boolean
  fileSize?: string
  hash?: string
}

export interface ReasoningStep {
  step: number
  title: string
  explanation: string
  confidence: number
}

export interface JudgmentItem {
  id: string
  title: string
  counterparty: string
  amount: number
  currency: string
  transactionDate: string
  category: 'expense_classification' | 'return_vs_call' | 'entity_allocation' | 'fee_offset'
  confidence: number
  reasoningSteps: ReasoningStep[]
  recommendation: string
  impact: string
  status: 'pending' | 'approved' | 'rejected' | 'modified'
  reviewerNote?: string
  reviewedBy?: string
  reviewedAt?: string
}

export interface MemoryRule {
  id: string
  level: 'global' | 'organization' | 'fund'
  scope: string
  condition: string
  ruleStatement: string
  confirmedBy: string
  confirmedAt: string
  isRetired: boolean
  timesApplied: number
}

export interface TieOutItem {
  id: string
  module: 'cash' | 'capital' | 'investments' | 'valuation' | 'fees' | 'nav' | 'carry'
  label: string
  glSystemValue: number
  verifiedComputedValue: number
  variance: number
  isBlocking: boolean
  status: 'pass' | 'variance' | 'pending'
  provenance: {
    sourceDocs: string[]
    ruleFormula: string
    supersededValue?: number
    verifiedBy: string
  }
}

export interface JournalEntry {
  accountNumber: string
  accountName: string
  entity: string
  debit: number
  credit: number
  memo: string
}

export interface LPNoticeDraft {
  investorName: string
  commitment: number
  uncalledCapital: number
  callOrDistribution: 'distribution' | 'call'
  netAmount: number
  navShare: number
  memo: string
}
