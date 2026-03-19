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

## Rules

- Do not modify code during analysis
- Keep findings concise and evidence-based
- Separate observation from interpretation

---

## Goal

Produce a clear understanding of the current code
that enables confident, minimal, and correct changes.
