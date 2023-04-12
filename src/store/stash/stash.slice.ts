import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { Drugs } from "../player/player.slice";

export interface StashPayloadAction {
  drug: Drugs;
  amount: number;
}

const initialState = {
  cocaine: 0,
  heroin: 0,
  acid: 0,
  weed: 0,
  speed: 0,
  ludes: 0,
};

const stashSlice = createSlice({
  name: "stash",
  initialState,
  reducers: {
    depositStash(state, action: PayloadAction<StashPayloadAction>) {
      const { drug, amount } = action.payload;
      return { ...state, [drug]: state[drug] + amount };
    },
    withdrawStash(state, action: PayloadAction<StashPayloadAction>) {
      const { drug, amount } = action.payload;
      return { ...state, [drug]: state[drug] - amount };
    },
  },
});

export const selectStashBalance = (state: RootState) => state.stash;

export const { depositStash, withdrawStash } = stashSlice.actions;

export default stashSlice.reducer;
