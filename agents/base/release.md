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
5. Commit the version bump — `🚀 release: bump version to v1.5.0`
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

- [ ] `yarn version-packages` run on `main`, and `package/package.json` shows the expected version
- [ ] `package/CHANGELOG.md` reviewed, and updated if the policy calls for an entry — see the CHANGELOG Maintenance Policy in `AGENTS.md`
- [ ] `package/README.md` reviewed — see the README Maintenance Policy in `AGENTS.md`
- [ ] `.claude/docs/repo-analysis/` reviewed, if that local cache is present
- [ ] `yarn build` passes
- [ ] `cd package && yarn test` passes
- [ ] `cd package && yarn typeCheck` passes and `yarn lint` reports nothing new — no CI job covers these
- [ ] CI green on the release branch
- [ ] after pushing `main`, `release.yaml` succeeded and the `v<version>` tag exists

---

## Goal

Maintain a clean, predictable release history
that follows semver and is easy for consumers to track.
