import React, { cloneElement, FC, PropsWithChildren, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/utils/ssr";
import "@/styles/animations.css";

export interface CssTransitionProps {
  visible: boolean;
  name: string;
  leaveTime: number;
  enterTime: number;
  clearTime: number;
  onExited?: () => void;
  onEntered?: () => void;
}

export const CssTransition: FC<PropsWithChildren<CssTransitionProps>> = ({
  visible,
  name,
  leaveTime,
  enterTime,
  clearTime,
  onExited,
  onEntered,
  children,
}) => {
  const [classNames, setClassNames] = useState("");
  const [renderable, setRenderable] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const time = visible ? enterTime : leaveTime;
    if (visible && !renderable) {
      setRenderable(true);
    }

    setClassNames(`${name}-${statusClassName}`);

    const activateClassTimer = setTimeout(() => {
      setClassNames(
        `${name}-${statusClassName} ${name}-${statusClassName}-active`
      );
      if (statusClassName === "leave") {
        onExited?.();
      } else {
        onEntered?.();
      }
      clearTimeout(activateClassTimer);
    }, time);

    const resetClassesTimer = setTimeout(() => {
      if (!visible) {
        setClassNames(name);
        setRenderable(false);
      }
      clearTimeout(resetClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(activateClassTimer);
      clearTimeout(resetClassesTimer);
    };
  }, [visible, renderable]);

  if (!renderable) return null;

  return cloneElement(children as React.ReactElement, {
    className: `${
      (children as React.ReactElement).props.className
    } ${classNames}`,
  });
};
