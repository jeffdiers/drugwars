import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import logger from "redux-logger";

import playerReducer from "./player/player.slice";
import priceSlice from "./price/price.slice";
import sharkSlice from "./shark/shark.slice";
import bankSlice from "./bank/bank.slice";
import stashSlice from "./stash/stash.slice";

const rootReducer = combineReducers({
  player: playerReducer,
  price: priceSlice,
  shark: sharkSlice,
  bank: bankSlice,
  stash: stashSlice,
});

const configMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => {
  if (process.env.NODE_ENV === `development`) {
    return getDefaultMiddleware().concat(logger);
  }
  return getDefaultMiddleware();
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      configMiddleware(getDefaultMiddleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
