import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
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

export const inventoryHelper = (playerState: PlayerState) => {
  let total = playerState.guns * 5;
  Object.values(Drugs).forEach((drug) => (total += playerState[drug]));
  return total;
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: playerReducers,
});

export const selectPlayer = (state: RootState): PlayerState => state.player;
export const selectPlayerArea = (state: RootState): Areas => state.player.area;
export const selectMoney = (state: RootState): number => state.player.money;
export const selectTotalInventory = (state: RootState): number =>
  inventoryHelper(state.player);
export const selectCoatSpace = (state: RootState): number => {
  return state.player.maxTrench - inventoryHelper(state.player);
};
export const selectPlayerEvents = (state: RootState): string[] =>
  state.player.events;
export const selectPlayerEventAction = (
  state: RootState
): EventActions | undefined => state.player.eventAction;
export const selectCopsAmount = (state: RootState): number => state.player.cops;
export const selectPlayerHealth = (state: RootState): number =>
  state.player.health;
export const selectPlayerGuns = (state: RootState): number => state.player.guns;
export const selectCanBuyGun = (state: RootState): boolean => {
  const coatSpace = state.player.maxTrench - inventoryHelper(state.player);
  const canBuyGun = state.price.gun <= state.player.money && coatSpace >= 5;
  return canBuyGun;
};
export const selectCops = (state: RootState): number => state.player.cops;

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
