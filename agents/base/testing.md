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

---

## Test Analysis Policy

When reviewing test code for defects, apply the following checks:

- Verify each assertion actually validates the intended contract
- Check whether an assertion can pass trivially (e.g., always-true conditions)
  - Example: `some(x => x !== cur)` is trivially true if the implementation already guarantees the value is never `cur` — use `every` instead
- Cross-check assertion logic against the implementation being tested
- Confirm that test setup state matches what the assertion depends on (no dirty shared state)

---

## Race Condition Policy

When writing or reviewing tests that involve async state, DOM updates, or React rendering:

**Forbidden patterns:**

- `waitForTimeout` / `page.waitForTimeout` — fixed delays are fragile and hide timing issues
- Reading a DOM value immediately after a trigger without waiting for the state to settle

**Required patterns:**

- Use `expect.poll(() => ..., { timeout })` to retry assertions until state settles
- For Playwright: use `expect.poll(page.evaluate(...))` when asserting native DOM state (e.g., `audio.paused`, `audio.volume`) after a user interaction
- For Vitest: if async side effects are involved, await all timers/microtasks before asserting (`await vi.runAllTimersAsync()` or `await vi.advanceTimersByTimeAsync(ms)`)

**When to flag a race condition:**

- A `page.evaluate()` or DOM read immediately follows a user interaction without polling
- A React state update flows through `useEffect` before reaching the DOM — the DOM read may be stale
- An assertion reads a value that depends on a browser event dispatch completing (e.g., `input.fill` → `audio.volume`)
