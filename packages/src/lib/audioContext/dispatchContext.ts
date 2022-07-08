import { Dispatch, createContext } from "react";
import {
  RepeatType,
  PlayList,
  DropdownPlacement,
  PlayerPlacement,
  ActiveUI,
  ElementRefs,
  IconImgs,
  AudioInitialState,
  InterfacePlacement,
} from "./StateContext";

export type AudioContextAction =
  | { type: "NEXT_AUDIO" }
  | { type: "PREV_AUDIO" }
  | { type: "UPDATE_PLAY_LIST"; playList: PlayList }
  | { type: "SET_INITIAL_AUDIO_STATE"; audioInitialState: AudioInitialState }
  | { type: "SET_PlAY_STATE"; state?: boolean }
  | { type: "SET_CURRENT_INDEX"; currentIndex: number; currentAudioId: number }
  | { type: "SET_REPEAT_TYPE"; repeatType: RepeatType }
  | {
      type: "SET_PLACEMENTS";
      playerPlacement?: PlayerPlacement;
      dropdownPlacement?: DropdownPlacement;
      interfacePlacement?: InterfacePlacement;
    }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_MUTED"; muted: boolean }
  | { type: "SET_ACTIVE_UI"; activeUI: ActiveUI }
  | { type: "SET_ELEMENT_REFS"; elementRefs: ElementRefs }
  | { type: "SET_ICON_IMGS"; iconImgs: IconImgs };
export type AudioPlayerDispatchContext = Dispatch<AudioContextAction>;

export const audioPlayerDispatchContext =
  createContext<AudioPlayerDispatchContext | null>(null);
