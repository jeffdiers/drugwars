import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../root-reducer";

import { Drugs, ActionEvents } from "./player.types";
import type { PlayerState, DrugsMap } from "./player.types";

export const inventoryHelper = (playerState: PlayerState) => {
  let total = playerState.guns * 5;
  Object.values(Drugs).forEach((drug) => (total += playerState[drug]));
  return total;
};

const selectPlayer = (state: RootState): PlayerState => state.player;

export const selectPlayerInventory = createSelector(selectPlayer, (player) => {
  let inventory: DrugsMap = {};
  Object.values(Drugs).map((drug) => (inventory[drug] = player[drug]));
  return inventory;
});

export const selectPlayerMoney = createSelector(
  selectPlayer,
  (player) => player.money
);

export const selectPlayerCoatSpace = createSelector(
  selectPlayer,
  (player) => player.maxTrench - inventoryHelper(player)
);

export const selectPlayerArea = createSelector(
  selectPlayer,
  (player) => player.area
);

export const selectPlayerEvents = createSelector(
  selectPlayer,
  (player) => player.events
);

export const selectPlayerCops = createSelector(
  selectPlayer,
  (player) => player.cops + 1
);

export const selectPlayerHealth = createSelector(
  selectPlayer,
  (player) => player.health
);

export const selectPlayerGuns = createSelector(
  selectPlayer,
  (player) => player.guns
);

export const selectPlayerDaysEnd = createSelector(
  selectPlayer,
  (player) => player.daysEnd
);

export const selectPlayerActionEvent = createSelector(
  selectPlayer,
  (player) => {
    if (player.health <= 0 || player.daysEnd === 0)
      return ActionEvents.GameOver;
    return player.actionEvent;
  }
);
