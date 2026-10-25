import {
  LPATerms,
  PeriodInput,
  JudgmentItem,
  MemoryRule,
  TieOutItem,
  JournalEntry,
  LPNoticeDraft
} from '../types/fund'

export const sampleFundTerms: LPATerms = {
  fundName: 'Meridian Horizon Fund IV LP',
  vintage: 2023,
  baseCurrency: 'USD',
  totalCommitments: 650_000_000,
  managementFeePct: 2.0,
  managementFeeBase: 'committed_capital',
  preferredReturnHurdlePct: 8.0,
  gpCarryPct: 20.0,
  gpCatchupPct: 50.0,
  waterfallType: 'european_whole_fund',
  entities: [
    {
      id: 'ent-1',
      name: 'Meridian Horizon Fund IV (Delaware) LP',
      jurisdiction: 'Delaware, USA',
      taxStatus: 'US Partnership / Pass-through',
      commitment: 420_000_000,
      ownershipPct: 64.62,
      entityType: 'master'
    },
    {
      id: 'ent-2',
      name: 'Meridian Horizon Offshore Feeder IV Ltd',
      jurisdiction: 'Cayman Islands',
      taxStatus: 'Foreign Corporation / Blocker',
      commitment: 160_000_000,
      ownershipPct: 24.61,
      entityType: 'feeder'
    },
    {
      id: 'ent-3',
      name: 'Meridian Horizon Parallel Co-Invest LP',
      jurisdiction: 'Delaware, USA',
      taxStatus: 'US Partnership',
      commitment: 55_000_000,
      ownershipPct: 8.46,
      entityType: 'parallel'
    },
    {
      id: 'ent-4',
      name: 'Meridian Horizon GP IV LLC (Carry Vehicle)',
      jurisdiction: 'Delaware, USA',
      taxStatus: 'General Partner Vehicle',
      commitment: 15_000_000,
      ownershipPct: 2.31,
      entityType: 'gp'
    }
  ],
  sideLetters: [
    {
      investor: 'CalPERS Retirement Trust',
      commitment: 150_000_000,
      feeDiscountPct: 0.35,
      specialTerms: 'Most Favored Nation (MFN) rights, quarterly ESG compliance reporting, no crypto exposure.'
    },
    {
      investor: 'Abu Dhabi Investment Authority (ADIA)',
      commitment: 125_000_000,
      feeDiscountPct: 0.25,
      specialTerms: 'Sovereign immunity waiver acknowledgment, semi-annual tax withholding certification.'
    },
    {
      investor: 'Ontario Teachers Pension Plan',
      commitment: 80_000_000,
      feeDiscountPct: 0.15,
      specialTerms: 'Direct advisory board seat, co-investment rights on deals over $50M.'
    }
  ],
  draftedBy: 'Elena Rostova (Senior Fund Preparer)',
  approvedBy: 'Marcus Vance, CPA (Managing Director & Controller)',
  approvalDate: '2026-01-14'
}

export const initialPeriodInputs: PeriodInput[] = [
  {
    id: 'inp-1',
    name: 'J.P. Morgan Custody Cash & Wire Ledger (MT940)',
    source: 'J.P. Morgan Institutional Banking API / Direct Feed',
    category: 'bank',
    receivedAt: '2026-10-02T08:14:00Z',
    status: 'received',
    isBlocking: true,
    fileSize: '4.2 MB',
    hash: 'sha256:7e9a3...bc41'
  },
  {
    id: 'inp-2',
    name: 'Q3 Manager Valuation & Fair Value Marks Pack',
    source: 'Meridian Investment Committee & Valuation Committee',
    category: 'valuation',
    receivedAt: '2026-10-04T16:30:00Z',
    status: 'received',
    isBlocking: true,
    fileSize: '18.9 MB',
    hash: 'sha256:3d1a8...fa90'
  },
  {
    id: 'inp-3',
    name: 'General Ledger Trial Balance Export (FIS Investran)',
    source: 'FIS Investran Core Accounting Engine',
    category: 'ledger',
    receivedAt: '2026-10-05T09:02:00Z',
    status: 'received',
    isBlocking: true,
    fileSize: '8.4 MB',
    hash: 'sha256:9c0e4...812d'
  },
  {
    id: 'inp-4',
    name: 'Managing General Partner Q3 Distribution Instruction',
    source: 'General Partner Operating Committee',
    category: 'instruction',
    receivedAt: null,
    status: 'missing',
    isBlocking: true
  },
  {
    id: 'inp-5',
    name: 'Latham & Watkins Portfolio Deal Legal Fee Invoices',
    source: 'Accounts Payable Secure Ingestion Portal',
    category: 'legal',
    receivedAt: '2026-10-06T11:45:00Z',
    status: 'received',
    isBlocking: false,
    fileSize: '1.8 MB',
    hash: 'sha256:1a82f...44ee'
  }
]

export const initialJudgmentItems: JudgmentItem[] = [
  {
    id: 'jdg-1',
    title: 'Inbound Wire $1,420,000 from Apex Bio-Holdings LLC',
    counterparty: 'Apex Bio-Holdings LLC',
    amount: 1_420_000,
    currency: 'USD',
    transactionDate: '2026-09-28',
    category: 'return_vs_call',
    confidence: 0.94,
    recommendation: 'Classify as Portfolio Investment Realization (Return of Capital), NOT a Capital Call refund.',
    impact: 'Reduces unreturned invested capital by $1.42M and updates European Waterfall Tier 1 hurdle balance.',
    status: 'pending',
    reasoningSteps: [
      {
        step: 1,
        title: 'Counterparty Entity Role Identification',
        explanation: 'Counterparty Apex Bio-Holdings LLC (Tax ID: 84-291823) is a portfolio company under Fund IV, not an LP investor.',
        confidence: 0.99
      },
      {
        step: 2,
        title: 'Transaction Document & Wire Memo Corroboration',
        explanation: 'Wire memo reads "DIV-RECAP-Q3". Cross-referenced with Deal Closing Memo #D-2024-09 confirming partial debt recapitalization.',
        confidence: 0.96
      },
      {
        step: 3,
        title: 'Accounting Standards & LPA Covenant Check',
        explanation: 'LPA Section 6.3 mandates portfolio dividend recaps to be treated as return of capital before preferred return calculation.',
        confidence: 0.94
      }
    ]
  },
  {
    id: 'jdg-2',
    title: 'Advisory Transaction Fee Offset Allocation ($850,000)',
    counterparty: 'Meridian Capital Management GP (Manager)',
    amount: 850_000,
    currency: 'USD',
    transactionDate: '2026-09-30',
    category: 'fee_offset',
    confidence: 0.92,
    recommendation: 'Credit $680,000 (80% fee offset) against Q4 Management Fees payable by Fund IV LPs.',
    impact: 'Lowers Q4 management fee accrual from $3,250,000 to $2,570,000 across all active partners.',
    status: 'pending',
    reasoningSteps: [
      {
        step: 1,
        title: 'LPA Section 7.2 Management Fee Offset Clause',
        explanation: 'LPA states "80% of all directors fees, transaction fees, and monitoring fees received by Manager shall offset fund management fees."',
        confidence: 0.98
      },
      {
        step: 2,
        title: 'Bank Receipt Verification',
        explanation: '$850,000 received into Manager Operating Account from Project Titan syndication on 2026-09-25.',
        confidence: 0.95
      },
      {
        step: 3,
        title: 'Pro-Rata Entity Distribution Calculation',
        explanation: 'Allocated across Delaware Master LP (64.62%), Cayman Feeder (24.61%), and Parallel Co-Invest (8.46%) proportional to commitments.',
        confidence: 0.92
      }
    ]
  },
  {
    id: 'jdg-3',
    title: 'Cross-Border FATCA Withholding on Cayman Feeder ($128,400)',
    counterparty: 'US Internal Revenue Service / Custodian Withholding Agent',
    amount: 128_400,
    currency: 'USD',
    transactionDate: '2026-09-29',
    category: 'entity_allocation',
    confidence: 0.88,
    recommendation: 'Allocate withholding exclusively to Meridian Horizon Offshore Feeder IV Ltd; exempt US Master LP.',
    impact: 'Isolates tax burden to Cayman vehicle without distorting Delaware Master LP NAV.',
    status: 'pending',
    reasoningSteps: [
      {
        step: 1,
        title: 'Withholding Certificate Verification',
        explanation: 'Form W-8BEN-E on file for Cayman Feeder with Section 892 sovereign immunity carve-outs verified.',
        confidence: 0.91
      },
      {
        step: 2,
        title: 'Side Letter Tax Carve-out Matching',
        explanation: 'ADIA side letter section 4 confirms sovereign exempt status; commercial non-exempt feeder balance subject to 30% statutory withholding.',
        confidence: 0.88
      }
    ]
  }
]

export const initialMemoryRules: MemoryRule[] = [
  {
    id: 'mem-1',
    level: 'fund',
    scope: 'Meridian Horizon Fund IV LP',
    condition: 'Inbound wires from Apex Bio-Holdings LLC',
    ruleStatement: 'Inbound wires from this counterparty are portfolio recapitalizations (Return of Capital), not capital calls or management fee credits.',
    confirmedBy: 'Marcus Vance, CPA (Managing Director & Controller)',
    confirmedAt: '2026-06-30',
    isRetired: false,
    timesApplied: 4
  },
  {
    id: 'mem-2',
    level: 'organization',
    scope: 'All Meridian Capital Private Funds',
    condition: 'Transaction Advisory Fees earned on Fund Deals',
    ruleStatement: 'Apply 80% fee offset against next quarter management fee call; reserve 20% to GP Manager overhead tax reserve.',
    confirmedBy: 'Sarah Jenkins (Chief Financial Officer)',
    confirmedAt: '2025-12-15',
    isRetired: false,
    timesApplied: 19
  },
  {
    id: 'mem-3',
    level: 'global',
    scope: 'System Baseline (US GAAP ASC 946 / IFRS 10)',
    condition: 'Pre-closing broken deal diligence costs without LOI signing',
    ruleStatement: 'Expense immediately to Fund Dead Deal Costs account (GL 7420); do not capitalize into asset cost basis.',
    confirmedBy: 'Meridian Core Policy Engine',
    confirmedAt: '2024-01-01',
    isRetired: false,
    timesApplied: 142
  }
]

export const initialTieOuts: TieOutItem[] = [
  {
    id: 'to-1',
    module: 'cash',
    label: 'J.P. Morgan Custody Bank Cash vs General Ledger',
    glSystemValue: 34_820_500,
    verifiedComputedValue: 34_820_500,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['J.P. Morgan Custody Statement MT940', 'GL Cash Account 1010'],
      ruleFormula: 'Sum(Confirmed Inflows) - Sum(Confirmed Outflows) = Statement Ending Balance',
      verifiedBy: 'Elena Rostova (Preparer)'
    }
  },
  {
    id: 'to-2',
    module: 'capital',
    label: 'Cumulative Called Capital vs Investor Register',
    glSystemValue: 455_000_000,
    verifiedComputedValue: 455_000_000,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['Capital Call Notices #1-9', 'Investran LP Registry'],
      ruleFormula: 'Sum(LP Capital Call Notices) = LP Contributed Capital',
      verifiedBy: 'Elena Rostova (Preparer)'
    }
  },
  {
    id: 'to-3',
    module: 'investments',
    label: 'Portfolio Investments Fair Value vs Valuation Pack',
    glSystemValue: 512_400_000,
    verifiedComputedValue: 512_400_000,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['Q3 Valuation Committee Minutes', 'Independent Appraisal Mark Report'],
      ruleFormula: 'Sum(Individual Portfolio Company Marked Valuations)',
      verifiedBy: 'David Kim, CFA (Valuation Lead)'
    }
  },
  {
    id: 'to-4',
    module: 'fees',
    label: 'Q3 Management Fee Calculation (Net of Offsets)',
    glSystemValue: 2_570_000,
    verifiedComputedValue: 2_570_000,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['LPA Section 7.1', 'Side Letter Fee Adjustments', 'Jdg-2 Offset Schedule'],
      ruleFormula: 'Gross Fee ($3,250,000) - Side Letter Discounts ($150,000) - 80% Advisory Offset ($530,000)',
      supersededValue: 3_100_000,
      verifiedBy: 'Marcus Vance, CPA'
    }
  },
  {
    id: 'to-5',
    module: 'nav',
    label: 'Net Asset Value (Gross Assets minus Liabilities)',
    glSystemValue: 544_650_500,
    verifiedComputedValue: 544_650_500,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['Balance Sheet Trial Balance', 'Sub-ledger Schedules'],
      ruleFormula: 'Cash ($34.82M) + Portfolio ($512.40M) - Accrued Payables ($2.57M)',
      verifiedBy: 'Marcus Vance, CPA'
    }
  },
  {
    id: 'to-6',
    module: 'carry',
    label: 'GP Carried Interest Accrual (European Whole-Fund)',
    glSystemValue: 18_420_000,
    verifiedComputedValue: 18_420_000,
    variance: 0,
    isBlocking: true,
    status: 'pass',
    provenance: {
      sourceDocs: ['LPA Waterfall Clause 8.2', 'Cumulative Distribution Engine'],
      ruleFormula: 'Tier 1 Capital Return + Tier 2 (8% Preferred Return) -> Tier 3 (50% Catchup) = $18.42M',
      supersededValue: 17_900_000,
      verifiedBy: 'Marcus Vance, CPA'
    }
  },
  {
    id: 'to-7',
    module: 'valuation',
    label: 'Foreign Currency FX Translation Variance',
    glSystemValue: 42_100,
    verifiedComputedValue: 42_100,
    variance: 0,
    isBlocking: false,
    status: 'pass',
    provenance: {
      sourceDocs: ['ECB / Federal Reserve Reference Spot Rates 2026-09-30'],
      ruleFormula: 'Unrealized FX on EUR Co-investment Facility',
      verifiedBy: 'Elena Rostova (Preparer)'
    }
  }
]

export const initialJournalEntries: JournalEntry[] = [
  {
    accountNumber: '1010-01',
    accountName: 'Operating Cash - J.P. Morgan',
    entity: 'Meridian Horizon Fund IV LP',
    debit: 1_420_000,
    credit: 0,
    memo: 'Proceeds from Apex Bio-Holdings dividend recap'
  },
  {
    accountNumber: '1410-05',
    accountName: 'Investment in Apex Bio-Holdings - Cost Basis Reduction',
    entity: 'Meridian Horizon Fund IV LP',
    debit: 0,
    credit: 1_420_000,
    memo: 'Return of invested capital per LPA Section 6.3'
  },
  {
    accountNumber: '6110-00',
    accountName: 'Management Fees Payable',
    entity: 'Meridian Horizon Fund IV LP',
    debit: 680_000,
    credit: 0,
    memo: '80% fee offset credit from Titan transaction syndication'
  },
  {
    accountNumber: '2190-00',
    accountName: 'Unearned Fee Offsets Reserve',
    entity: 'Meridian Horizon Fund IV LP',
    debit: 0,
    credit: 680_000,
    memo: 'Offset credited against Q4 LP Fee Assessment'
  },
  {
    accountNumber: '3020-00',
    accountName: 'GP Carried Interest Accrued Liability',
    entity: 'Meridian Horizon GP IV LLC',
    debit: 0,
    credit: 520_000,
    memo: 'Q3 net carry accrual true-up from $17.90M to $18.42M'
  },
  {
    accountNumber: '3010-00',
    accountName: 'Partners Capital - GP Allocation',
    entity: 'Meridian Horizon GP IV LLC',
    debit: 520_000,
    credit: 0,
    memo: 'Recognized GP incentive allocation'
  }
]

export const initialLPNotices: LPNoticeDraft[] = [
  {
    investorName: 'CalPERS Retirement Trust',
    commitment: 150_000_000,
    uncalledCapital: 45_000_000,
    callOrDistribution: 'distribution',
    netAmount: 18_240_000,
    navShare: 125_704_000,
    memo: 'Q3 Net Distribution (Capital Return: $12.1M, Realized Profit: $6.14M, Net of Fee Offset)'
  },
  {
    investorName: 'Abu Dhabi Investment Authority (ADIA)',
    commitment: 125_000_000,
    uncalledCapital: 37_500_000,
    callOrDistribution: 'distribution',
    netAmount: 15_200_000,
    navShare: 104_753_000,
    memo: 'Q3 Net Distribution (Exempt from US backup withholding per Sec 892)'
  },
  {
    investorName: 'Ontario Teachers Pension Plan',
    commitment: 80_000_000,
    uncalledCapital: 24_000_000,
    callOrDistribution: 'distribution',
    netAmount: 9_728_000,
    navShare: 67_042_000,
    memo: 'Q3 Net Distribution after 0.15% side letter management fee credit'
  }
]
