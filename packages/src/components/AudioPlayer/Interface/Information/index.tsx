import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTime } from "./TrackTime";

export const Information: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  return (
    <>
      {activeUI.all || activeUI.artwork ? <Artwork /> : null}
      {activeUI.all || activeUI.trackInfo ? <TrackInfo /> : null}
      {activeUI.all || activeUI.trackTime ? <TrackTime /> : null}
      <Artwork />
    </>
  );
};
