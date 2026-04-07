import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement, {
  // eslint-disable-next-line no-console
  onRecoverableError: (error) => console.error("recovering", error),
});

root.render(<App />);
