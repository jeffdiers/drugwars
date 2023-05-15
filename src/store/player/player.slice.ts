import { createSlice } from "@reduxjs/toolkit";

import { playerReducers } from "./player.reducers";
import { Drugs, Areas, ActionEvents } from "./player.types";
import type { PlayerState } from "./player.types";

export const initialState: PlayerState = {
  area: Areas.Bronx,
  daysEnd: 30,
  health: 100,
  money: 2000,
  maxTrench: 100,
  guns: 0,
  cops: 0,
  [Drugs.One]: 0,
  [Drugs.Two]: 0,
  [Drugs.Three]: 0,
  [Drugs.Four]: 0,
  [Drugs.Five]: 0,
  [Drugs.Six]: 0,
  events: [],
  actionEvent: ActionEvents.Start,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: playerReducers,
});

export const {
  changeArea,
  buy,
  sell,
  depositPlayer,
  withdrawPlayer,
  rollPlayerEvents,
  upgradeCoat,
  buyGun,
  hitPlayer,
  healPlayer,
  addPlayerEvent,
  removePlayerEvent,
  updateActionEvent,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
