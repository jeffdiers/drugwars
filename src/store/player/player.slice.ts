import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { randomInteger } from "../../utils/helpers";

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
}

export interface BuyAndSellPayloadAction {
  drug: Drugs;
  amount: number;
  price: number;
}

type PlayerState = {
  readonly area: Areas;
  readonly daysEnd: number;
  readonly money: number;
  readonly maxTrench: number;
  readonly cocaine: number;
  readonly heroin: number;
  readonly acid: number;
  readonly weed: number;
  readonly speed: number;
  readonly ludes: number;
  readonly events: string[];
  readonly eventAction: EventActions | undefined;
};

const initialState: PlayerState = {
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
  events: [],
  eventAction: undefined,
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
    rollPlayerEvents(state, _action: PayloadAction) {
      const updateState = { ...state };
      const choice = randomInteger(1, 5);
      if (choice === 1 && 1 === randomInteger(1, 8)) {
        const lostMoney = state.money - Math.floor(state.money * 0.8);
        updateState.money = updateState.money - lostMoney;
        updateState.events = updateState.events.concat(
          `** You got mugged!! You lost ${lostMoney} dollars!! **`
        );
      }
      if (choice === 2 && 1 === randomInteger(1, 10)) {
        const amount = randomInteger(1, 10);
        const drug: Drugs =
          Object.values(Drugs)[
            randomInteger(1, Object.values(Drugs).length) - 1
          ];
        updateState[drug] = updateState[drug] + amount;
        updateState.events = updateState.events.concat(
          `** You found ${amount} bags of ${drug} on the ground!! FUCK YEAH **`
        );
      }
      if (choice === 3) {
        updateState.eventAction = EventActions.UpgradeCoat;
      }
      return { ...state, ...updateState };
    },
    upgradeCoat(state, action: PayloadAction<number>) {
      return {
        ...state,
        maxTrench: state.maxTrench + 15,
        money: state.money - action.payload,
      };
    },
    addPlayerEvent(state, action: PayloadAction<string>) {
      return { ...state, events: state.events.concat(action.payload) };
    },
    removePlayerEvent(state, _action: PayloadAction) {
      return { ...state, events: state.events.slice(1) };
    },
    removePlayerEventAction(state, _action: PayloadAction) {
      return { ...state, eventAction: undefined };
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
export const selectPlayerEvents = (state: RootState) => state.player.events;
export const selectPlayerEventAction = (state: RootState) =>
  state.player.eventAction;

export const {
  changeArea,
  buy,
  sell,
  depositPlayer,
  withdrawPlayer,
  rollPlayerEvents,
  upgradeCoat,
  addPlayerEvent,
  removePlayerEvent,
  removePlayerEventAction,
} = playerSlice.actions;

export default playerSlice.reducer;
