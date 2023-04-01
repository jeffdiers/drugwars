import { DrugWars } from "./index";
import { Player } from "./player";

describe("new game", () => {
  test('DrugWars has newGame and returns "new game"', () => {
    const player = new Player();
    const sut = new DrugWars(player);
    const expected = "new game";

    const actual = sut.newGame();

    expect(actual).toBe(expected);
  });

  test("DrugWars has getPlayerStats and returns correct initial stats", () => {
    const player = new Player();
    const sut = new DrugWars(player);
    const expected = {
      money: 2000,
      cocaine: 0,
      heroin: 0,
      acid: 0,
      weed: 0,
      speed: 0,
      ludes: 0,
      maxTrench: 100,
    };

    const actual = sut.getPlayerStats();

    expect(actual).toEqual(expected);
  });
});
