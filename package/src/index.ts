"use client";

import AudioPlayer from "./audioPlayer";

export default AudioPlayer;

export * from "./audioPlayer";
// Documented in README as the escape hatch for native DOM attributes, which
// compound slots do not forward. Only these three — the rest of the Controller
// barrel stays internal.
export {
  PlayBtn,
  PrevBtn,
  NextBtn,
} from "./audioPlayer/Interface/Controller/Transport";
export * from "./audioPlayer/Context";
export * from "./audioPlayer/Player";
export * from "./audioPlayer/Container";
export * from "./audioPlayer/Provider";
export * from "./api";
