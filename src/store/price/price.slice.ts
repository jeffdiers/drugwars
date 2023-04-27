import { createSlice } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import { priceReducers } from "./price.reducers";
import { PriceState } from "./price.types";
import { Drugs } from "../player/player.types";

const initialState: PriceState = {
  [Drugs.One]: randomInteger(15000, 29999),
  [Drugs.Two]: randomInteger(5000, 13999),
  [Drugs.Three]: randomInteger(1000, 4999),
  [Drugs.Four]: randomInteger(300, 899),
  [Drugs.Five]: randomInteger(90, 249),
  [Drugs.Six]: randomInteger(10, 89),
  coat: randomInteger(150, 250),
  gun: randomInteger(200, 400),
  heal: randomInteger(1000, 3000),
  events: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: priceReducers,
});

export const { setPrices, rollEvents, removePriceEvent } = priceSlice.actions;

export default priceSlice.reducer;
