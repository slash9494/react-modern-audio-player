# React Modern Audio Player — Agent Guide

> **Note:** `CLAUDE.md` is a symlink to `AGENTS.md`. They are the same file.

This repository uses modular agent instructions. This file is the canonical source; the sections below cover the common cases, and the trigger table points at deeper files for the rest.

---

## Commands

Requires Node.js 20+ and yarn 4. Run `corepack enable` first — yarn 1 hard-errors on the `packageManager` pin without it.

| Task | Command | Run from |
| --- | --- | --- |
| Install | `yarn install` | root |
| Build the library | `yarn build` | root |
| Dev server | `yarn dev` | `package/` |
| Unit tests | `yarn test:unit` | `package/` |
| Integration tests | `yarn test:integration` | `package/` |
| All Vitest tests | `yarn test` | `package/` |
| Coverage | `yarn test:coverage` | `package/` |
| Type check | `yarn typeCheck` | `package/` |
| Lint and fix | `yarn lint` | root |
| End-to-end tests | `yarn test:e2e` | root |
| Add a changeset | `yarn changeset` | root |
| Apply changesets | `yarn version-packages` | root |

Release steps and the publish workflow → `agents/base/release.md`.

---

## Repository Structure

A yarn workspaces monorepo. The published npm package is `package/`; everything else is development tooling.

```text
react-modern-audio-player/
├── package/                  # the published library
│   ├── src/
│   │   ├── audioPlayer/      # component tree: Audio, Container, Context, Interface, Player, Provider, utils
│   │   ├── api/              # public hooks: useAudioPlayer, ...Time, ...Playback, ...Track, ...Volume, ...Element
│   │   ├── hooks/            # internal hooks
│   │   ├── ui/               # shared presentational pieces
│   │   ├── utils/            # pure helpers
│   │   ├── styles/           # CSS
│   │   └── test/             # Vitest setup
│   ├── README.md             # full public API documentation
│   ├── CHANGELOG.md
│   └── llms.txt
├── storybook/                # Storybook workspace
├── test/
│   ├── e2e/                  # Playwright specs (testDir in playwright.config.ts)
│   └── integration/          # cross-module tests
├── agents/                   # instruction files for coding agents
├── conventions/              # naming rules
└── .github/workflows/
```

---

## Testing

| Layer | Runner | Location |
| --- | --- | --- |
| Unit | Vitest + @testing-library/react | colocated with the source, or a `__tests__` directory |
| Integration | Vitest | `test/integration/` |
| End-to-end | Playwright | `test/e2e/` |

Coverage targets, mock strategy, and per-layer rules → `agents/base/testing.md`, which references `unit.md` and `e2e.md`.

---

## Definition of Done

CI runs only integration tests (`.github/workflows/integration.yml`) and end-to-end tests (`.github/workflows/e2e.yml`). **Type errors, lint errors, and build failures will not be caught for you** — there is no CI job for them. Run them locally before opening a pull request.

Before saying a change is done:

1. `cd package && yarn typeCheck` passes
2. `yarn lint` reports nothing new. It currently exits 1 on three pre-existing errors in `storybook/src/` (unused `React` imports, deprecated `ReactDOM.render`) — fix those only if you are already working in that workspace
3. `cd package && yarn test` passes
4. `yarn build` succeeds, if the change touches `package/src/`
5. `yarn test:e2e` passes, if the change touches rendering, layout, or user interaction
6. Public API changed? `package/README.md` and `package/CHANGELOG.md` updated per the policies below
7. Change affects the published package? `yarn changeset` added

The husky `pre-commit` hook runs prettier, eslint, and `yarn vitest run --changed` on staged files. Passing it is not the same as passing this list.

---

## Anti-Patterns

- **Do not start long-running servers** — `yarn dev`, `yarn test:e2e:ui`, and the Storybook `sb` script never exit and are the wrong default for an agent. Use `yarn test:e2e` for a run that terminates.
- **Do not edit the version in `package/package.json` outside `main`.** The husky `pre-commit` hook rejects it and `.github/workflows/guard-version-bump.yml` fails the pull request.
- **Do not publish by hand.** `.github/workflows/release.yaml` publishes, tags, and drafts the release on push to `main`.
- **Do not assume CI catches type, lint, or build errors.** See Definition of Done.
- **`yarn lint` rewrites files.** It is `eslint --fix .` across every workspace, so running it from the root reformats unrelated files — `storybook/` in particular has never been prettier-formatted. Check `git status` afterwards and revert anything outside your change.
- **Do not read every file under `agents/` unconditionally.** Load only what the trigger table below calls for.
- **Do not add a file, component, or instruction before checking whether one already covers it.** See the Duplication Check Policy.

---

## Load Triggers

Load base agent files only when the task directly requires them. Do not read all files unconditionally.

| Trigger condition | File to load |
| --- | --- |
| Analyzing code, understanding structure, debugging | `agents/base/analysis.md` |
| Writing or reviewing a git commit message | `agents/base/commit.md` (**REQUIRED**: read before creating any commit — no exceptions) |
| Creating or reviewing a pull request | `agents/base/pr.md` |
| Performing a release or version bump | `agents/base/release.md` |
| Unsure about the development workflow or task sequence | `agents/base/workflow.md` |
| Starting a new task or doing branch-related work | `agents/base/branch.md` |
| Writing, reviewing, or analyzing any test code | `agents/base/testing.md` |
| Writing or reviewing unit tests | `agents/base/unit.md` |
| Writing or reviewing end-to-end tests | `agents/base/e2e.md` |
| Performing overhaul-specific library analysis | `agents/overhaul/library-analysis.md` |

If the branch starts with `v*/`, also load the matching file from `agents/overhaul/` — currently `agents/overhaul/v2.md` for `v2/*` branches.

---

## Agent Priority Order

When multiple instruction sources exist, follow this priority:

1. agents/base/\*
2. agents/overhaul/\*
3. repository documentation

Overhaul agents may extend or override base workflows when necessary.

---

## Repository Workflow Rules

All development work must follow this loop:

ANALYZE → PLAN → IMPLEMENT → TEST → CREATE PR → REVIEW → MERGE → REPEAT

Per-step detail, and when steps may be skipped for direct commits → `agents/base/workflow.md`.

---

## Repo Analysis Load Policy

`.claude/` is gitignored, so `.claude/docs/repo-analysis/` is a local-only cache and is absent on a fresh clone. When it is present, read it before a code/folder modification or analysis task. When it is absent, read the source directly — do not treat the missing folder as an error, and do not block on it. (Not required for trivial chat or unrelated questions.)

---

## External Documentation Policy

When referencing library APIs, framework behavior, or any external documentation:

- Always use the **context7 MCP** to fetch the latest version of the relevant docs
- Do not rely on training knowledge for library specifics — it may be outdated
- Query context7 before implementing anything that depends on a third-party API

This policy applies to **all** of the following situations — not just implementation:

- Verifying whether a specific API, method, or assertion exists in a library
- Reviewing test code for correctness against the library's actual API
- Analyzing bugs or defects that involve third-party behavior
- Confirming that a pattern or usage is valid for the version in use
- Reviewing mock/spy/cleanup behavior of testing frameworks (e.g. vitest, @testing-library/react)
- Reviewing CI/CD action behavior or GitHub Actions runner behavior

**Never report a finding about a library API, framework behavior, or tool behavior without first confirming it via context7.**

---

## Duplication Check Policy

Before performing any task — adding instructions, writing tests, creating triggers, modifying configs, or any other change — always check whether equivalent content already exists.

- Search relevant agent files, config files, and documentation before adding anything new
- If an agent file references another file in its References section, do not add a redundant trigger for the referenced file; load the parent agent and follow its references
- If content already exists that covers the intent, update or extend it rather than duplicating

This applies to all work, not just documentation.

---

## CHANGELOG Maintenance Policy

Every entry in `package/CHANGELOG.md` is written for the people who install the package. Read `agents/base/release.md` → **Changelog Audience** before writing one, including outside a release — it defines what belongs in an entry and what stays in the commit message.

Whenever a breaking change is introduced, always record it in `package/CHANGELOG.md` under the target version's `### Breaking Changes` section.

A breaking change includes any of the following:

- Public API type narrowing or removal (props, method signatures, exported types)
- Renamed or removed exports
- Behavior changes that require consumer code updates

Format:

```markdown
## vX.Y.Z (Unreleased)

### Breaking Changes

- **`TypeName.field` change summary**: `old type` → `new type`
  - Describe what consumers should do instead
```

If the target version section does not exist yet, create it above the previous version.

---

## README Maintenance Policy

Whenever code or documentation is modified, always review `package/README.md` for related content and update it if needed.

This applies to:

- Public API changes (props, types, method signatures)
- New or removed features
- Changed default behaviors or configuration options
- Any type changes that affect how users consume the library

If a change has no user-facing impact, no README update is required — but always explicitly verify this before skipping.

---

## Naming Conventions

All identifiers must follow the conventions defined in the `conventions/` directory.

- **Read before writing** — load the relevant convention file before creating or modifying any name
- `conventions/class-naming.md` — CSS class names, `className`, keyframes, test selectors (`rmap-` prefix required)
- `conventions/code-naming.md` — variables, constants, functions, hooks, types, interfaces (intent-revealing names required)
- CSS custom properties (`--rm-audio-player-*`) are exempt and keep their existing prefix

---

## Localization & Language Policy

- **Primary Language**: All project-related communications and artifacts must be in **English only**.
- **Prohibited**: Do not use Korean in any of the following tasks:
  - Git commit messages
  - Pull Request titles and descriptions
  - README.md updates or any documentation
  - Code comments and inline documentation

---

## Maintenance Rules For Agents

- Use this file as the canonical instruction source
- Update it when commands, structure, workflows, or release flow change
- Keep `CLAUDE.md` and any other agent entrypoint a thin reference to this file — never a copy
- Do not restate a rule that already lives in `agents/` or `conventions/`; link to it instead
- Every path quoted in this file and under `agents/` must resolve — a renamed directory or workflow is a documentation bug. Write it as a full repo-relative path: `.github/workflows/guard-doc-paths.yml` only checks spans that start with a directory, so a bare filename goes unguarded
