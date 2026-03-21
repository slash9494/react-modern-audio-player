import { createRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container as HTMLElement, {
  onRecoverableError: (error) => console.log("recovering", error),
});

// TODO: Re-enable StrictMode after fixing the side effect in the PREV_AUDIO reducer.
// StrictMode intentionally double-invokes reducers in development to catch impure functions.
// The PREV_AUDIO case calls resetAudioValues() (a DOM mutation) inside the reducer,
// which causes the second invocation to see currentTime=0 and navigate instead of reset.
// Fix tracked in: v2/fix/reducer-pure
root.render(<App />);
