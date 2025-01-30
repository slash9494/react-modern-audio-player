/// <reference types="react" />
import { ElementRefs } from '../components/AudioPlayer/Context';
export declare type ElementRefsRecord = Partial<Record<keyof ElementRefs, React.RefObject<ElementRefs[keyof ElementRefs]>>>;
export declare const useRefsDispatch: ({ refs }: {
    refs: ElementRefsRecord;
}, deps: Array<any>) => void;
