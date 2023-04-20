import reducer, { addInterestShark } from "./shark.slice";
import { setupStore } from "../store";

describe("shark slice", () => {
  test("should update interest", () => {
    const store = setupStore();
    const state = store.getState().shark;
    const action = addInterestShark();

    const expected = { ...state, balance: 5940 };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
