# Architecture & Engineering Decisions (DECISIONS.md)

## Decision 1: Original Brand & Product Identity
- **Choice**: Meridian Fund Intelligence (`meridian-fund-ops`).
- **Context**: The user requested assistance building the product exemplified by Ritamm (`https://www.ritammfin.com/product`), which is a "System of Intelligence for Private Markets Operations".
- **Rule Alignment**: AGENTS.md mandates: "Use original branding only. Never clone another product's name, logo or pixel-for-pixel UI." and "Every project gets its own committed aesthetic direction."
- **Decision**: Developed an original brand identity ("Meridian Fund Intelligence") with a bespoke Financial Editorial / Swiss Precision aesthetic, tailored typography, custom iconography, and high-fidelity operational workflows, while implementing the complete private-markets intelligence domain model.
- **Alternatives Rejected**:
  - Direct clone of Ritamm name/assets (violates AGENTS.md copyright and branding policies).
  - Generic SaaS template (violates anti-generic aesthetic guidelines).

## Decision 2: Stack & Zero-Dependency Design Tokens
- **Choice**: Vite + React 18 + TypeScript + Custom CSS Design Tokens & Scoped System.
- **Rationale**:
  - Blazing fast build & test turnaround times.
  - Zero framework churn; bespoke CSS custom properties guarantee crisp typography (Newsreader serif + JetBrains Mono + Plus Jakarta Sans) and high-contrast accessibility (WCAG AAA compliant dark mode).
  - Completely self-contained without requiring external tailwind compilation layers.
- **Alternatives Rejected**:
  - Tailwind v4 / v3 (requires additional tooling plugins, slower build setup, prone to generic utility styles).
  - Vanilla HTML/JS without framework (makes reactive 6-stage period close state management and interactive calculation diffing unnecessarily error-prone).

## Decision 3: True Dual-Engine Implementation ("Prepare" + "Verify" Shadow Calculation)
- **Choice**: Implement both real forward processing ("Prepare" mode: generating journal entries and LP capital call/distribution packages) and an independent shadow engine ("Verify" mode: computing expected valuations and highlighting ledger variances).
- **Rationale**: Private equity fund accountants require verification before writing anything to their general ledger (FIS Investran, eFront, Dynamo). The "Verify" mode proves mathematical correctness and eliminates spreadsheet error risk.
