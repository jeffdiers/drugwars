import { DrugWars } from "./index";

describe("new game", () => {
  test('drugWars class has newGame and returns "new game"', () => {
    const sut = new DrugWars();
    const expected = "new game";

    const actual = sut.newGame();

    expect(actual).toBe(expected);
  });
});
