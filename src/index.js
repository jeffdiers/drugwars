import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { setupStore } from "./store/store";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";

import "./index.css";
import App from "./app.component";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
