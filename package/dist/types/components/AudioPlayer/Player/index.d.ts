/// <reference types="react" />
import { ActiveUI, PlayListPlacement, CustomIcons, PlayerPlacement, PlayList, InitialStates, InterfacePlacement, CoverImgsCss, VolumeSliderPlacement } from '../../AudioPlayer/Context';
export interface AudioPlayerProps<TInterfacePlacementLength extends number> {
    children?: React.ReactNode;
    playList: PlayList;
    audioInitialState?: InitialStates;
    audioRef?: React.MutableRefObject<HTMLAudioElement>;
    activeUI?: ActiveUI;
    customIcons?: CustomIcons;
    coverImgsCss?: CoverImgsCss;
    placement?: {
        player?: PlayerPlacement;
        playList?: PlayListPlacement;
        interface?: InterfacePlacement<TInterfacePlacementLength>;
        volumeSlider?: VolumeSliderPlacement;
    };
}
export declare const AudioPlayer: <TInterfacePlacementLength extends number = 10>({ audioRef, children, ...restProps }: AudioPlayerProps<TInterfacePlacementLength>) => import("react/jsx-runtime").JSX.Element;
