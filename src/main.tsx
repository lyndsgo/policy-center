import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

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

enableMocking()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <App />
        </StyledEngineProvider>
      </StrictMode>,
    );
  })
  .catch((error: unknown) => {
    console.error("Failed to start MSW:", error);
    // still render app... would need to work on error states
    createRoot(document.getElementById("root")!).render(<App />);
  });
