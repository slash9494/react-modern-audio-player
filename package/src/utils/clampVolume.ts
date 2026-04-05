/**
 * Clamps a volume value to the valid [0, 1] range for HTMLAudioElement.
 * Returns 1 for NaN or non-finite values.
 */
export const clampVolume = (v: number): number =>
  isFinite(v) ? Math.min(Math.max(v, 0), 1) : 1;
