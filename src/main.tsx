import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";
import App from "./App.tsx";

async function enableMocking() {
  // mocking will only work if NODE_ENV !== 'production'
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("@/mocks/browser.ts");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
