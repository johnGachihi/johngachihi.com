import { RemixBrowser } from "@remix-run/react";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/mui/theme";
import { CssBaseline } from "@mui/material";
import { ClientEmotionCacheProvider } from "./styles/mui/setup-utils";
import { hydrate } from "react-dom";

hydrate(
  <ClientEmotionCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RemixBrowser />
    </ThemeProvider>
  </ClientEmotionCacheProvider>,
  document
);