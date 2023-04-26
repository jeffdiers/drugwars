import { createSlice } from "@reduxjs/toolkit";

import { playerReducers } from "./player.reducers";
import { PlayerState, Areas, ActionEvents } from "./player.types";

const initialState: PlayerState = {
  area: Areas.Bronx,
  daysEnd: 30,
  health: 100,
  money: 2000,
  maxTrench: 100,
  guns: 0,
  cops: 0,
  cocaine: 0,
  heroin: 0,
  acid: 0,
  weed: 0,
  speed: 0,
  ludes: 0,
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
  hitCop,
  hitPlayer,
  healPlayer,
  addPlayerEvent,
  removePlayerEvent,
  askHealPlayer,
  updateActionEvent,
} = playerSlice.actions;

export default playerSlice.reducer;
