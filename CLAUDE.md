# Claude Global Instructions

This repository uses modular agent instructions.

Load base agent files only when the task directly requires them. Do not read all files unconditionally.

| Trigger condition | File to load |
|---|---|
| Analyzing code, understanding structure, debugging | `agents/base/analysis.md` |
| Writing or reviewing a git commit message | `agents/base/commit.md` |
| Creating or reviewing a pull request | `agents/base/pr.md` |
| Performing a release or version bump | `agents/base/release.md` |
| Unsure about the development workflow or task sequence | `agents/base/workflow.md` |
| Starting a new task or doing branch-related work | `agents/base/branch.md` |
| Performing overhaul-specific library analysis | `agents/overhaul/library-analysis.md` |

If the branch starts with `v*/`, also load the corresponding agent from `agents/overhaul/`.

---

## External Documentation Policy

When referencing library APIs, framework behavior, or any external documentation:

- Always use the **context7 MCP** to fetch the latest version of the relevant docs
- Do not rely on training knowledge for library specifics — it may be outdated
- Query context7 before implementing anything that depends on a third-party API

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

## Localization & Language Policy

- **Primary Language**: All project-related communications and artifacts must be in **English only**.
- **Prohibited**: Do not use Korean in any of the following tasks:
  - Git commit messages
  - Pull Request titles and descriptions
  - README.md updates or any documentation
  - Code comments and inline documentation
