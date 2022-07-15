import { FC, useEffect, useRef, useState } from "react";
import { Tooltip, TooltipTrigger } from "@react-spectrum/tooltip";
import { Trigger } from "./Trigger";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { ActionButton } from "@react-spectrum/button";
import { Content, ContentPlacement } from "./Content";

export const Volume: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [contentPlacement, setContentPlacement] =
    useState<ContentPlacement>("bottom");
  useEffect(() => {
    if (triggerRef.current) {
      const placementValidation = () => {
        if (
          triggerRef.current!.getBoundingClientRect().top <
          window.innerHeight / 2
        ) {
          return "top";
        }
        return "bottom";
      };
      setContentPlacement(placementValidation());
    }
  }, [triggerRef.current]);

  return activeUI.volume ?? activeUI.all ? (
    <TooltipTrigger delay={0}>
      <ActionButton
        aria-label="rs-audio-interface-volume"
        isQuiet
        minWidth={20}
        height={20}
        UNSAFE_style={{ border: "none" }}
      >
        <Trigger aria-label="rs-audio-interface-volume" ref={triggerRef} />
      </ActionButton>

      <Tooltip UNSAFE_className="volume-tooltip">
        <Content placement={contentPlacement} />
      </Tooltip>
    </TooltipTrigger>
  ) : null;
};
