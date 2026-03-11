# Slot Audit Dashboard

Interactive visualization of the Unify Design System's native slot eligibility audit. Evaluates 97 component regions across Core and Greenhouse libraries against the Essential Function Test framework.

## What's in here

- **Tier Distribution** — Pie + stacked bar showing slot eligibility breakdown by library
- **Hack Slot → Tier Alignment** — How existing workarounds map to framework-confirmed eligibility
- **Q-Pattern Clustering** — Which Essential Function Test questions drive the Investigate tiers
- **Detach Rate vs. Usage Volume** — Scatter plot separating "needs a slot" from "needs a redesign"
- **Instance Volume at Risk** — Scale of instances sitting in ambiguous tiers
- **Full Audit Table** — Sortable, filterable view of all 97 regions

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via the included workflow. The site will be available at:

```
https://egerrity.github.io/slot-audit-dashboard/
```

To enable: go to repo **Settings → Pages → Source → GitHub Actions**.

## Data

All audit data is embedded in `src/SlotAuditDashboard.jsx`. To update, modify the `RAW` array at the top of the file.
