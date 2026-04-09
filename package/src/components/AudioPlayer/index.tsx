import React from "react";
import {
  AudioPlayerProvider,
  AudioPlayerRootProvider,
  AudioPlayerRootProviderProps,
} from "@/components/Provider";
import "@/styles/vars.css";
import "@/styles/GlobalStyle.css";
import { defaultInterfacePlacementMaxLength } from "./Context";
import { CustomComponent } from "./Interface/CustomComponent";
import { AudioPlayer, AudioPlayerProps } from "./Player";

export type RMAudioPlayerProps<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
> = AudioPlayerProps<TInterfacePlacementLength> & AudioPlayerRootProviderProps;

function AudioPlayerWithProvidersInner<
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  rootContainerProps,
  ...audioPlayProps
}: RMAudioPlayerProps<TInterfacePlacementLength>) {
  return (
    <AudioPlayerProvider {...audioPlayProps}>
      <AudioPlayerRootProvider rootContainerProps={rootContainerProps}>
        <AudioPlayer {...audioPlayProps} />
      </AudioPlayerRootProvider>
    </AudioPlayerProvider>
  );
}

const AudioPlayerWithProviders = React.memo(
  AudioPlayerWithProvidersInner
) as unknown as typeof AudioPlayerWithProvidersInner & {
  displayName?: string;
  CustomComponent: typeof CustomComponent;
};

AudioPlayerWithProviders.displayName = "AudioPlayerWithProviders";

export default AudioPlayerWithProviders;
