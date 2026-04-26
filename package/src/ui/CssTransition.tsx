import React, {
  cloneElement,
  FC,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
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

  // Latest-ref mirrors so the timer callbacks below always invoke the
  // newest props without taking them as effect dependencies. Adding the
  // raw props to the dep array would restart the timers on every parent
  // render that recreates the callback identity, breaking the animation.
  const onEnteredRef = useRef(onEntered);
  const onExitedRef = useRef(onExited);
  const nameRef = useRef(name);
  const enterTimeRef = useRef(enterTime);
  const leaveTimeRef = useRef(leaveTime);
  const clearTimeRef = useRef(clearTime);

  // Sync the mirrors inside a committed layout effect — never in the
  // render body. Under Concurrent Mode an interrupted render could
  // otherwise leak uncommitted values into timeouts scheduled by a
  // prior commit's effect. Declared before the animation effect so
  // the same commit cycle always refreshes the refs first.
  useIsomorphicLayoutEffect(() => {
    onEnteredRef.current = onEntered;
    onExitedRef.current = onExited;
    nameRef.current = name;
    enterTimeRef.current = enterTime;
    leaveTimeRef.current = leaveTime;
    clearTimeRef.current = clearTime;
  });

  useIsomorphicLayoutEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const transitionName = nameRef.current;
    const time = visible ? enterTimeRef.current : leaveTimeRef.current;
    if (visible && !renderable) {
      setRenderable(true);
    }

    setClassNames(`${transitionName}-${statusClassName}`);

    const activateClassTimer = setTimeout(() => {
      setClassNames(
        `${transitionName}-${statusClassName} ${transitionName}-${statusClassName}-active`
      );
      if (statusClassName === "leave") {
        onExitedRef.current?.();
      } else {
        onEnteredRef.current?.();
      }
    }, time);

    const resetClassesTimer = setTimeout(() => {
      if (!visible) {
        setClassNames(transitionName);
        setRenderable(false);
      }
    }, time + clearTimeRef.current);

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
