import { MutableRefObject, useEffect } from "react";

const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const callback = (event: MouseEvent) => {
      const el = ref.current;
      const { target } = event;
      if (!event || !el || el.contains(target as Node)) return;
      handler(event);
    };

    document.addEventListener("click", callback);
    return () => document.removeEventListener("click", callback);
  }, [ref, handler]);
};

export default useClickOutside;
