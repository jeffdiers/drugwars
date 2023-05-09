import reducer, { addInterestBank, depositBank } from "./bank.slice";
import { setupStore } from "../store";

describe("bank slice", () => {
  test("should update interest", () => {
    const store = setupStore();
    let state = store.getState().bank;
    state = reducer(state, depositBank(2000));
    const action = addInterestBank();

    const expected = { ...state, balance: 2100 };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
