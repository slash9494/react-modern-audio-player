import { FC } from "react";
import { AudioPlayerProvider } from "../../lib/audioContext";
import { GlobalStyle } from "../../GlobalStyle";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export const AudioPlayerWithProvider: FC<AudioPlayerProps> = (props) => (
  <AudioPlayerProvider>
    <GlobalStyle />
    <AudioPlayer {...props} />
  </AudioPlayerProvider>
);
