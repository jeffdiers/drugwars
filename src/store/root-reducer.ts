import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import type { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import playerReducer from "./player/player.slice";
import priceSlice from "./price/price.slice";
import sharkSlice from "./shark/shark.slice";
import bankSlice from "./bank/bank.slice";
import stashSlice from "./stash/stash.slice";
import leaderboardSlice from "./leaderboard/leaderboard.slice";

const rootReducer = combineReducers({
  player: playerReducer,
  price: priceSlice,
  shark: sharkSlice,
  bank: bankSlice,
  stash: stashSlice,
  leaderboard: leaderboardSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "bank", "price", "shark", "stash", "leaderboard"],
};

export default persistReducer(persistConfig, rootReducer);
