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

Releases run on changesets plus `.github/workflows/release.yaml`. Do not publish by hand.

Done by a person or agent:

1. Add a changeset describing the change — `yarn changeset`
2. Merge all target changes into `main`
3. On `main`, apply the changesets — `yarn version-packages`
   (bumps `package/package.json` and writes `package/CHANGELOG.md`)
4. Verify the build — `yarn build`
5. Commit the version bump — `🚀Deploy : bump version to v1.5.0`
6. Push `main`

Done by `release.yaml` on push to `main` touching `package/package.json`:

- builds, then skips entirely if that version is already on npm
- `npm publish ./package --provenance`, with dist-tag `next` for beta/rc/alpha versions and `latest` otherwise
- creates the `v<version>` git tag and the GitHub Release

The version bump must be committed on `main`. The husky `pre-commit` hook rejects a
`package/package.json` version change on any other branch, and `guard-version-bump.yml`
checks the same rule on pull requests.

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

- [ ] `yarn version-packages` run on `main`, and `package/package.json` shows the expected version
- [ ] `package/CHANGELOG.md` updated — see the CHANGELOG Maintenance Policy in `AGENTS.md`
- [ ] `package/README.md` reviewed — see the README Maintenance Policy in `AGENTS.md`
- [ ] `.claude/docs/repo-analysis/` reviewed, if that local cache is present
- [ ] `yarn build` passes
- [ ] `cd package && yarn test` passes
- [ ] `cd package && yarn typeCheck` and `yarn lint` pass — no CI job covers these
- [ ] CI green on the release branch
- [ ] after pushing `main`, `release.yaml` succeeded and the `v<version>` tag exists

---

## Goal

Maintain a clean, predictable release history
that follows semver and is easy for consumers to track.
