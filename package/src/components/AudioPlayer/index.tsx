import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "@/components/Provider";
import { FC } from "react";
import { GlobalStyle } from "../../styles/GlobalStyle";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export const AudioPlayerWithProvider: FC<
  AudioPlayerProps & SpectrumProviderProps
> = ({ rootContainerProps, ...audioPlayProps }) => {
  return (
    <AudioPlayerProvider>
      <SpectrumProvider rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
        <GlobalStyle />
      </SpectrumProvider>
    </AudioPlayerProvider>
  );
};
