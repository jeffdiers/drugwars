import { createSlice } from "@reduxjs/toolkit";
import { playerReducers } from "./player.reducers";

export enum Areas {
  Bronx = "bronx",
  Ghetto = "ghetto",
  CentralPark = "central park",
  Manhattan = "manhattan",
  ConeyIsland = "coney island",
  Brooklyn = "brooklyn",
}

export enum Drugs {
  Cocaine = "cocaine",
  Heroin = "heroin",
  Acid = "acid",
  Weed = "weed",
  Speed = "speed",
  Ludes = "ludes",
}

export enum EventActions {
  UpgradeCoat,
  BuyGun,
  CopsChase,
  HealPlayer,
  AskHeal,
}

export interface BuyAndSellPayloadAction {
  drug: Drugs;
  amount: number;
  price: number;
}

export type PlayerState = {
  readonly area: Areas;
  readonly daysEnd: number;
  readonly health: number;
  readonly money: number;
  readonly maxTrench: number;
  readonly guns: number;
  readonly cocaine: number;
  readonly heroin: number;
  readonly acid: number;
  readonly weed: number;
  readonly speed: number;
  readonly ludes: number;
  readonly events: string[];
  readonly eventAction: EventActions | undefined;
  readonly cops: number;
};

const initialState: PlayerState = {
  area: Areas.Bronx,
  daysEnd: 30,
  health: 100,
  money: 2000,
  maxTrench: 100,
  guns: 0,
  cocaine: 0,
  heroin: 0,
  acid: 0,
  weed: 0,
  speed: 0,
  ludes: 0,
  events: [],
  eventAction: undefined,
  cops: 0,
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
  removePlayerEventAction,
  askHealPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
