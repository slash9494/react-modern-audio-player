import {
  cloneElement,
  FC,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { keyframes } from "styled-components";

export const appearanceIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.95)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.05)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

export const appearanceOut = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.5)",
  },
});

interface _CssTransitionProps {
  visible: boolean;
  name: string;
  leaveTime: number;
  enterTime: number;
  clearTime: number;
  onExited?: () => void;
  onEntered?: () => void;
}

export const CssTransition: FC<PropsWithChildren<_CssTransitionProps>> = ({
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
  useLayoutEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const time = visible ? enterTime : leaveTime;
    if (visible && !renderable) {
      setRenderable(true);
    }

    setClassNames(`${name}-${statusClassName}`);

    // set class to active
    const timer = setTimeout(() => {
      setClassNames(
        `${name}-${statusClassName} ${name}-${statusClassName}-active`
      );
      if (statusClassName === "leave") {
        onExited?.();
      } else {
        onEntered?.();
      }
      clearTimeout(timer);
    }, time);

    // remove classNames when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClassNames(name);
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);

  if (!renderable) return null;

  return cloneElement(children as React.ReactElement, { classNames });
};
