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

## Pre-Release Checklist

- [ ] version bumped correctly in package.json
- [ ] CHANGELOG.md updated
- [ ] build passes
- [ ] all tests pass
- [ ] CI green on release branch
- [ ] git tag created and pushed

---

## Goal

Maintain a clean, predictable release history
that follows semver and is easy for consumers to track.
