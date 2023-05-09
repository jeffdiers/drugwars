import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import type { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import type { RootState } from "./root-reducer";

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const configMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => {
  const defaultMiddle = () =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  if (process.env.NODE_ENV === `development`) {
    return defaultMiddle().concat(logger);
  }
  return defaultMiddle();
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      configMiddleware(getDefaultMiddleware),
  });
};

export const store = setupStore();

export const persistor = persistStore(store);
