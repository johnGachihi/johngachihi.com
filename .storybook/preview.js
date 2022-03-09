import {ThemeProvider} from "@mui/material";
import theme from "../src/theme"
import {MemoryRouter} from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
    Story => (
        <ThemeProvider theme={theme}>
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        </ThemeProvider>
    )
]