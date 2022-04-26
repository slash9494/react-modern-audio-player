import { FC } from "react";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import {
  AudioNativeProps,
  musicPlayerStateContext,
} from "../../lib/musicContext/StateContext";

export const Player: FC = () => {
  const { curAudioState } = useNonNullableContext(musicPlayerStateContext);
  const audioNativeStateArr = Object.entries(curAudioState).filter((state) => {
    if (state[0] === "muted" || state[0] === "volume") {
      return true;
    }
    return false;
  });
  const audioNativeState: AudioNativeProps =
    Object.fromEntries(audioNativeStateArr);
  return <audio {...audioNativeState}></audio>;
};
