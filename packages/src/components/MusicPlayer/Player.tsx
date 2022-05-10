import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import { musicPlayerDispatchContext } from "../../lib/musicContext/dispatchContext";
import {
  AudioNativeProps,
  musicPlayerStateContext,
} from "../../lib/musicContext/StateContext";

export const Player: FC = () => {
  const [currentTime, setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");
  const { curAudioState, curPlayId, playList, activeUI } =
    useNonNullableContext(musicPlayerStateContext);
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  const audioNativeStateArr = Object.entries(curAudioState).filter((state) => {
    if (state[0] === "isPlaying" || state[0] === "repeatType") {
      return false;
    }
    return true;
  });
  const audioNativeState: AudioNativeProps =
    Object.fromEntries(audioNativeStateArr);
  const getTime = useCallback((time: number) => {
    const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
    const seconds = `${Math.floor(time % 60)}`.padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, []);
  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      if (event.currentTarget.readyState === 0) return;
      const currentTime = event.currentTarget.currentTime;
      const duration = event.currentTarget.duration;
      setcurrentTime(getTime(currentTime));
      setduration(getTime(duration));

      // const progressBarWidth = (currentTime / duration) * 100;
      // progressBar.current.style.width = `${progressBarWidth}%`;
    },
    [getTime]
  );
  const onPlay = useCallback(() => {
    musicPlayerDispatch({ type: "SET_PlAY_STATE" });
  }, [musicPlayerDispatch]);
  const onPause = useCallback(() => {
    musicPlayerDispatch({ type: "SET_PlAY_STATE" });
  }, [musicPlayerDispatch]);

  useLayoutEffect(() => {
    if (playList.length === 0) {
      console.error("playList is empty");
    }
  }, [playList.length]);

  return (
    <div>
      {playList.length !== 0 && (
        <audio
          onTimeUpdate={onTimeUpdate}
          onPlay={onPlay}
          onPause={onPause}
          src={playList[curPlayId].src}
          {...audioNativeState}
        ></audio>
      )}

      {/* {activeUI.time && (
        <div className="music-timer-wrapper">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      )} */}
    </div>
  );
};
