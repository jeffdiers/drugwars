import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Drugs } from "../player/player.slice";

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initialState = {
  cocaine: randomInteger(15000, 29999),
  heroin: randomInteger(5000, 13999),
  acid: randomInteger(1000, 4999),
  weed: randomInteger(300, 899),
  speed: randomInteger(90, 249),
  ludes: randomInteger(10, 89),
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrices(state, _action: PayloadAction) {
      return {
        ...state,
        cocaine: randomInteger(15000, 29999),
        heroin: randomInteger(5000, 13999),
        acid: randomInteger(1000, 4999),
        weed: randomInteger(300, 899),
        speed: randomInteger(90, 249),
        ludes: randomInteger(10, 89),
      };
    },
  },
});

export const selectPrices = (state: RootState) => state.price;
export const selectDrugPrice = (state: RootState, drug: Drugs) =>
  state.price[drug];

export const { setPrices } = priceSlice.actions;

export default priceSlice.reducer;
