import reducer, {
  changeArea,
  buy,
  buyGun,
  sell,
  rollPlayerEvents,
} from "./player.slice";
import { ActionEvents, Areas, Drugs } from "./player.types";
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
      cops: 0,
      cocaine: 0,
      adderall: 0,
      molly: 0,
      lsd: 0,
      shrooms: 0,
      weed: 0,
      events: [],
      actionEvent: ActionEvents.Start,
    };

    const actual = reducer(undefined, { type: undefined });

    expect(actual).toEqual(expected);
  });

  test("should handle area being updated ", () => {
    const store = setupStore();
    const state = store.getState().player;
    const action = changeArea(Areas.Queens);

    const expected = {
      ...state,
      area: Areas.Queens,
      daysEnd: 29,
      actionEvent: ActionEvents.Main,
    };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player can buy", () => {
    const state = setupStore().getState().player;
    const input = { drug: Drugs.One, amount: 1, price: 1000 };
    const action = buy(input);
    const expected = { ...state, [Drugs.One]: 1, money: 1000 };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player can buy cocaine twice", () => {
    const state = setupStore().getState().player;
    const input1 = { drug: Drugs.One, amount: 1, price: 100 };
    const input2 = { drug: Drugs.One, amount: 1, price: 100 };
    const action1 = buy(input1);
    const action2 = buy(input2);
    const expected = { ...state, [Drugs.One]: 2, money: 1800 };

    const actual1 = reducer(state, action1);
    const actual = reducer(actual1, action2);

    expect(actual).toEqual(expected);
  });

  test("player can sell cocaine", () => {
    const state = setupStore().getState().player;
    const input1 = { drug: Drugs.One, amount: 1, price: 1000 };
    const action1 = buy(input1);
    const input2 = { drug: Drugs.One, amount: 1, price: 1000 };
    const action2 = sell(input2);
    const expected = { ...state, [Drugs.One]: 0, money: 2000 };

    const actual1 = reducer(state, action1);
    const actual = reducer(actual1, action2);

    expect(actual).toEqual(expected);
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
    test.each([
      {
        input: 0,
        expectedState: {
          money: 1600,
          events: ["You got mugged!! You lost $400!!"],
        },
      },
      {
        input: 0.1,
        expectedState: {
          cocaine: 12,
          events: ["You found 2 bags of cocaine on the ground!! FUCK YEAH"],
        },
      },
      {
        input: 0.2,
        expectedState: {
          cocaine: 9,
          events: [
            "Police dogs chase you for 2 blocks! You dropped 1 cocaine! That's a drag man...",
          ],
        },
      },
      {
        input: 0.3,
        expectedState: {
          actionEvent: ActionEvents.BuyCoat,
        },
      },
      {
        input: 0.45,
        expectedState: {
          actionEvent: ActionEvents.BuyGun,
        },
      },
      {
        input: 0.6,
        expectedState: {
          cops: 3,
          actionEvent: ActionEvents.CopsChase,
        },
      },
      {
        input: 0.95,
        expectedState: {},
      },
    ])(
      "input: $input, expectedState: $expectedState",
      ({ input, expectedState }) => {
        let { state, action } = setupRollPlayerEvents(input);
        state = reducer(state, buy({ drug: Drugs.One, amount: 10, price: 0 }));
        const expected = {
          ...state,
          ...expectedState,
        };

        const actual = reducer(state, action);

        expect(actual).toEqual(expected);
      }
    );
  });

  test("player finds drugs only triggers if player has coat space", () => {
    let { state, action } = setupRollPlayerEvents(0.1);
    state = reducer(state, buy({ drug: Drugs.One, amount: 100, price: 0 }));

    const expected = state;

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player wont get mugged if has more than three guns", () => {
    let { state, action } = setupRollPlayerEvents(0);

    state = reducer(state, buyGun(0));
    state = reducer(state, buyGun(0));
    state = reducer(state, buyGun(0));

    const expected = state;

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  test("player wont get chased by dogs if has more than two guns", () => {
    let { state, action } = setupRollPlayerEvents(0.2);

    state = reducer(state, buyGun(0));
    state = reducer(state, buyGun(0));

    const expected = state;

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
