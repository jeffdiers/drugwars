import { PayloadAction } from "@reduxjs/toolkit";
import { randomInteger } from "../../utils/helpers";

import {
  PlayerState,
  Areas,
  Drugs,
  EventActions,
  BuyAndSellPayloadAction,
} from "./player.types";

export const playerReducers = {
  changeArea(state: PlayerState, action: PayloadAction<Areas>) {
    return { ...state, area: action.payload, daysEnd: state.daysEnd - 1 };
  },
  buy(state: PlayerState, action: PayloadAction<BuyAndSellPayloadAction>) {
    const { drug, amount, price } = action.payload;
    const totalPrice = price * amount;
    const money = state.money - totalPrice;
    return { ...state, money, [drug]: state[drug] + amount };
  },
  sell(state: PlayerState, action: PayloadAction<BuyAndSellPayloadAction>) {
    const { drug, amount, price } = action.payload;
    const totalPrice = price * amount;
    const money = state.money + totalPrice;
    return { ...state, money, [drug]: state[drug] - amount };
  },
  depositPlayer(state: PlayerState, action: PayloadAction<number>) {
    return { ...state, money: state.money + action.payload };
  },
  withdrawPlayer(state: PlayerState, action: PayloadAction<number>) {
    return { ...state, money: state.money - action.payload };
  },
  rollPlayerEvents(state: PlayerState, _action: PayloadAction) {
    const choice = randomInteger(1, 12);
    switch (choice) {
      case 1:
        const lostMoney = Math.floor(state.money * 0.2);
        return {
          ...state,
          money: state.money - lostMoney,
          events: state.events.concat(
            `** You got mugged!! You lost ${lostMoney} dollars!! **`
          ),
        };

      case 2:
        const amount = randomInteger(1, 10);
        const drug: Drugs =
          Object.values(Drugs)[
            randomInteger(1, Object.values(Drugs).length) - 1
          ];
        return {
          ...state,
          [drug]: state[drug] + amount,
          events: state.events.concat(
            `** You found ${amount} bags of ${drug} on the ground!! FUCK YEAH **`
          ),
        };

      case 3:
        const currentStash = Object.values(Drugs).filter(
          (drug) => state[drug] !== 0
        );
        if (currentStash.length) {
          const drug = currentStash[randomInteger(1, currentStash.length) - 1];
          const amount = randomInteger(1, Math.floor(state[drug] / 2));
          const blocks = randomInteger(1, 5);
          return {
            ...state,
            [drug]: state[drug] - amount,
            events: state.events.concat(
              `** Police dogs chase you for ${blocks} blocks! You dropped ${amount} ${drug}! That's a drag man **`
            ),
          };
        }

        break;

      case 4 || 5:
        return { ...state, eventAction: EventActions.UpgradeCoat };

      case 6 || 7:
        return { ...state, eventAction: EventActions.BuyGun };

      case 8 || 9:
        return {
          ...state,
          cops: randomInteger(1, 4),
          eventAction: EventActions.CopsChase,
        };

      default:
        return state;
    }
  },
  upgradeCoat(state: PlayerState, action: PayloadAction<number>) {
    return {
      ...state,
      maxTrench: state.maxTrench + 15,
      money: state.money - action.payload,
      events: state.events.concat(
        `** You bought more trench pockets for $${action.payload} **`
      ),
    };
  },
  buyGun(state: PlayerState, action: PayloadAction<number>) {
    return {
      ...state,
      guns: state.guns + 1,
      money: state.money - action.payload,
      events: state.events.concat(
        `** You bought a gun for $${action.payload} **`
      ),
    };
  },
  healPlayer(state: PlayerState, action: PayloadAction<number>) {
    return {
      ...state,
      health: 100,
      money: state.money - action.payload,
      events: state.events.concat(`** You're back to full health! **`),
    };
  },
  hitCop(state: PlayerState, _action: PayloadAction) {
    return { ...state, cops: state.cops - 1 };
  },
  hitPlayer(state: PlayerState, action: PayloadAction<number>) {
    return { ...state, health: state.health - action.payload };
  },
  addPlayerEvent(state: PlayerState, action: PayloadAction<string>) {
    return { ...state, events: state.events.concat(action.payload) };
  },
  removePlayerEvent(state: PlayerState, _action: PayloadAction) {
    return { ...state, events: state.events.slice(1) };
  },
  removePlayerEventAction(state: PlayerState, _action: PayloadAction) {
    return { ...state, eventAction: undefined };
  },
  askHealPlayer(state: PlayerState, _action: PayloadAction) {
    return { ...state, eventAction: EventActions.AskHeal };
  },
};
