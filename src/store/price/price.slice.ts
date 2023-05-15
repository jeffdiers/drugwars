import { createSlice } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import { priceReducers } from "./price.reducers";
import type { PriceState } from "./price.types";
import { priceRanges } from "./price.types";
import { Drugs } from "../player/player.types";

const getRandomPrice = (drug: Drugs) =>
  randomInteger(priceRanges[drug][0], priceRanges[drug][1]);

const initialState: PriceState = {
  [Drugs.One]: getRandomPrice(Drugs.One),
  [Drugs.Two]: getRandomPrice(Drugs.Two),
  [Drugs.Three]: getRandomPrice(Drugs.Three),
  [Drugs.Four]: getRandomPrice(Drugs.Four),
  [Drugs.Five]: getRandomPrice(Drugs.Five),
  [Drugs.Six]: getRandomPrice(Drugs.Six),
  coat: randomInteger(150, 250),
  gun: randomInteger(200, 400),
  heal: randomInteger(1000, 3000),
  foundMoney: randomInteger(6000, 12000),
  events: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: priceReducers,
});

export const { setPrices, rollEvents, removePriceEvent } = priceSlice.actions;

export default priceSlice.reducer;
