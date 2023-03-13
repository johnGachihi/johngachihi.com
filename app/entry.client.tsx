import { RemixBrowser } from "@remix-run/react";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/mui/theme";
import { CssBaseline } from "@mui/material";
import { ClientEmotionCacheProvider } from "./styles/mui/setup-utils";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientEmotionCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixBrowser />
          </ThemeProvider>
        </ClientEmotionCacheProvider>
      </StrictMode>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
