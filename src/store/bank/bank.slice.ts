import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

export type BankState = {
  readonly balance: number;
  readonly interest: 1.05;
};

const initialState: BankState = {
  balance: 0,
  interest: 1.05,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addInterestBank(state: BankState, _action: PayloadAction) {
      return { ...state, balance: Math.floor(state.balance * state.interest) };
    },
    depositBank(state: BankState, action: PayloadAction<number>) {
      return { ...state, balance: state.balance + action.payload };
    },
    withdrawBank(state: BankState, action: PayloadAction<number>) {
      return { ...state, balance: state.balance - action.payload };
    },
    resetBank(_state: BankState, _action: PayloadAction) {
      return { ...initialState };
    },
  },
});

export const selectBankBalance = (state: RootState) => state.bank.balance;

export const { addInterestBank, depositBank, withdrawBank, resetBank } =
  bankSlice.actions;

export default bankSlice.reducer;
