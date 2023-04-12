import React from "react";
import ReactDOM from "react-dom/client";

import { setupStore } from "./store/store";

import App from "./app.component";
import { Provider } from "react-redux";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
