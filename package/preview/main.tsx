import { createRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container as HTMLElement, {
  onRecoverableError: (error) => console.log("recovering", error),
});

root.render(<App />);
