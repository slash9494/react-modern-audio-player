const SECONDS_PER_HOUR = 3600;

export const formatClockTime = (time: number) => {
  if (!Number.isFinite(time) || time < 0) return "--:--";

  const minutes = `${Math.floor((time % SECONDS_PER_HOUR) / 60)}`.padStart(
    2,
    "0"
  );
  const seconds = `${Math.floor(time % 60)}`.padStart(2, "0");

  if (time >= SECONDS_PER_HOUR) {
    const hours = Math.floor(time / SECONDS_PER_HOUR);
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};
