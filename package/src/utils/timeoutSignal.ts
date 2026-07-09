/**
 * Aborts after `ms` via AbortController (broader support than AbortSignal.timeout).
 * Returns null when AbortController is unavailable so callers run untimed instead of throwing.
 * Caller must invoke `cancel()` once the awaited work settles to clear the pending timer.
 */
export const createTimeoutSignal = (
  ms: number
): { signal: AbortSignal; cancel: () => void } | null => {
  if (typeof AbortController === "undefined") return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
};
