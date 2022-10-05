import {
  audioPlayerDispatchContext,
  ElementRefs,
} from "@/components/AudioPlayer/Context";
import { useEffect } from "react";
import { useNonNullableContext } from ".";

export type ElementRefsRecord = Partial<
  Record<keyof ElementRefs, React.RefObject<ElementRefs[keyof ElementRefs]>>
>;

export const useRefsDispatch = (
  { refs }: { refs: ElementRefsRecord },
  deps: Array<any>
) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  useEffect(() => {
    const isAllExist = Object.values(refs).every((ref) => ref.current);
    if (isAllExist) {
      const elementRefs = Object.entries(refs).reduce(
        (accObj, [key, ref]) => ({ ...accObj, [key]: ref.current }),
        {}
      ) as ElementRefs;

      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs,
      });
    }
  }, [audioPlayerDispatch, ...Object.values(refs), ...deps]);
};
