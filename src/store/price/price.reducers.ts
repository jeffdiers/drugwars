import { PayloadAction } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import { Drugs } from "../player/player.types";
import { PriceState } from "./price.types";

export const priceReducers = {
  setPrices(state: PriceState, _action: PayloadAction) {
    return {
      ...state,
      [Drugs.One]: randomInteger(15000, 29999),
      [Drugs.Two]: randomInteger(5000, 13999),
      [Drugs.Three]: randomInteger(1000, 4999),
      [Drugs.Four]: randomInteger(300, 899),
      [Drugs.Five]: randomInteger(90, 249),
      [Drugs.Six]: randomInteger(10, 89),
      coat: randomInteger(150, 250),
      gun: randomInteger(200, 400),
      heal: randomInteger(1000, 3000),
    };
  },
  rollEvents(state: PriceState, _action: PayloadAction) {
    let updateState = { ...state };
    //
    // COCAINE EVENTS
    // Drugs.One
    if (1 === randomInteger(1, 40)) {
      updateState[Drugs.One] = Math.floor(updateState[Drugs.One] / 4);
      updateState.events = updateState.events.concat(
        "** Holy shit! You found a time machine to the 80s. Coke is cheap! **"
      );
    }
    if (1 === randomInteger(1, 35)) {
      updateState[Drugs.One] = Math.floor(updateState[Drugs.One] * 2);
      updateState.events = updateState.events.concat(
        "** Cops made a huge cocaine bust! Prices are rising!!! **"
      );
    }
    if (1 === randomInteger(1, 35)) {
      updateState[Drugs.One] = Math.floor(updateState[Drugs.One] * 4);
      updateState.events = updateState.events.concat(
        "** Some pure cocaine just hit the market. Prices are skyrocketing!! **"
      );
    }
    //
    // HEROIN EVENTS
    // Drugs.Two
    if (1 === randomInteger(1, 35)) {
      updateState[Drugs.Two] = Math.floor(updateState[Drugs.Two] / 4);
      updateState.events = updateState.events.concat(
        "** Heroin markets are flooded! Prices have dropped!! **"
      );
    }
    if (1 === randomInteger(1, 25)) {
      updateState[Drugs.Two] = Math.floor(updateState[Drugs.Two] * 2);
      updateState.events = updateState.events.concat(
        "** Cops raided a heroin kingpin's warehouse! Prices are rising!!! **"
      );
    }
    if (1 === randomInteger(1, 25)) {
      updateState[Drugs.Two] = Math.floor(updateState[Drugs.Two] * 4);
      updateState.events = updateState.events.concat(
        "** Trump finished the wall. Prices are skyrocketing!! **"
      );
    }
    //
    // MOLLY EVENTS
    // Drugs.Three
    if (1 === randomInteger(1, 25)) {
      updateState[Drugs.Three] = Math.floor(updateState[Drugs.Three] / 4);
      updateState.events = updateState.events.concat(
        "** Somebody found a reliable method for making molly. It's super cheap! **"
      );
    }
    //
    // LSD EVENTS
    // Drugs.Four
    if (1 === randomInteger(1, 20)) {
      updateState[Drugs.Four] = Math.floor(updateState[Drugs.Four] / 4);
      updateState.events = updateState.events.concat(
        "** The Grateful Dead are in town! The market is flooded with LSD **"
      );
    }
    //
    // MUSHROOMS EVENTS
    // Drugs.Five
    if (1 === randomInteger(1, 20)) {
      updateState[Drugs.Five] = Math.floor(updateState[Drugs.Five] / 4);
      updateState.events = updateState.events.concat(
        "** Shroomfest time! Mushrooms are basically being handed out! **"
      );
    }
    //
    // WEED EVENTS
    // Drugs.Six
    if (1 === randomInteger(1, 20)) {
      updateState[Drugs.Six] = Math.floor(updateState[Drugs.Six] / 4);
      updateState.events = updateState.events.concat(
        "** 420 blaze it! Prices are dropping! **"
      );
    }
    return { ...state, ...updateState };
  },
  removePriceEvent(state: PriceState, _action: PayloadAction) {
    return { ...state, events: state.events.slice(1) };
  },
};
