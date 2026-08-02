import { FC, memo, useCallback, useRef, MouseEvent } from "react";
import "./SpeedSelector.css";
import Dropdown from "@/ui/Dropdown";
import Grid, { GridItemLayoutProps } from "@/ui/Grid";
import { SpeedSelectorPlacement } from "@/components/AudioPlayer/Context/StateContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { dropdownContext } from "@/ui/Dropdown/DropdownContext";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useResolvedGridArea } from "../../hooks/useResolvedGridArea";
import { useResolvedDropdownProps } from "../../hooks/useResolvedDropdownProps";

const DEFAULT_PLAYBACK_RATE_OPTIONS = [
  0.5, 0.75, 1, 1.25, 1.5, 1.75, 2,
] as const;

const formatPlaybackRate = (rate: number): string => `${rate}×`;

interface SpeedSelectorMenuProps {
  rateOptions: readonly number[];
  playbackRate: number;
  formatRateLabel: (rate: number) => string;
}

const SpeedSelectorMenu: FC<SpeedSelectorMenuProps> = ({
  rateOptions,
  playbackRate,
  formatRateLabel,
}) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { setIsOpen } = useNonNullableContext(dropdownContext);

  const handleSelectRate = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const rate = Number(event.currentTarget.dataset.rate);
      audioPlayerDispatch({ type: "SET_PLAYBACK_RATE", playbackRate: rate });
      setIsOpen(false);
    },
    [audioPlayerDispatch, setIsOpen]
  );

  return (
    <div
      role="group"
      aria-label="Playback speed"
      className="rmap-speed-selector-menu"
    >
      {rateOptions.map((rate) => {
        const isActive = rate === playbackRate;
        const optionClassName = isActive
          ? "rmap-speed-selector-option rmap-speed-selector-option--active"
          : "rmap-speed-selector-option";
        return (
          <button
            key={rate}
            type="button"
            aria-pressed={isActive}
            className={optionClassName}
            data-testid="speed-selector-option"
            data-rate={rate}
            onClick={handleSelectRate}
          >
            {formatRateLabel(rate)}
          </button>
        );
      })}
    </div>
  );
};

export interface SpeedSelectorProps extends GridItemLayoutProps {
  options?: number[];
  formatRate?: (rate: number) => string;
  triggerType?: "click" | "hover";
  placement?: SpeedSelectorPlacement;
}

export const SpeedSelector: FC<SpeedSelectorProps> = memo(
  function SpeedSelector({
    gridArea,
    visible,
    options,
    formatRate,
    triggerType,
    placement,
    ...rest
  }) {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { playbackRate } = usePlaybackContext();
    const { speedSelectorPlacement: contextSpeedSelectorPlacement } =
      useUIContext();

    const resolvedGridArea = useResolvedGridArea("playbackRate", gridArea);
    const rateOptions = options ?? DEFAULT_PLAYBACK_RATE_OPTIONS;
    const formatRateLabel = formatRate ?? formatPlaybackRate;

    const { triggerType: resolvedTriggerType, placement: resolvedPlacement } =
      useResolvedDropdownProps({
        triggerType,
        placement,
        contextPlacement: contextSpeedSelectorPlacement,
        triggerRef,
        defaults: { triggerType: "click", placement: "top" },
      });

    return (
      <Grid.Item
        gridArea={resolvedGridArea}
        visible={visible ?? true}
        padding="0"
        {...rest}
      >
        <Dropdown
          triggerType={resolvedTriggerType}
          placement={resolvedPlacement}
          data-testid="speed-selector-dropdown"
        >
          <Dropdown.Trigger
            ref={triggerRef}
            aria-label={`Playback speed, currently ${formatRateLabel(
              playbackRate
            )}`}
            className="rmap-speed-selector-trigger"
            data-testid="speed-selector-trigger"
          >
            {formatRateLabel(playbackRate)}
          </Dropdown.Trigger>
          <Dropdown.Content>
            <SpeedSelectorMenu
              rateOptions={rateOptions}
              playbackRate={playbackRate}
              formatRateLabel={formatRateLabel}
            />
          </Dropdown.Content>
        </Dropdown>
      </Grid.Item>
    );
  }
);

SpeedSelector.displayName = "SpeedSelector";
