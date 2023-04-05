import React from "react";
import ReactDOM from "react-dom/client";

import { MainPage } from "./main-page";
import { DrugWars } from "./game";

const game = new DrugWars();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainPage game={game} />
  </React.StrictMode>
);
