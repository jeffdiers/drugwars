import { PayloadAction } from "@reduxjs/toolkit";
import {
  PlayerState,
  Areas,
  Drugs,
  EventActions,
  BuyAndSellPayloadAction,
  inventoryHelper,
} from "./player.slice";
import { randomInteger } from "../../utils/helpers";

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
        const coatPrice = randomInteger(150, 250);
        const canBuyCoat = coatPrice <= state.money;
        if (canBuyCoat) {
          return {
            ...state,
            coatPrice,
            events: state.events.concat(
              `** Would you like to buy 15 more pockets for more drugs? It's $${coatPrice} **`
            ),
            eventAction: EventActions.UpgradeCoat,
          };
        }

        break;

      case 6 || 7:
        const gunPrice = randomInteger(200, 400);
        const coatSpace = state.maxTrench - inventoryHelper(state);
        const canBuyGun = gunPrice <= state.money && coatSpace >= 5;
        if (canBuyGun) {
          return {
            ...state,
            gunPrice,
            events: state.events.concat(
              `** Would you like to buy a gun for $${gunPrice}? **`
            ),
            eventAction: EventActions.BuyGun,
          };
        }

        break;

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
  upgradeCoat(state: PlayerState, _action: PayloadAction) {
    return {
      ...state,
      maxTrench: state.maxTrench + 15,
      money: state.money - state.coatPrice,
      events: state.events
        .slice(1)
        .concat(`** You bought more trench pockets for $${state.coatPrice} **`),
      eventAction: undefined,
    };
  },
  buyGun(state: PlayerState, _action: PayloadAction) {
    return {
      ...state,
      guns: state.guns + 1,
      money: state.money - state.gunPrice,
      events: state.events
        .slice(1)
        .concat(`** You bought a gun for $${state.gunPrice} **`),
      eventAction: undefined,
    };
  },
  hitCop(state: PlayerState, _action: PayloadAction) {
    return { ...state, cops: state.cops - 1 };
  },
  hitPlayer(state: PlayerState, action: PayloadAction<number>) {
    return { ...state, health: state.health - action.payload };
  },
  healPlayer(state: PlayerState, _action: PayloadAction) {
    return { ...state, health: 100 };
  },
  addPlayerEvent(state: PlayerState, action: PayloadAction<string>) {
    return { ...state, events: state.events.concat(action.payload) };
  },
  removePlayerEvent(state: PlayerState, _action: PayloadAction) {
    return { ...state, events: state.events.slice(1) };
  },
  removePlayerEventAction(state: PlayerState, _action: PayloadAction) {
    return { ...state, eventAction: undefined, events: state.events.slice(1) };
  },
};
