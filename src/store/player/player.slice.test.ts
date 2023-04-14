import reducer, {
  Areas,
  Drugs,
  changeArea,
  buy,
  sell,
  selectTotalInventory,
} from "./player.slice";
import { setupStore } from "../store";

describe("player slice", () => {
  test("should return the initial state", () => {
    const expected = {
      area: "bronx",
      daysEnd: 30,
      money: 2000,
      maxTrench: 100,
      cocaine: 0,
      heroin: 0,
      acid: 0,
      weed: 0,
      speed: 0,
      ludes: 0,
      events: [],
    };

    const actual = reducer(undefined, { type: undefined });

    expect(actual).toEqual(expected);
  });

  test("should handle area being updated ", () => {
    const store = setupStore();
    const state = store.getState().player;
    const action = changeArea(Areas.Ghetto);

    const expected = { ...state, area: Areas.Ghetto, daysEnd: 29 };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player can buy cocaine", () => {
    const state = setupStore().getState().player;
    const input = { drug: Drugs.Cocaine, amount: 1, price: 1000 };
    const action = buy(input);
    const expected = { ...state, cocaine: 1, money: 1000 };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player can buy cocaine twice", () => {
    const state = setupStore().getState().player;
    const input1 = { drug: Drugs.Cocaine, amount: 1, price: 100 };
    const input2 = { drug: Drugs.Cocaine, amount: 1, price: 100 };
    const action1 = buy(input1);
    const action2 = buy(input2);
    const expected = { ...state, cocaine: 2, money: 1800 };

    const actual1 = reducer(state, action1);
    const actual = reducer(actual1, action2);

    expect(actual).toEqual(expected);
  });

  test("player can sell cocaine", () => {
    const state = setupStore().getState().player;
    const input1 = { drug: Drugs.Cocaine, amount: 1, price: 1000 };
    const action1 = buy(input1);
    const input2 = { drug: Drugs.Cocaine, amount: 1, price: 1000 };
    const action2 = sell(input2);
    const expected = { ...state, cocaine: 0, money: 2000 };

    const actual1 = reducer(state, action1);
    const actual = reducer(actual1, action2);

    expect(actual).toEqual(expected);
  });

  test("can select total inventory", () => {
    const state = setupStore().getState();
    const expected = 0;

    const actual = selectTotalInventory(state);

    expect(actual).toBe(expected);
  });
});
