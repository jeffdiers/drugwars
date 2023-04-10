import React from "react";
import ReactDOM from "react-dom/client";

import { setupStore } from "./store/store";

import { MainPage } from "../game/main-page";
import { DrugWars } from "../game";
import App from "./app.component";
import { Provider } from "react-redux";

const game = new DrugWars();
const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <MainPage game={game} /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
