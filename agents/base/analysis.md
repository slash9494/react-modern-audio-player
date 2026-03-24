# Analysis Agent

Use this guide when analyzing code, understanding structure, or debugging.

---

## When to Use

Load this file when:

- understanding an unfamiliar file or module
- tracing a bug or unexpected behavior
- reviewing code before making changes
- assessing the impact of a planned change

---

## Analysis Principles

1. Read before modifying — always understand current behavior first
2. Base all findings on actual code, not assumptions
3. If something is unclear, mark it as `Uncertain — needs deeper inspection`
4. Focus on structure and intent, not just syntax

---

## Standard Analysis Steps

1. Identify the entry point of the relevant module
2. Map dependencies and data flow
3. Understand state management and side effects
4. Identify potential problem areas
5. Summarize findings before proposing changes

---

## What to Document During Analysis

- **Purpose** — what does this file or module do?
- **Inputs / Outputs** — what does it receive and return?
- **Dependencies** — what does it rely on?
- **Side effects** — does it mutate state, trigger events, or call APIs?
- **Problem areas** — anything unclear, complex, or fragile?

---

## Debugging Approach

When tracing a bug:

1. Reproduce the issue and identify the symptom
2. Narrow down to the affected module or function
3. Trace data flow from input to the point of failure
4. Check for edge cases, null values, or incorrect assumptions
5. Propose the minimal fix that addresses the root cause

---

## Build Config Analysis

When reviewing build or bundler config files (vite.config.ts, rollup.config.ts, webpack.config.js, etc.), apply these additional checks beyond functional correctness:

**Portability — flag if any of the following exist:**
- Hardcoded relative paths to `node_modules` (e.g., `../node_modules/react`) — breaks under pnpm strict, Yarn Berry PnP, or any workspace layout change
- Assumptions about where a package is physically installed — prefer `resolve.dedupe`, `externals`, or bare imports instead

**Dead config — flag if:**
- Options that only apply to a specific output format are present when that format is not being built (e.g., `globals` without UMD/IIFE)
- Alias patterns use unsupported syntax (e.g., glob `*` in `resolve.alias`)

**Missing externals — flag if:**
- A package appears in `resolve.alias` but is absent from `rollupOptions.external`

---

## CI Workflow Analysis

When reading any `.github/workflows/*.yml` file — even if the goal is only to fix a specific error — always check the following:

| Item | Check |
|---|---|
| `timeout-minutes` | Set at job level? Missing = 6h default, wastes runner time |
| `permissions` | Least-privilege? `contents: read` at minimum |
| `cache` | Dependency cache configured (`actions/setup-node cache`)? |
| `concurrency` | Cancel in-progress runs on PR push? |
| `env` isolation | Secrets accessed safely via `${{ secrets.* }}`? |
| Trigger scope | `pull_request_target` used? (security risk with untrusted code) |
| Runner pinning | Actions pinned to SHA, not floating tag? |

Flag any missing items as **latent defects** even when not related to the reported error.

---

## Rules

- Do not modify code during analysis
- Keep findings concise and evidence-based
- Separate observation from interpretation

---

## Goal

Produce a clear understanding of the current code
that enables confident, minimal, and correct changes.
