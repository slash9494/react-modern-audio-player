/**
 * Returns numerator / denominator only when the result is a finite number.
 * Returns the fallback (default 0) for zero denominators, NaN, or Infinity.
 */
export const safeRatio = (
  numerator: number,
  denominator: number,
  fallback = 0
): number => {
  if (!denominator) return fallback;
  const ratio = numerator / denominator;
  return isFinite(ratio) ? ratio : fallback;
};
