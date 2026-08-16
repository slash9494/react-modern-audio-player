# Release Agent

Manage releases and package publishing.

---

## Versioning Strategy

Follow Semantic Versioning (semver):

- MAJOR — breaking API changes
- MINOR — new features, backwards-compatible
- PATCH — bug fixes, no API changes

Example: 1.4.2 → 1.5.0 for a new feature

---

## Release Branch

Releases must be made from:

- `main` — stable production releases
- `v*/main` — overhaul version releases (e.g. v2/main)

Never release from a feature or fix branch directly.

---

## Tag Format

Git tags must follow this pattern: `v<major>.<minor>.<patch>`

Examples: `v1.5.0`, `v2.0.0`, `v2.1.3`

---

## Release Steps

1. Confirm all target changes are merged into the release branch
2. Bump version in `package.json`
3. Update `CHANGELOG.md` with release notes
4. Run build and verify output — `npm run build`
5. Ensure CI passes
6. Commit version bump — `🚀Deploy : bump version to v1.5.0`
7. Create and push git tag — `git tag v1.5.0 && git push origin v1.5.0`
8. Publish package — `npm publish`
9. Create GitHub Release with changelog content as description

---

## Changelog Format

```markdown
## [1.5.0] - 2026-03-19

### ✨ Added

- new features

### 🐛 Fixed

- bug fixes

### ♻️ Refactored

- structural improvements without behavior change

### 🔄 Changed

- behavioral or API changes

### 📝 Docs

- documentation updates

### 💥 Breaking Changes

- any breaking changes
```

---

## Changelog Audience

The changelog is written for the people who install the package, not for the
people who maintain it. Every entry answers "what changes for me?".

Write:

- the symptom a consumer could observe, in their vocabulary — props, exports,
  rendered result, error at import
- the condition that triggered it, so a reader can tell whether it affected them
- what to do differently, if anything

Do not write:

- internal identifiers, file paths, or private function names
- how the fix works — the mechanism, the data structure, the algorithm
- why the bug escaped — missing tests, tooling gaps, post-mortem notes
- counts and measurements that only mean something inside the repo

Group entries by what the consumer experiences, not by how the fix was split
across commits. Several commits that cure one visible symptom are one entry.

Work a consumer cannot observe gets **no entry at all** — refactors, folder
moves, internal renames, test additions, tooling. An entry that has to say
"no public API or behavior change" is answering "what changes for me?" with
"nothing", which is a reason to delete the entry, not to write it. The record
of that work is the commit history, which is where a maintainer looks.

Classify by what the consumer expected, not by what the diff added. Making
something work that the README already promised is a **fix** — the consumer
was told it existed, followed the documentation, and it failed. Reserve
"New Features" for capability the docs did not previously claim.

---

## Pre-Release Checklist

- [ ] version bumped correctly in package.json
- [ ] CHANGELOG.md updated
- [ ] README.md reviewed — updated if public API / props / user-facing behavior changed, explicit verification if not
- [ ] `.claude/docs/repo-analysis/` reviewed — updated if module structure, top-level exports, public API, context/hook organization, patterns, or conventions changed, explicit verification if not
- [ ] build passes
- [ ] all tests pass
- [ ] CI green on release branch
- [ ] git tag created and pushed

---

## Goal

Maintain a clean, predictable release history
that follows semver and is easy for consumers to track.
