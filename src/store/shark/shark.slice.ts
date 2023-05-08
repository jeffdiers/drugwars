import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

export type SharkState = {
  readonly balance: number;
  readonly interest: 1.08;
};

const initialState: SharkState = {
  balance: 5500,
  interest: 1.08,
};

const sharkSlice = createSlice({
  name: "shark",
  initialState,
  reducers: {
    addInterestShark(state: SharkState, _action: PayloadAction) {
      return { ...state, balance: Math.floor(state.balance * state.interest) };
    },
    depositShark(state: SharkState, action: PayloadAction<number>) {
      return { ...state, balance: state.balance - action.payload };
    },
    withdrawShark(state: SharkState, action: PayloadAction<number>) {
      return { ...state, balance: state.balance + action.payload };
    },
    resetShark(_state: SharkState, _action: PayloadAction) {
      return { ...initialState };
    },
  },
});

export const selectSharkBalance = (state: RootState) => state.shark.balance;

export const { addInterestShark, depositShark, withdrawShark, resetShark } =
  sharkSlice.actions;

export default sharkSlice.reducer;
