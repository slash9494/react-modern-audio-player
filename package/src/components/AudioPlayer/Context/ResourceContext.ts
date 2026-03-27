import { createContext } from "react";
import { CoverImgsCss, CustomIcons, ElementRefs } from "./StateContext";

export interface ResourceContext {
  elementRefs?: ElementRefs;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
}

export const resourceContext = createContext<ResourceContext | null>(null);
