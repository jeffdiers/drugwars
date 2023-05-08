import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

import { Drugs } from "../player/player.types";

export interface StashPayloadAction {
  drug: Drugs;
  amount: number;
}

export type StashState = {
  readonly [Drugs.One]: number;
  readonly [Drugs.Two]: number;
  readonly [Drugs.Three]: number;
  readonly [Drugs.Four]: number;
  readonly [Drugs.Five]: number;
  readonly [Drugs.Six]: number;
};

const initialState: StashState = {
  [Drugs.One]: 0,
  [Drugs.Two]: 0,
  [Drugs.Three]: 0,
  [Drugs.Four]: 0,
  [Drugs.Five]: 0,
  [Drugs.Six]: 0,
};

const stashSlice = createSlice({
  name: "stash",
  initialState,
  reducers: {
    depositStash(state: StashState, action: PayloadAction<StashPayloadAction>) {
      const { drug, amount } = action.payload;
      return { ...state, [drug]: state[drug] + amount };
    },
    withdrawStash(
      state: StashState,
      action: PayloadAction<StashPayloadAction>
    ) {
      const { drug, amount } = action.payload;
      return { ...state, [drug]: state[drug] - amount };
    },
    resetStash(_state: StashState, _action: PayloadAction) {
      return { ...initialState };
    },
  },
});

export const selectStashBalance = (state: RootState) => state.stash;

export const { depositStash, withdrawStash, resetStash } = stashSlice.actions;

export default stashSlice.reducer;
