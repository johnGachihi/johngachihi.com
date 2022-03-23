import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import theme from "./theme";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

if (process.env.NODE_ENV === "development") {
  const {worker} = require("./api/mock")
  worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true
    }
  }
})

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
