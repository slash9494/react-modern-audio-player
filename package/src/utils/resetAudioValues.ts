import { ElementRefs } from "@/components/AudioPlayer/Context/StateContext";
import { getTimeWithPadStart } from "./getTime";

// FIXME: This function is called directly inside the PREV_AUDIO reducer, making it a side effect.
// Reducers must be pure functions. Calling DOM mutations (audioEl.currentTime = 0) here causes
// React 18 StrictMode to double-invoke the reducer, leading to incorrect navigation behavior.
// Move this call out of the reducer into a useEffect that reacts to an audioResetKey or similar
// state flag. Fix tracked in: v2/fix/reducer-pure
export const resetAudioValues = (
  elementRefs?: ElementRefs,
  duration?: number,
  restart?: boolean
) => {
  if (!elementRefs) return;

  const {
    progressHandleEl,
    progressValueEl,
    trackCurTimeEl,
    trackDurationEl,
    audioEl,
  } = elementRefs;
  if (restart) {
    if (audioEl) {
      audioEl.currentTime = 0;
    }
  }
  if (progressHandleEl && progressValueEl) {
    progressValueEl.style.transform = `scaleX(0)`;
    progressHandleEl.style.transform = `translateX(0px)`;
  }

  if (trackCurTimeEl && trackDurationEl) {
    trackCurTimeEl.innerHTML = "00:00";
    if (!restart) {
      trackDurationEl.innerHTML = duration
        ? getTimeWithPadStart(duration)
        : "00:00";
    }
  }
};
