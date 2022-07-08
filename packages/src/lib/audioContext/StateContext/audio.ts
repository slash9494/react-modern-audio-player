export type AudioNativeProps = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
>;

export type RepeatType = "ALL" | "SHUFFLE" | "ONE" | "NONE";
export type AudioCustomProps = {
  isPlaying: boolean;
  repeatType?: RepeatType;
  volume: number;
  currentTime?: number;
  duration?: number;
};

// TODO : 사용자의 추가적인 타입;
export type AudioData = {
  src: string;
  id: number;
  index: number;
  name?: string;
  artist?: string;
  img?: string;
};

export type CurAudioState = AudioNativeProps & AudioCustomProps;
export type AudioInitialState = Partial<CurAudioState> & {
  curPlayId: number;
};
