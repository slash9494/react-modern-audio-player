import { FC, memo, useCallback } from "react";
import "./SpeedSelector.css";
import Dropdown from "@/components/Dropdown";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResolvedGridArea } from "../../hooks/useResolvedGridArea";

const DEFAULT_PLAYBACK_RATE_OPTIONS = [
  0.5, 0.75, 1, 1.25, 1.5, 1.75, 2,
] as const;

const formatPlaybackRate = (rate: number): string => `${rate}×`;

export interface SpeedSelectorProps extends GridItemLayoutProps {
  options?: number[];
  formatRate?: (rate: number) => string;
}

export const SpeedSelector: FC<SpeedSelectorProps> = memo(
  function SpeedSelector({ gridArea, visible, options, formatRate, ...rest }) {
    const { playbackRate } = usePlaybackContext();
    const audioPlayerDispatch = useNonNullableContext(
      audioPlayerDispatchContext
    );

    const resolvedGridArea = useResolvedGridArea("playbackRate", gridArea);
    const rateOptions = options ?? [...DEFAULT_PLAYBACK_RATE_OPTIONS];
    const formatRateLabel = formatRate ?? formatPlaybackRate;

    const handleSelectRate = useCallback(
      (rate: number) => {
        audioPlayerDispatch({ type: "SET_PLAYBACK_RATE", playbackRate: rate });
      },
      [audioPlayerDispatch]
    );

    return (
      <Grid.Item
        gridArea={resolvedGridArea}
        visible={visible ?? true}
        {...rest}
      >
        <Dropdown
          triggerType="click"
          placement="top"
          data-testid="speed-selector-dropdown"
        >
          <Dropdown.Trigger
            aria-label={`Playback speed, currently ${formatRateLabel(
              playbackRate
            )}`}
            className="rmap-speed-selector-trigger"
            data-testid="speed-selector-trigger"
          >
            {formatRateLabel(playbackRate)}
          </Dropdown.Trigger>
          <Dropdown.Content>
            <ul
              role="menu"
              aria-label="Playback speed"
              className="rmap-speed-selector-menu"
            >
              {rateOptions.map((rate) => {
                const isActive = rate === playbackRate;
                const optionClassName = isActive
                  ? "rmap-speed-selector-option rmap-speed-selector-option--active"
                  : "rmap-speed-selector-option";
                return (
                  <li key={rate} role="none">
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={optionClassName}
                      data-testid="speed-selector-option"
                      data-rate={rate}
                      onClick={() => handleSelectRate(rate)}
                    >
                      {formatRateLabel(rate)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Dropdown.Content>
        </Dropdown>
      </Grid.Item>
    );
  }
);

SpeedSelector.displayName = "SpeedSelector";
