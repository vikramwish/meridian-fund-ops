# PLAN.md: Meridian Fund Intelligence Implementation

## Task 1: Project Scaffolding & Design System Tokens
- Files: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/index.css`
- Verification: `npm install && npm run build`

## Task 2: Core Domain Model & Mock Data Engines
- Files: `src/types/fund.ts`, `src/data/fundData.ts`, `src/engine/waterfall.ts`, `src/engine/tieouts.ts`
- Verification: `npm run test` (vitest unit tests for calculations)

## Task 3: Interactive Stage Frames (The 6 Stages of Close)
- Stage 1: Setup (`src/components/stages/FrameSetup.tsx`)
- Stage 2: Intake Radar (`src/components/stages/FrameIntake.tsx`)
- Stage 3: Supervised Judgment (`src/components/stages/FrameDecide.tsx`)
- Stage 4: Institutional Memory (`src/components/stages/FrameMemory.tsx`)
- Stage 5: Operational Tie-Outs & Lock (`src/components/stages/FrameClose.tsx`)
- Stage 6: Release & Shadow Verification (`src/components/stages/FrameRelease.tsx`)

## Task 4: Main Application Shell & Guided Walkthrough Experience
- Header with live fund selector, period selector, dual authority badges.
- Six-stage progression rail with keyboard & click navigation.
- Audit Provenance Drawer: inspect any figure across the system to see its document source, rule, approver, and diff.
- Export modal for GL Journal Entries & Cryptographic Audit Pack.

## Task 5: Testing & Visual Quality Assurance
- Vitest unit tests for waterfall, tieouts, and memory matching.
- Playwright E2E tests capturing 1440px desktop & 390px mobile viewports.

## Task 6: GitHub Actions CI & Repository Readiness
- `.github/workflows/ci.yml`
- Recruiter-grade `README.md` with architecture diagrams and portfolio walkthrough.
- Reports: `reports/DECISIONS.md`, `reports/SUMMARY.md`.
