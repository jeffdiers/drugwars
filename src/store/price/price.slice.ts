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
  coat: randomInteger(priceRanges.coat[0], priceRanges.coat[1]),
  gun: randomInteger(priceRanges.gun[0], priceRanges.gun[1]),
  heal: randomInteger(priceRanges.heal[0], priceRanges.heal[1]),
  foundMoney: randomInteger(
    priceRanges.foundMoney[0],
    priceRanges.foundMoney[1]
  ),
  events: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: priceReducers,
});

export const { setPrices, rollEvents, removePriceEvent, clearPriceEvents } =
  priceSlice.actions;

export default priceSlice.reducer;
