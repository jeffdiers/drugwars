import { createSlice } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import { priceReducers } from "./price.reducers";
import { PriceState } from "./price.types";

const initialState: PriceState = {
  cocaine: randomInteger(15000, 29999),
  heroin: randomInteger(5000, 13999),
  acid: randomInteger(1000, 4999),
  weed: randomInteger(300, 899),
  speed: randomInteger(90, 249),
  ludes: randomInteger(10, 89),
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
