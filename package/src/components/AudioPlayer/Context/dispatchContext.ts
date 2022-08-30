import { Dispatch, createContext } from "react";
import {
  RepeatType,
  PlayList,
  PlayListPlacement,
  PlayerPlacement,
  ActiveUI,
  ElementRefs,
  CustomIcons,
  AudioInitialState,
  InterfacePlacement,
  CoverImgsCss,
} from "./StateContext";

export type AudioContextAction =
  | { type: "NEXT_AUDIO" }
  | { type: "PREV_AUDIO" }
  | { type: "UPDATE_PLAY_LIST"; playList: PlayList }
  | { type: "SET_INITIAL_AUDIO_STATE"; audioInitialState: AudioInitialState }
  | { type: "SET_PlAY_STATE"; state?: boolean }
  | { type: "SET_CURRENT_AUDIO"; currentIndex: number; currentAudioId: number }
  | { type: "SET_REPEAT_TYPE"; repeatType: RepeatType }
  | {
      type: "SET_PLACEMENTS";
      playerPlacement?: PlayerPlacement;
      playListPlacement?: PlayListPlacement;
      interfacePlacement?: InterfacePlacement;
    }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_MUTED"; muted: boolean }
  | { type: "SET_ACTIVE_UI"; activeUI: ActiveUI }
  | { type: "SET_ELEMENT_REFS"; elementRefs: ElementRefs }
  | { type: "SET_CUSTOM_ICONS"; customIcons: CustomIcons }
  | { type: "SET_COVER_IMGS_CSS"; coverImgsCss: CoverImgsCss };
export type AudioPlayerDispatchContext = Dispatch<AudioContextAction>;

export const audioPlayerDispatchContext =
  createContext<AudioPlayerDispatchContext | null>(null);
