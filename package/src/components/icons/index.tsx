import { FC, SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

const makeMdIcon =
  (paths: string): FC<SvgIconProps> =>
  // eslint-disable-next-line react/display-name
  ({ size = "1em", color, style, ...props }) =>
    (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox="0 0 24 24"
        height={size}
        width={size}
        color={color}
        style={color ? { color, ...style } : style}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        dangerouslySetInnerHTML={{ __html: paths }}
      />
    );

const makeTbIcon =
  (innerSvg: string): FC<SvgIconProps> =>
  // eslint-disable-next-line react/display-name
  ({ size = "1em", ...props }) =>
    (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        dangerouslySetInnerHTML={{ __html: innerSvg }}
      />
    );

const makeImIcon =
  (paths: string, viewBox = "0 0 16 16"): FC<SvgIconProps> =>
  // eslint-disable-next-line react/display-name
  ({ size = "1em", ...props }) =>
    (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox={viewBox}
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        dangerouslySetInnerHTML={{ __html: paths }}
      />
    );

// Material Design icons
export const MdPlayCircleFilled = makeMdIcon(
  '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>'
);
MdPlayCircleFilled.displayName = "MdPlayCircleFilled";

export const MdPauseCircleFilled = makeMdIcon(
  '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>'
);
MdPauseCircleFilled.displayName = "MdPauseCircleFilled";

export const MdPlaylistPlay = makeMdIcon(
  '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 10h11v2H3zM3 6h11v2H3zM3 14h7v2H3zM16 13v8l6-4z"/>'
);
MdPlaylistPlay.displayName = "MdPlaylistPlay";

// Tabler icons
export const TbRepeat = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"/><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"/>'
);
TbRepeat.displayName = "TbRepeat";

export const TbRepeatOnce = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"/><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"/><path d="M11 11l1 -1v4"/>'
);
TbRepeatOnce.displayName = "TbRepeatOnce";

export const TbRepeatOff = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3"/><path d="M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3"/><path d="M3 3l18 18"/>'
);
TbRepeatOff.displayName = "TbRepeatOff";

export const TbArrowsShuffle = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 4l3 3l-3 3"/><path d="M18 20l3 -3l-3 -3"/><path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"/><path d="M21 7h-5a4.978 4.978 0 0 0 -2.998 .998m-4.002 8.003a4.984 4.984 0 0 1 -3 .999h-3"/>'
);
TbArrowsShuffle.displayName = "TbArrowsShuffle";

export const TbVolume = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8a5 5 0 0 1 0 8"/><path d="M17.7 5a9 9 0 0 1 0 14"/><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"/>'
);
TbVolume.displayName = "TbVolume";

export const TbVolume2 = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8a5 5 0 0 1 0 8"/><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"/>'
);
TbVolume2.displayName = "TbVolume2";

export const TbVolume3 = makeTbIcon(
  '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"/><path d="M16 10l4 4m0 -4l-4 4"/>'
);
TbVolume3.displayName = "TbVolume3";

// IcoMoon icons
export const ImPrevious = makeImIcon(
  '<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"/><path d="M7 8l4-3v6z"/><path d="M5 5h2v6h-2v-6z"/>'
);
ImPrevious.displayName = "ImPrevious";

export const ImNext = makeImIcon(
  '<path d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM8 14.5c3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5z"/><path d="M9 8l-4-3v6z"/><path d="M11 5h-2v6h2v-6z"/>'
);
ImNext.displayName = "ImNext";
