import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum GameStage {
  START,
  SHARK,
  BANK,
  STASH,
  MAIN,
  BUY,
  SELL,
  JET,
  COPS_CHASE,
  GAME_OVER,
}

const initialState = {
  stage: GameStage.START,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateStage(state, action: PayloadAction<GameStage>) {
      return { ...state, stage: action.payload };
    },
  },
});

export const selectStage = (state: RootState) => {
  if (state.player.health <= 0 || state.player.daysEnd === 0)
    return GameStage.GAME_OVER;
  return state.main.stage;
};
export const selectProfit = (state: RootState) =>
  state.player.money + state.bank.balance - state.shark.balance;
export const selectDealerRank = (state: RootState) => {
  const profit = state.player.money + state.bank.balance - state.shark.balance;
  const rank = profit > 0 ? Math.floor((profit / 10000000) * 100) : 0;
  return rank > 100 ? 100 : rank;
};

export const { updateStage } = mainSlice.actions;

export default mainSlice.reducer;
