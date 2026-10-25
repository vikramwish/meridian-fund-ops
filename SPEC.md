# SPEC.md: Meridian Fund Intelligence (System of Intelligence for Private Markets Operations)

## 1. Problem Statement
Private equity, venture capital, and real estate investment firms manage complex fund structures (multi-entity master-feeder funds, parallel funds, blocker entities, side letters). While systems of record (e.g. FIS Investran, eFront, Dynamo, Allvue) store general ledger balances, the critical quarterly "period close" process still lives in vulnerable spreadsheets and email threads:
- Reconciling banking feeds against general ledger journal entries.
- Applying complex LPA waterfall distributions (hurdle rate, GP catchup, clawback provisions).
- Enforcing custom LP side-letter fee discounts and MFN provisions.
- Classifying ambiguous wires and operating expenses vs. capital expenditures.

Traditional automation tools fail because fund accounting demands *supervised judgment* and *complete auditability*: no automated process may write directly to a ledger without accountant sign-off.

## 2. Target Users
- **Fund Accountants & Senior Controllers**: Perform and verify quarterly closes, tie-outs, and journal preparation.
- **Operations Leads / Chief Operating Officers**: Oversee multi-entity fund books, manage deadlines, and sign off on period locks.
- **Auditors & Fund Administrators**: Review the provenance of every figure, rule, and calculation.

## 3. Core Principles
1. **The record stays the record**: The general ledger is the immutable source of truth. Nothing reaches it before the accountant explicitly signs off.
2. **Nothing is written without a trail**: Every figure carries its source document, mathematical rule, approver timestamp, and previous-value diff.
3. **Judgment is supervised, not surrendered**: Rules handle routine computations. AI agents propose solutions with explicit step-by-step reasoning and confidence metrics. The human decision becomes the fund's persistent institutional memory.

## 4. The 6-Stage Period Close Workflow
- **Stage 1: Setup (Terms & Entity Hierarchy)**: Parsing of LPA contracts, side-letter terms, management fee rates, and European/American waterfall tiers. Dual-authorization workflow.
- **Stage 2: Period Inputs (Intake Radar)**: Day-1 missing item detector tracking bank statements, manager valuation packages, trial balance exports, and investor notices.
- **Stage 3: Decide (Supervised Judgment Queue)**: AI judgment items with confidence scores and reasoning steps. Accountants can Approve, Reject, or Refine reasoning.
- **Stage 4: Remember (Fund Institutional Memory)**: 3-tier memory hierarchy (Global -> Firm -> Fund). Retirable, auditable institutional memory rules.
- **Stage 5: Close (Operational Tie-outs & Locks)**: 7 financial tie-out modules (Cash, Capital, Investments, Valuation, Fees, NAV, GP Carry). Blocking vs Advisory tie-outs. Period cannot lock if blocking tie-outs are unverified.
- **Stage 6: Release (Dual-Mode Handback & Cryptographic Audit Pack)**:
  - "Prepare": General ledger journal entries export, individualized LP notices, GP summary report.
  - "Verify": Shadow recalculation engine comparing independent model computations against legacy system balances.
  - Cryptographic Audit Pack with SHA-256 provenance hash.

## 5. Non-Goals
- Direct unauthenticated bank API wire instruction execution (Meridian never instructs a bank or sends wires).
- Replacing the core General Ledger system (Meridian sits *above* it as a system of intelligence).

## 6. Acceptance Criteria
- [x] All 6 period close stages fully interactive and switchable.
- [x] Document-to-terms parsing engine renders structured rules and waterfall calculations.
- [x] Real-time interactive judgment queue with step-by-step reasoning steps and confidence score.
- [x] Live tie-out integrity engine preventing period lock when discrepancies exist, and allowing interactive resolution.
- [x] Dual-mode "Prepare" and "Verify" (shadow recalculation with variance breakdown).
- [x] Exportable Audit Pack with full cryptographic hash trail and exportable journal entries.
- [x] Responsive layout with desktop (1440px) and mobile (390px) support.
- [x] Comprehensive test suite (unit + E2E).
