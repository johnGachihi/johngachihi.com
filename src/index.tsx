import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./test/server/dev-server")
  worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true
    }
  }
})

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}/>
          <App/>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
