import {ThemeProvider} from "@mui/material";
import theme from "../src/theme"
import {MemoryRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "../src/App.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true
    }
  }
})

export const decorators = [
    Story => (
        <ThemeProvider theme={theme}>
            <MemoryRouter>
              <QueryClientProvider client={queryClient}>
                <Story />
              </QueryClientProvider>
            </MemoryRouter>
        </ThemeProvider>
    )
]