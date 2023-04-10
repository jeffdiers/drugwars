import reducer, { updateStage, GameStage } from "./main.slice";

describe("main slice", () => {
  test("should return the initial state", () => {
    const expected = { stage: GameStage.START };

    const actual = reducer(undefined, { type: undefined });

    expect(actual).toEqual(expected);
  });

  test("should handle stage being updated to START", () => {
    const state = { stage: GameStage.START };
    const action = updateStage(GameStage.MAIN);

    const expected = { stage: GameStage.MAIN };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
