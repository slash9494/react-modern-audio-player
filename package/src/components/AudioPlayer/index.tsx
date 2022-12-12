import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "@/components/Provider";
import { FC } from "react";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { CustomComponent } from "./Interface/CustomComponent";
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
  CustomComponent: typeof CustomComponent;
};

export default AudioPlayerWithProviders as AudioPlayerComponent;
