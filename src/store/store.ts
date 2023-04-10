import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import mainReducer from "./main/main.slice";
import playerReducer from "./player/player.slice";
import priceSlice from "./price/price.slice";
import sharkSlice from "./shark/shark.slice";

const rootReducer = combineReducers({
  main: mainReducer,
  player: playerReducer,
  price: priceSlice,
  shark: sharkSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
