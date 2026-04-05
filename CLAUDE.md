# Claude Global Instructions

This repository uses modular agent instructions.

Load base agent files only when the task directly requires them. Do not read all files unconditionally.

| Trigger condition                                      | File to load                                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Analyzing code, understanding structure, debugging     | `agents/base/analysis.md`                                                                         |
| Writing or reviewing a git commit message              | `agents/base/commit.md` (**REQUIRED**: Read this file before creating any commit — no exceptions) |
| Creating or reviewing a pull request                   | `agents/base/pr.md`                                                                               |
| Performing a release or version bump                   | `agents/base/release.md`                                                                          |
| Unsure about the development workflow or task sequence | `agents/base/workflow.md`                                                                         |
| Starting a new task or doing branch-related work       | `agents/base/branch.md`                                                                           |
| Writing, reviewing, or analyzing any test code         | `agents/base/testing.md`                                                                          |
| Performing overhaul-specific library analysis          | `agents/overhaul/library-analysis.md`                                                             |

If the branch starts with `v*/`, also load the corresponding agent from `agents/overhaul/`.

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

## Agent Priority Order

When multiple instruction sources exist, follow this priority:

1. agents/base/\*
2. agents/overhaul/\*
3. repository documentation

Overhaul agents may extend or override base workflows when necessary.

---

## Repository Workflow Rules

All development work must follow this loop:

ANALYZE
PLAN
IMPLEMENT
TEST
CREATE PR
REVIEW
MERGE
REPEAT

---

## CHANGELOG Maintenance Policy

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
