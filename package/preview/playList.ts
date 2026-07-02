import type { PlayList } from "../src";

export const playList: PlayList = [
  {
    name: "Track 1",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2021/11/04/05/33/dome-6767422_960_720.jpg",
    src: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3",
    id: 1,
  },
  {
    name: "Track 2",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2021/09/06/16/45/nature-6602056__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3",
    id: 2,
  },
  {
    name: "Track 3",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2022/08/29/08/47/sky-7418364__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3",
    id: 3,
  },
  {
    name: "Track 4",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2015/09/22/01/30/lights-951000__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/07/25/audio_3266b47d61.mp3",
    id: 4,
  },
  {
    name: "Track 5",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2022/08/28/18/03/dog-7417233__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
    id: 5,
  },
  {
    name: "Live — SomaFM Groove Salad",
    writer: "live stream (isLive)",
    img: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg",
    src: "https://ice1.somafm.com/groovesalad-128-mp3",
    id: 6,
    isLive: true,
  },
  {
    name: "Long-form 8h (auto-detected, faux-bars)",
    writer: "archive.org · no duration prop — gated via metadata",
    img: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg",
    src: "https://archive.org/download/8HOURSOfRelaxingNatureMusicWithBirdsongMeditationWorkStudySleepRelaxation/8%20HOURS%20of%20Relaxing%20Nature%20Music%20with%20Birdsong%20-%20Meditation%2C%20Work%2C%20Study%2C%20Sleep%2C%20Relaxation.mp3",
    id: 7,
  },
  {
    name: "Hi-res 192kHz/24-bit (byte-size gate → bar)",
    writer: "short duration, >50MB — gated by Content-Length",
    img: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg",
    src: "/preview/assets/audio/hires-192k24bit.wav",
    id: 8,
  },
];
