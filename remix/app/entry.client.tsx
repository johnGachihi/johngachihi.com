import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/mui/theme";
import { CssBaseline } from "@mui/material";
import { ClientEmotionCacheProvider } from "./styles/mui/setup-utils";

hydrate(
  <ClientEmotionCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RemixBrowser />
    </ThemeProvider>
  </ClientEmotionCacheProvider>,
  document
);
