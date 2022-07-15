import {
  AudioPlayerProvider,
  SpectrumProvider,
  SpectrumProviderProps,
} from "components/Provider";
import { FC } from "react";
import { GlobalStyle } from "../../GlobalStyle";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export const AudioPlayerWithProvider: FC<
  AudioPlayerProps & SpectrumProviderProps
> = ({ rootContainerProps, ...audioPlayProps }) => {
  return (
    <AudioPlayerProvider>
      <SpectrumProvider rootContainerProps={rootContainerProps}>
        <GlobalStyle />
        <AudioPlayer {...audioPlayProps} />
      </SpectrumProvider>
    </AudioPlayerProvider>
  );
};
