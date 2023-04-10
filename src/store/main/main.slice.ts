import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum GameStage {
  START,
  MAIN,
  BUY,
  SELL,
  JET,
}

const initialState = { stage: GameStage.START };

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateStage(state, action: PayloadAction<GameStage>) {
      return { ...state, stage: action.payload };
    },
  },
});

export const selectStage = (state: RootState) => state.main.stage;

export const { updateStage } = mainSlice.actions;

export default mainSlice.reducer;
