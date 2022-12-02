import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "@/components/Provider";
import { FC } from "react";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { GridItem } from "../Grid/Item";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps = AudioPlayerProps & SpectrumProviderProps;

const AudioPlayerWithProviders: FC<RMAudioPlayerProps> = ({
  rootContainerProps,
  ...audioPlayProps
}) => {
  return (
    <AudioPlayerProvider {...audioPlayProps}>
      <SpectrumProvider rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
        <GlobalStyle />
      </SpectrumProvider>
    </AudioPlayerProvider>
  );
};

type AudioPlayerComponent = typeof AudioPlayerWithProviders & {
  customComponent: typeof GridItem;
};

export default AudioPlayerWithProviders as AudioPlayerComponent;
