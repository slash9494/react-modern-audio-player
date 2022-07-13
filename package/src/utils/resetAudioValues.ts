import { ElementRefs } from "lib/audioContext/StateContext";
import { getTimeWithPadStart } from "./getTime";

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
  if (restart && audioEl) {
    audioEl.currentTime = 0;
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
