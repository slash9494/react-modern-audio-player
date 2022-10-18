
import {RMAudioPlayerProps} from '../../../package/dist/types';
import { playList } from './playList';

export const playerMode: Record<
  number,
  RMAudioPlayerProps
> = {
  0: {
    playList:playList,
    placement:{
        interface: {
            templateArea: {
                artwork: "row1-1",
                trackInfo: "row1-2",
                trackTimeCurrent: "row1-3",
                trackTimeDuration: "row1-4",
                progress: "row1-5",
                repeatType: "row1-6",
                volume: "row1-7",
                playButton: "row1-8",
                playList: "row1-9"
            },
        },
        player: 'bottom-left',
    },
    activeUI:{
        all: true,
        progress: "waveform",
    }
  },
  1: {
    playList:playList,
    placement:{
        interface: {
            templateArea: {
                trackTimeDuration: "row1-5",
                progress: "row1-4",
                playButton: "row1-6",
                repeatType: "row1-7",
                volume: "row1-8"
            },
        },
        player: 'static',
    },
    activeUI:{
        progress: 'bar',
        playButton: true,
        repeatType: true,
        volume: true,
        trackTime: true,
        playList: 'unSortable',
    },
    rootContainerProps:{
        colorScheme:'light'
    }
  },
  2: {
    playList:playList,
    placement:{
        interface: {
            templateArea: {
                artwork: "row1-2",
                playList: "row1-3",
                trackInfo: "row2-2",
                trackTimeCurrent: "row3-1",
                progress: "row3-2",
                trackTimeDuration: "row3-3",
                playButton: "row4-2",
                repeatType: "row4-1",
                volume: "row4-3"
            },
        },
        player: 'top-left',
        volumeSlider:'left',
        playList:'top'
    },
    activeUI:{
        all: true,
        progress: 'bar',
    },
  },
  3: {
    playList:playList,
    placement:{
        interface: {
            templateArea: {
                progress:"row1-1",
                playButton:'row2-2',
                playList:'row2-1',
                volume: 'row2-3',
            },
        },
        playList:'bottom',
        player: 'static',
    },
    activeUI:{
        progress: 'bar',
        playButton: true,
        volume: true,
        playList: 'sortable',
        prevNnext: true,
    },
  },
  4: {
    playList:playList,
    placement:undefined,
    activeUI:{
        all: true,
        progress: 'waveform',
    },
  }
};