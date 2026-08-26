# PR Agent

Responsible for creating high quality pull requests.

---

## When to Create a PR

Create a pull request when:

- working on a GitHub issue
- implementing a new feature
- performing large refactoring
- any work that requires review before merging

For small direct changes (docs, minor fixes), a PR may be skipped per branch.md rules.

---

## Base Branch Selection

Always target the branch the work originated from:

| Current branch pattern | Target base branch |
|---|---|
| `v*/feat/*`, `v*/fix/*`, `v*/test/*`, `v*/ci/*`, etc. | `v*/main` (matching version) |
| `feat/*`, `fix/*`, `refactor/*`, `test/*`, `ci/*`, etc. | `develop` |
| hotfix or stable release work | `main` |

Examples:

- `v2/test/pipeline` → base: `v2/main`
- `feat/123-playlist` → base: `develop`
- `hotfix/critical-bug` → base: `main`

Never open a PR targeting `main` unless it is a production release or hotfix.

---

## PR Title Format

Use the same Conventional Commit format as commit messages.

type(scope): short description

Examples:

feat(player): add playlist support
fix(volume): correct mute toggle behavior
refactor(hooks): simplify useAudio logic

---

## PR Description Template

Use this structure for every PR body:

```markdown
## Summary

Brief description of what this PR does and why.

## Changes

- list of key changes made
- file or module affected

## Test Results

- [ ] build passes
- [ ] lint passes
- [ ] tests pass

## Related Issues

Closes #<issue-number>  (if applicable)
```

---

## PR Size Guidelines

- Keep PRs small and focused on a single concern
- Aim for fewer than 400 lines changed
- If larger, split into multiple PRs

---

## Issue Linking

If the PR resolves a GitHub issue, include in the description:

Closes #42

or

Fixes #42

### Bare `#N` auto-links — do not misuse

GitHub auto-links every bare `#N` in a PR title, body, or commit message to
the issue/PR with that number. Never use `#N` to enumerate findings, steps, or
list items — it silently cross-links unrelated issues. Enumerate as `1.`,
`(1)`, or `item N` instead. Reserve `#N` for deliberate issue/PR references.

Before running `gh pr create`, grep the body for stray references and confirm
each one is intended:

```
grep -oE '#[0-9]+' <body-file>   # every hit must be a real issue/PR you mean to link
```

---

## PR Checklist Before Opening

- [ ] commit messages follow Conventional Commits format
- [ ] no unrelated changes included
- [ ] no stray `#N` in the title/body/commits — every `#N` is a deliberate issue/PR link (see Issue Linking)
- [ ] build and tests pass locally
- [ ] PR description is filled out
- [ ] `package/README.md` reviewed — see the README Maintenance Policy in `AGENTS.md`
- [ ] `package/CHANGELOG.md` updated — see the CHANGELOG Maintenance Policy in `AGENTS.md`
- [ ] `yarn changeset` added, if the change affects the published package

---

## Goal

PRs should be easy to review, clearly explain intent,
and keep a clean merge history.
