import { PayloadAction } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import { PriceState } from "./price.types";

export const priceReducers = {
  setPrices(state: PriceState, _action: PayloadAction) {
    return {
      ...state,
      cocaine: randomInteger(15000, 29999),
      heroin: randomInteger(5000, 13999),
      acid: randomInteger(1000, 4999),
      weed: randomInteger(300, 899),
      speed: randomInteger(90, 249),
      ludes: randomInteger(10, 89),
      coat: randomInteger(150, 250),
      gun: randomInteger(200, 400),
      heal: randomInteger(1000, 3000),
    };
  },
  rollEvents(state: PriceState, _action: PayloadAction) {
    let updateState = { ...state };
    if (1 === randomInteger(1, 35)) {
      updateState.cocaine = Math.floor(updateState.cocaine * 2);
      updateState.events = updateState.events.concat(
        "** Cops raided a coke house! Prices are rising!!! **"
      );
    }
    if (1 === randomInteger(1, 35)) {
      updateState.cocaine = Math.floor(updateState.cocaine * 4);
      updateState.events = updateState.events.concat(
        "** Cokeheads everywhere are ready to pay. Prices are skyrocketing!! **"
      );
    }
    if (1 === randomInteger(1, 25)) {
      updateState.heroin = Math.floor(updateState.heroin * 2);
      updateState.events = updateState.events.concat(
        "** Cops raided a heroin kingpin's warehouse! Prices are rising!!! **"
      );
    }
    if (1 === randomInteger(1, 25)) {
      updateState.heroin = Math.floor(updateState.heroin * 4);
      updateState.events = updateState.events.concat(
        "** Heroin junkies everywhere need their fix. Prices are skyrocketing!! **"
      );
    }
    if (1 === randomInteger(1, 25)) {
      updateState.acid = Math.floor(updateState.acid / 4);
      updateState.events = updateState.events.concat(
        "** Somebody found a reliable method for making acid. It's super cheap! **"
      );
    }
    if (1 === randomInteger(1, 20)) {
      updateState.ludes = Math.floor(updateState.ludes / 4);
      updateState.events = updateState.events.concat(
        "** The pharmacy got robbed! Ludes are extremely cheap **"
      );
    }
    if (1 === randomInteger(1, 20)) {
      updateState.weed = Math.floor(updateState.weed / 4);
      updateState.events = updateState.events.concat(
        "** Hempfest time! Weed is basically being handed out! **"
      );
    }
    if (1 === randomInteger(1, 35)) {
      updateState.heroin = Math.floor(updateState.heroin / 4);
      updateState.events = updateState.events.concat(
        "** Heroin markets are flooded! Prices have dropped!! **"
      );
    }
    if (1 === randomInteger(1, 40)) {
      updateState.cocaine = Math.floor(updateState.cocaine / 4);
      updateState.events = updateState.events.concat(
        "** Holy shit! You found a time machine to the 80s. Coke is cheap! **"
      );
    }
    if (1 === randomInteger(1, 20)) {
      updateState.speed = Math.floor(updateState.speed / 4);
      updateState.events = updateState.events.concat(
        "** Speed markets are flooded! Prices are dropping! **"
      );
    }
    return { ...state, ...updateState };
  },
  removePriceEvent(state: PriceState, _action: PayloadAction) {
    return { ...state, events: state.events.slice(1) };
  },
};
