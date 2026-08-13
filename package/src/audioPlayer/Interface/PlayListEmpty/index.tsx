import { FC, ReactNode } from "react";

export const PLAYLIST_EMPTY_SLOT = "PlayListEmpty";

export interface PlayListEmptyProps {
  children?: ReactNode;
}

export const PlayListEmpty: FC<PlayListEmptyProps> = () => null;

PlayListEmpty.displayName = PLAYLIST_EMPTY_SLOT;
