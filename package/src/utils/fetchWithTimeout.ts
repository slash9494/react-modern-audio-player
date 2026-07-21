/**
 * Fetches `input` but never rejects: resolves the Response on success, or null on
 * any failure (timeout, abort, network error, CORS, or when `fetch` is undefined).
 * Callers treat null as fail-open. Leaves no dangling timer on either path.
 */
export const fetchWithTimeout = (
  input: RequestInfo,
  init: RequestInit,
  ms: number
): Promise<Response | null> => {
  if (typeof fetch === "undefined") return Promise.resolve(null);

  // AbortController has broader support than AbortSignal.timeout.
  if (typeof AbortController !== "undefined") {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    // Deferring the call turns a synchronous throw from a non-spec fetch into a
    // rejection too, so it also fails open to null and still clears the timer.
    return Promise.resolve()
      .then(() => fetch(input, { ...init, signal: controller.signal }))
      .catch(() => null)
      .then((response) => {
        clearTimeout(timer);
        return response;
      });
  }

  // AbortController-less engines (legacy Edge 14/15, polyfilled-fetch envs) cannot
  // cancel the request, so race it against a manual timer that fails open to null.
  const pending = Promise.resolve()
    .then(() => fetch(input, init))
    .catch(() => null);
  return Promise.race([
    pending,
    new Promise<Response | null>((resolve) => {
      const timer = setTimeout(() => resolve(null), ms);
      // `.then` (not `.finally`) clears the timer: those same engines predate
      // Promise.prototype.finally, and `pending` never rejects (it has `.catch`).
      pending.then(() => clearTimeout(timer));
    }),
  ]);
};
