import type { PayloadAction } from "@reduxjs/toolkit";
import { moneyFormatter, randomInteger } from "../../utils/helpers";

import { initialState } from "./player.slice";
import { inventoryHelper } from "./player.selectors";
import { Areas, Drugs, ActionEvents } from "./player.types";
import type { PlayerState, BuyAndSellPayloadAction } from "./player.types";

export const playerReducers = {
  changeArea(state: PlayerState, action: PayloadAction<Areas>) {
    return {
      ...state,
      area: action.payload,
      daysEnd: state.daysEnd - 1,
      actionEvent:
        action.payload === Areas.Bronx ? ActionEvents.Shark : ActionEvents.Main,
    };
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
        if (state.guns < 3) {
          return {
            ...state,
            money: state.money - lostMoney,
            events: state.events.concat(
              `You got mugged!! You lost ${moneyFormatter(lostMoney)}!!`
            ),
          };
        }
        break;

      case 2:
        const amount = randomInteger(1, 10);
        const drug: Drugs =
          Object.values(Drugs)[
            randomInteger(1, Object.values(Drugs).length) - 1
          ];
        const coatSpace = state.maxTrench - inventoryHelper(state);
        if (coatSpace >= amount) {
          return {
            ...state,
            [drug]: state[drug] + amount,
            events: state.events.concat(
              `You found ${amount} ${
                amount === 1 ? `bag` : `bags`
              } of ${drug} on the ground!! FUCK YEAH`
            ),
          };
        }
        break;

      case 3:
        const currentStash = Object.values(Drugs).filter(
          (drug) => state[drug] !== 0
        );
        if (currentStash.length && state.guns < 2) {
          const drug = currentStash[randomInteger(1, currentStash.length) - 1];
          const amount = randomInteger(1, Math.floor(state[drug] / 5));
          const blocks = randomInteger(1, 5);
          return {
            ...state,
            [drug]: state[drug] - amount,
            events: state.events.concat(
              `Police dogs chase you for ${blocks} ${
                blocks === 1 ? `block` : `blocks`
              }! You dropped ${amount} ${drug}! That's a drag man...`
            ),
          };
        }

        break;

      case 4 || 5:
        return { ...state, actionEvent: ActionEvents.BuyCoat };

      case 6 || 7:
        return { ...state, actionEvent: ActionEvents.BuyGun };

      case 8 || 9:
        return {
          ...state,
          cops: randomInteger(1, 4),
          actionEvent: ActionEvents.CopsChase,
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
        `You bought more trench pockets for ${moneyFormatter(action.payload)}`
      ),
    };
  },
  buyGun(state: PlayerState, action: PayloadAction<number>) {
    return {
      ...state,
      guns: state.guns + 1,
      money: state.money - action.payload,
      events: state.events.concat(
        `You bought a gun for ${moneyFormatter(action.payload)}!`
      ),
    };
  },
  healPlayer(state: PlayerState, action: PayloadAction<number>) {
    return {
      ...state,
      health: 100,
      money: state.money - action.payload,
      events: state.events.concat(`You're back to full health!`),
    };
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
  updateActionEvent(state: PlayerState, action: PayloadAction<ActionEvents>) {
    return { ...state, actionEvent: action.payload };
  },
  resetPlayer(_state: PlayerState, _action: PayloadAction) {
    return { ...initialState };
  },
};
