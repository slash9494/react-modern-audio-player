import { View } from "@react-spectrum/view";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "lib/audioContext/StateContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTimeCurrent, TrackTimeDuration } from "./TrackTime";

export const Information: FC = () => {
  const { interfacePlacement } = useNonNullableContext(audioPlayerStateContext);
  return (
    <>
      <View
        gridArea={
          interfacePlacement?.artwork || defaultInterfacePlacement.artwork
        }
        justifySelf={"center"}
      >
        <Artwork />
      </View>
      <View
        gridArea={
          interfacePlacement?.trackInfo || defaultInterfacePlacement.trackInfo
        }
        justifySelf={"center"}
      >
        <TrackInfo />
      </View>
      <View
        gridArea={
          interfacePlacement?.trackTimeCurrent ||
          defaultInterfacePlacement.trackTimeCurrent
        }
        justifySelf={"center"}
      >
        <TrackTimeCurrent />
      </View>
      <View
        gridArea={
          interfacePlacement?.trackTimeDuration ||
          defaultInterfacePlacement.trackTimeDuration
        }
        justifySelf={"center"}
      >
        <TrackTimeDuration />
      </View>
    </>
  );
};
