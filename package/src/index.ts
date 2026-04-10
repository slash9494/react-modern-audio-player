"use client";

import AudioPlayerWithProviders from "./components/AudioPlayer";
import { CustomComponent } from "./components/AudioPlayer/Interface/CustomComponent";

export default AudioPlayerWithProviders;
AudioPlayerWithProviders.CustomComponent = CustomComponent;

export * from "./components/AudioPlayer";
export * from "./components/AudioPlayer/Context";
export * from "./components/AudioPlayer/Player";
export * from "./components/AudioPlayer/Container";
export * from "./components/AudioPlayer/Provider";
export * from "./api";
