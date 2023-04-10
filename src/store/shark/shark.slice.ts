import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  balance: 5500,
  interest: 1.08,
};

const sharkSlice = createSlice({
  name: "shark",
  initialState,
  reducers: {
    addInterest(state, _action: PayloadAction) {
      return { ...state, balance: state.balance * state.interest };
    },
  },
});

export const selectSharkBalance = (state: RootState) => state.shark.balance;

export const { addInterest } = sharkSlice.actions;

export default sharkSlice.reducer;
