import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

export interface BuyAndSellPayloadAction {
  drug: Drugs;
  amount: number;
  price: number;
}

const initialState = {
  area: Areas.Bronx,
  daysEnd: 30,
  money: 2000,
  maxTrench: 100,
  cocaine: 0,
  heroin: 0,
  acid: 0,
  weed: 0,
  speed: 0,
  ludes: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeArea(state, action: PayloadAction<Areas>) {
      return { ...state, area: action.payload, daysEnd: state.daysEnd - 1 };
    },
    buy(state, action: PayloadAction<BuyAndSellPayloadAction>) {
      const { drug, amount, price } = action.payload;
      const totalPrice = price * amount;
      const money = state.money - totalPrice;
      return { ...state, money, [drug]: state[drug] + amount };
    },
    sell(state, action: PayloadAction<BuyAndSellPayloadAction>) {
      const { drug, amount, price } = action.payload;
      const totalPrice = price * amount;
      const money = state.money + totalPrice;
      return { ...state, money, [drug]: state[drug] - amount };
    },
    depositPlayer(state, action: PayloadAction<number>) {
      return { ...state, money: state.money + action.payload };
    },
    withdrawPlayer(state, action: PayloadAction<number>) {
      return { ...state, money: state.money - action.payload };
    },
  },
});

export const selectPlayer = (state: RootState) => state.player;
export const selectArea = (state: RootState) => state.player.area;
export const selectMoney = (state: RootState) => state.player.money;
export const selectTotalInventory = (state: RootState) => {
  return (
    state.player.cocaine +
    state.player.heroin +
    state.player.acid +
    state.player.weed +
    state.player.speed +
    state.player.ludes
  );
};
export const selectMaxBuy = (state: RootState, drug: Drugs) => {
  const price = state.price[drug];
  const maxAmount = Math.floor(state.player.money / price);
  const coatSpace = state.player.maxTrench - selectTotalInventory(state);
  if (maxAmount > coatSpace) return coatSpace;
  return maxAmount;
};
export const selectMaxSell = (state: RootState, drug: Drugs) => {
  return state.player[drug];
};

export const { changeArea, buy, sell, depositPlayer, withdrawPlayer } =
  playerSlice.actions;

export default playerSlice.reducer;
