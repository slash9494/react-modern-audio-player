# Branch Agent

You are responsible for managing git branches for this repository.

This is a personal library project, so the workflow is simplified.

Pull requests are not required for direct development work.

---

## Core Responsibilities

- determine whether a new branch is required
- generate correct branch names
- create branches for issue-based work
- avoid unnecessary branches
- keep branch structure clean

---

## Branch Strategy

Main branches in this repository:

main
→ stable releases

develop
→ normal development

v*/main
→ large scale refactoring or architecture overhaul base branch

---

## Branch Naming Conventions

Work branches under a specific overhaul version:

v*/feat/*
v*/fix/*
v*/refactor/*
v*/test/*
v*/ci/*
v*/docs/*

Example: v2/ci/github-actions-pipeline

Feature branches outside overhaul should follow:

feat/*
fix/*
refactor/*
test/*
ci/*
docs/*
chore/*

---

## Direct Development Rule

Since this is a personal project, the repository owner may commit directly.

When performing small or simple changes:

- documentation updates
- minor refactoring
- small bug fixes
- formatting changes
- small improvements

A new branch is NOT required.

Work directly on the current branch.

---

## When a Branch IS Required

Create a branch when:

- working on a GitHub issue
- implementing a new feature
- performing large refactoring
- working on a complex task

---

## Issue-Based Branch Creation

If the task originates from a GitHub issue,
the branch name must include the issue number.

Format:

type/issue-number-short-description

Examples:

feat/123-playlist-support
fix/42-volume-slider
refactor/88-player-hooks

---

## Branch Prefix Types

feat → new feature
fix → bug fix
refactor → structural improvement
test → tests
ci → CI/CD configuration
docs → documentation
perf → performance improvements
chore → maintenance work

---

## Branch Creation Base

Branches must be created from the current working branch.

Examples:

v2/main
   └─ v2/feat/123-playlist-support

develop
   └─ fix/45-progress-bar

---

## Branch Naming Rules

Branch names must be:

- lowercase
- short and descriptive
- 2–4 words when possible

Avoid long names such as:

feat/add-new-audio-buffer-logic-for-performance

---

## Issue Detection Workflow

When starting work:

1. Check whether the task references a GitHub issue
2. If an issue exists:
   - extract the issue number
   - generate a branch name using the issue format
3. If no issue exists:
   - determine if a branch is needed
   - otherwise work directly on the current branch

---

## Branch Creation Process

When creating a branch:

1. ensure repository is up to date

git fetch
git pull

2. create branch

git checkout -b <branch-name>

3. start development

---

## Branch Lifecycle

After completing the work:

If the work came from an issue:

- close the issue in the commit message

Example:

Fixes #42

Branches can be deleted after merging if no longer needed.

---

## Forbidden Actions

Never:

- rename main branches automatically
- create branches with unclear names
- create unnecessary branches for trivial changes

---

## Goal

Maintain a simple and readable branch structure
that supports issue-based development when needed
while allowing fast direct commits for personal work.
