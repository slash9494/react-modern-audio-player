# Security Review Guide for External PRs

This guide explains the review process for pull requests from external contributors (forks).

## Overview

E2E tests run via the `pull_request` event, which gives fork PRs a read-only token with no access to repository secrets. To prevent malicious code from reaching CI, the following safeguards are in place:

1. **Security Guard workflow** — blocks merge if executable config files are modified
2. **CODEOWNERS** — requires maintainer approval for sensitive files

---

## When to See This Guide

You will need to follow this guide when:

- The **Security Guard** check has failed on a PR (modified executable config files)
- A checklist comment has appeared on the PR — review it and add the `security-reviewed` label to unblock

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

Before adding the `security-reviewed` label, verify each item below.

### `package.json` / `package/package.json`

- [ ] No `postinstall`, `preinstall`, or `prepare` scripts were added or modified
- [ ] No existing lifecycle scripts were changed to include shell commands or network calls
- [ ] No new dependencies were added that themselves run install-time scripts

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

- [ ] No steps that read secrets and send them to external services
- [ ] Permissions are minimal and explicitly declared

---

## How the Security Guard Workflow Works

The [`security-guard.yml`](workflows/security-guard.yml) workflow runs on every PR that modifies the files listed above. It:

1. Checks whether the PR has the `security-reviewed` label — if so, skips the check and passes
2. Checks out the PR code and diffs against the base branch
3. Posts a checklist comment on the PR with the changed files and review items
4. Prints the full diff to the Actions log
5. Exits with a failure to block merge via required status checks

To unblock: add the `security-reviewed` label — the workflow re-triggers automatically and passes.

---

## Branch Protection Configuration

For this guard to be effective, the following must be configured in **Settings → Rules → Rulesets**:

| Setting | Value |
|---|---|
| Target branches | `*main`, `develop` |
| Require status checks | `check-executable-files` |
| Require pull request | enabled |
| Require Code Owner review | enabled |
