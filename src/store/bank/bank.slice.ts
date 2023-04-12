import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  balance: 0,
  interest: 1.05,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addInterestBank(state, _action: PayloadAction) {
      return { ...state, balance: Math.floor(state.balance * state.interest) };
    },
    depositBank(state, action: PayloadAction<number>) {
      return { ...state, balance: state.balance + action.payload };
    },
    withdrawBank(state, action: PayloadAction<number>) {
      return { ...state, balance: state.balance - action.payload };
    },
  },
});

export const selectBankBalance = (state: RootState) => state.bank.balance;

export const { addInterestBank, depositBank, withdrawBank } = bankSlice.actions;

export default bankSlice.reducer;
