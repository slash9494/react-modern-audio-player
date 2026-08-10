import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/utils/ssr";

export const useElementWidth = (ref: React.RefObject<HTMLElement>): number => {
  const [width, setWidth] = useState(0);
  const observedElementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  // No dependency array: the measured element can mount or unmount across
  // renders (e.g. the tooltip, which only renders while hovering), and a
  // RefObject change never triggers React. The identity guard keeps this to an
  // O(1) check per render, so offsetWidth is read (forcing a reflow) only when
  // the element actually changes or the ResizeObserver reports a resize.
  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (element === observedElementRef.current) return;

    observedElementRef.current = element;
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!element) return;

    setWidth(element.offsetWidth);

    // Absent on the same legacy/SSR engines useAutoPlacement guards for; the
    // synchronous measure above still gives a usable width without it.
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setWidth(element.offsetWidth));
    observer.observe(element);
    observerRef.current = observer;
  });

  useIsomorphicLayoutEffect(
    () => () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      // Reset so a StrictMode/dev remount of the same node re-observes it
      // instead of latching on the identity guard above.
      observedElementRef.current = null;
    },
    []
  );

  return width;
};
