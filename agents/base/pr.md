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

---

## PR Checklist Before Opening

- [ ] commit messages follow Conventional Commits format
- [ ] no unrelated changes included
- [ ] build and tests pass locally
- [ ] PR description is filled out

---

## Goal

PRs should be easy to review, clearly explain intent,
and keep a clean merge history.
