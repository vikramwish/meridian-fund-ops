# Claude Design Brief: Meridian Fund Intelligence

## Project Overview
- **Name**: Meridian Fund Intelligence
- **Category**: B2B Financial Operations & Private Equity Intelligence Platform
- **Target Audience**: Fund Accountants, Controllers, General Partners, and Auditors managing complex multi-entity private capital funds.

## Aesthetic Direction: "Financial Editorial & Swiss Monospace Precision"
- **Mood**: High-conviction, calm, authoritative, deeply trustworthy, and mathematically rigorous.
- **Color Palette**:
  - Primary Background: `#0B0F14` (Deep Obsidian Void)
  - Surface & Card Backgrounds: `#121921` (Slate Elevation 1), `#18222E` (Slate Elevation 2)
  - Borders & Ledger Rules: `#253444` (Subtle Ledger Grid)
  - Primary Verified Accent: `#10B981` / `#059669` (Sage / Emerald Tie-Out Green)
  - Judgment & Warning Accent: `#F59E0B` / `#D97706` (Warm Brass / Amber for Human-in-the-Loop items)
  - Advisory / Informational: `#38BDF8` (Ice Sky Blue)
  - Text: `#F8FAFC` (Heading White), `#94A3B8` (Muted Slate Body), `#64748B` (Subtle Metadata)
- **Typography**:
  - Display Serifs: "Newsreader", "Playfair Display", Georgia for authoritative headlines.
  - Monospace Financials: "JetBrains Mono", "Geist Mono", monospace for numbers, balances, codes, rule hashes, and timestamps.
  - Interface Sans: "Plus Jakarta Sans", system-ui for legible UI labels, buttons, and navigation.

## Component Hierarchy & Screens
1. **App Shell**:
   - Top Bar: Brand mark, Active Fund Switcher (Meridian Horizon Fund IV LP), Period Indicator (Q3 2026), Audit Trail Indicator, Verification Mode toggle.
   - Stage Navigation Rail: 6 clickable breadcrumbs with status badges and progress dots.
2. **The 6 Stage Frames**:
   - `FrameSetup`: Ingested LP documents, side letters, waterfall tier cards, dual sign-off badges.
   - `FrameIntake`: Day-1 input checklist, status pills ("Received", "Missing", "Outdated"), file drop targets.
   - `FrameDecide`: AI proposal cards, confidence meters (94% confidence), multi-step reasoning trace, Approve/Reject/Refine buttons.
   - `FrameMemory`: 3-tier memory cards (Global, Firm, Fund), retirement toggles, rule editor.
   - `FrameClose`: 7 tie-out modules with status pills (Blocking vs Advisory), NAV & Carry calculations, previous value diffs, period lock button.
   - `FrameRelease`: Dual "Prepare" (Export Journal Entries, Download LP Notices) and "Verify" (Shadow recomputation variance table).
3. **Audit Drawer**:
   - Slide-out inspection panel rendering complete cryptographic provenance of any clicked metric.
