import { Dispatch, createContext } from "react";
import { AudioInitialState } from "../../components/MusicPlayer";
import {
  RepeatType,
  PlayList,
  DropdownPlacement,
  PlayerPlacement,
} from "./StateContext";

export type MusicContextAction =
  | { type: "NEXT_MUSIC" }
  | { type: "PREV_MUSIC" }
  | { type: "UPDATE_PLAY_LIST"; playList: PlayList }
  | { type: "SET_INITIAL_AUDIO_STATE"; audioInitialState: AudioInitialState }
  | { type: "SET_PlAY_STATE" }
  | { type: "SET_CURRENT_INDEX"; currentIndex: number; currentMusicId: number }
  | { type: "SET_REPEAT_TYPE"; repeatType: RepeatType }
  | {
      type: "SET_PLACEMENTS";
      playerPlacement?: PlayerPlacement;
      dropdownPlacement?: DropdownPlacement;
    };

export type MusicPlayerDispatchContext = Dispatch<MusicContextAction>;

export const musicPlayerDispatchContext =
  createContext<MusicPlayerDispatchContext | null>(null);
