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
    addInterestShark(state, _action: PayloadAction) {
      return { ...state, balance: Math.floor(state.balance * state.interest) };
    },
    depositShark(state, action: PayloadAction<number>) {
      return { ...state, balance: state.balance - action.payload };
    },
    withdrawShark(state, action: PayloadAction<number>) {
      return { ...state, balance: state.balance + action.payload };
    },
  },
});

export const selectSharkBalance = (state: RootState) => state.shark.balance;

export const { addInterestShark, depositShark, withdrawShark } =
  sharkSlice.actions;

export default sharkSlice.reducer;
