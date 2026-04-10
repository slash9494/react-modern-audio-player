import { AudioPlayerStateProvider } from "@/components/AudioPlayer/Provider";
import {
  AudioPlayerContainer,
  AudioPlayerContainerProps,
} from "@/components/AudioPlayer/Container";
import "@/styles/vars.css";
import "@/styles/GlobalStyle.css";
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> = AudioPlayerProps<TInterfacePlacementLength> & AudioPlayerContainerProps;

function AudioPlayerWithProviders<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  rootContainerProps,
  ...audioPlayProps
}: RMAudioPlayerProps<TInterfacePlacementLength>) {
  return (
    <AudioPlayerStateProvider {...audioPlayProps}>
      <AudioPlayerContainer rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
      </AudioPlayerContainer>
    </AudioPlayerStateProvider>
  );
}

AudioPlayerWithProviders.displayName = "AudioPlayerWithProviders";
AudioPlayerWithProviders.CustomComponent = CustomComponent;

export default AudioPlayerWithProviders;
