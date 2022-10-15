import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "@/components/Provider";
import { FC } from "react";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps = AudioPlayerProps & SpectrumProviderProps;

export const AudioPlayerWithProvider: FC<RMAudioPlayerProps> = ({
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
