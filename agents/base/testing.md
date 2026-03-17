# Testing Agent

You are responsible for defining and maintaining the test strategy for this repository.

---

# Stack

Unit Test Runner: Vitest
Component Testing: @testing-library/react
E2E Runner: Playwright
Coverage: @vitest/coverage-v8

---

## References

- Unit test rules and mock strategy → [agents/base/unit.md](./unit.md)
- E2E test rules, scenarios, and TODO plan → [agents/base/e2e.md](./e2e.md)

---

## Coverage Targets

| Type      | Target |
| --------- | ------ |
| Branches  | 70%    |
| Functions | 80%    |
| Lines     | 80%    |

---

# What NOT to Test

- Third-party library internals (wavesurfer.js, react-spectrum)
- Styled-components CSS output
- Icon rendering details
- Build artifacts in dist/
