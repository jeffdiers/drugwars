import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Drugs, DrugsMap } from "../player/player.types";

import { PriceState } from "./price.types";

const selectPrice = (state: RootState): PriceState => state.price;

export const selectPriceDrugs = createSelector(selectPrice, (price) => {
  let inventory: DrugsMap = {};
  Object.values(Drugs).map((drug) => (inventory[drug] = price[drug]));
  return inventory;
});

export const selectPriceGun = createSelector(selectPrice, (price) => price.gun);

export const selectPriceCoat = createSelector(
  selectPrice,
  (price) => price.coat
);

export const selectPriceHeal = createSelector(
  selectPrice,
  (price) => price.heal
);

export const selectPriceEvents = createSelector(
  selectPrice,
  (price) => price.events
);
