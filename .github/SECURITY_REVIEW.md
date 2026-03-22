# Security Review Guide for External PRs

This guide explains the review process for pull requests from external contributors (forks).

## Overview

E2E tests for fork PRs use `pull_request_target`, which runs in the base repository's privileged context (with access to `GITHUB_TOKEN`). To prevent malicious code from running in this context, the following safeguards are in place:

1. **Security Guard workflow** — blocks merge if executable config files are modified
2. **CODEOWNERS** — requires maintainer approval for sensitive files
3. **Environment protection** — requires manual approval before E2E tests run on fork PRs

---

## When to See This Guide

You will need to follow this guide when:

- The **Security Guard** check has failed on a fork PR (modified executable config files)
- You are about to **approve the `external` environment** deployment to allow E2E tests to run

---

## Files That Require Careful Review

| File | Risk |
|---|---|
| `package.json` | `prepare`, `postinstall`, `preinstall` scripts run automatically during `yarn install` |
| `package/package.json` | Same lifecycle script risk |
| `playwright.config.ts` | `globalSetup`, `globalTeardown`, `webServer.command` execute arbitrary code before/after tests |
| `package/vite.config.ts` | Executed at build time — can run arbitrary Node.js |
| `package/vitest.config.ts` | Executed at test time |
| `.github/workflows/` | Workflow changes affect CI behavior directly |

---

## Reviewer Checklist

Before approving the `external` environment or dismissing the Security Guard failure, verify each item below.

### `package.json` / `package/package.json`

- [ ] No `postinstall`, `preinstall`, or `prepare` scripts were added or modified
- [ ] No existing lifecycle scripts were changed to include shell commands or network calls
- [ ] No new dependencies were added that themselves run install-time scripts (check `npm install` output if unsure)

### `playwright.config.ts`

- [ ] `globalSetup` and `globalTeardown` fields were not added or modified
- [ ] `webServer.command` is unchanged or only points to the local dev server
- [ ] No `require()` or `import` of unfamiliar modules was introduced
- [ ] No environment variable exfiltration patterns (e.g., `process.env` sent to external URLs)

### `*.config.ts` (vite, vitest)

- [ ] No use of `exec`, `spawn`, `execSync`, or `spawnSync`
- [ ] No dynamic `import()` of external URLs or unrecognized packages
- [ ] No network requests at config evaluation time

### `.github/workflows/`

- [ ] No new `pull_request_target` triggers introduced
- [ ] No steps that read secrets and send them to external services
- [ ] Permissions are minimal and explicitly declared

---

## How the Security Guard Workflow Works

The [`security-guard.yml`](workflows/security-guard.yml) workflow runs on every PR that modifies the files listed above. It:

1. Checks out the PR code using the `pull_request` trigger (no secrets — safe for forks)
2. Diffs the changed files against the base branch
3. Prints the full diff to the Actions log
4. Exits with a failure to block merge via required status checks

To unblock the PR after completing this checklist, approve it as a Code Owner. The Security Guard failure is intentional and does not auto-resolve — it serves as a gate requiring explicit human sign-off.

---

## Branch Protection Configuration

For this guard to be effective, the following must be configured in **Settings → Rules → Rulesets**:

| Setting | Value |
|---|---|
| Target branches | `*main`, `develop` |
| Require status checks | `check-executable-files` |
| Require pull request | enabled |
| Require Code Owner review | enabled |
