import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  },
});

export const selectBankBalance = (state: RootState) => state.bank.balance;

export const { addInterestBank, depositBank, withdrawBank } = bankSlice.actions;

export default bankSlice.reducer;
