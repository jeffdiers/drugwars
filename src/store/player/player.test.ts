import reducer, {
  Areas,
  Drugs,
  changeArea,
  buy,
  sell,
  selectTotalInventory,
  rollPlayerEvents,
  EventActions,
} from "./player.slice";
import { setupStore } from "../store";
import { randomInteger } from "../../utils/helpers";

const setupRollPlayerEvents = (chance: number) => {
  const state = setupStore().getState().player;
  global.Math.random = () => chance;
  const action = rollPlayerEvents();
  return { state, action };
};

describe("player slice", () => {
  test("should return the initial state", () => {
    const expected = {
      area: "bronx",
      daysEnd: 30,
      health: 100,
      money: 2000,
      maxTrench: 100,
      guns: 0,
      cocaine: 0,
      heroin: 0,
      acid: 0,
      weed: 0,
      speed: 0,
      ludes: 0,
      events: [],
      eventAction: undefined,
      cops: 0,
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

  describe("test random number with global Math.random set", () => {
    test.each([
      { expected: 1, setGlobal: 0 },
      { expected: 2, setGlobal: 0.1 },
      { expected: 3, setGlobal: 0.2 },
      { expected: 4, setGlobal: 0.3 },
      { expected: 5, setGlobal: 0.4 },
      { expected: 6, setGlobal: 0.45 },
      { expected: 7, setGlobal: 0.5 },
      { expected: 8, setGlobal: 0.6 },
      { expected: 9, setGlobal: 0.7 },
      { expected: 10, setGlobal: 0.8 },
      { expected: 11, setGlobal: 0.9 },
      { expected: 12, setGlobal: 0.95 },
    ])(
      "expected: $expected, setGlobal: $setGlobal",
      ({ expected, setGlobal }) => {
        global.Math.random = () => setGlobal;

        const actual = randomInteger(1, 12);

        expect(actual).toBe(expected);
      }
    );
  });

  describe("rollPlayerEvents", () => {
    test("player gets mugged", () => {
      const { state, action } = setupRollPlayerEvents(0);
      const expected = {
        ...state,
        money: 1600,
        events: ["** You got mugged!! You lost 400 dollars!! **"],
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("player finds drugs", () => {
      const { state, action } = setupRollPlayerEvents(0.1);
      const expected = {
        ...state,
        cocaine: 2,
        events: ["** You found 2 bags of cocaine on the ground!! FUCK YEAH **"],
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("player dropped drugs", () => {
      let { state, action } = setupRollPlayerEvents(0.2);
      state = reducer(
        state,
        buy({ drug: Drugs.Cocaine, amount: 10, price: 0 })
      );
      const expected = {
        ...state,
        cocaine: 8,
        events: [
          "** Police dogs chase you for 2 blocks! You dropped 2 cocaine! That's a drag man **",
        ],
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("player can upgrade coat", () => {
      const { state, action } = setupRollPlayerEvents(0.3);
      const expected = {
        ...state,
        eventAction: EventActions.UpgradeCoat,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("player can buy gun", () => {
      const { state, action } = setupRollPlayerEvents(0.45);
      const expected = {
        ...state,
        eventAction: EventActions.BuyGun,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("player can get chased by cops", () => {
      const { state, action } = setupRollPlayerEvents(0.6);
      const expected = {
        ...state,
        cops: 3,
        eventAction: EventActions.CopsChase,
      };

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    test("nothing can happen", () => {
      const { state, action } = setupRollPlayerEvents(0.95);
      const expected = state;

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
