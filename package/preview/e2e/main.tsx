import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");
const root = createRoot(container, {
  // eslint-disable-next-line no-console
  onRecoverableError: (error) => console.error("recovering", error),
});

root.render(<App />);
