import { DrugNames } from "./drugs";
import { DrugWars } from "./index";
import { Areas } from "./player";

describe("DrugWars", () => {
  describe("has correct properties", () => {
    test.each([{ property: "player" }, { property: "prices" }])(
      "property: $property",
      ({ property }) => {
        const sut = new DrugWars();

        expect(sut).toHaveProperty(property);
      }
    );
  });

  describe("checks if can or cannot buy", () => {
    test.each([
      { drug: DrugNames.Cocaine, amount: 10, expected: 0 },
      { drug: DrugNames.Ludes, amount: 1, expected: 1 },
      { drug: DrugNames.Ludes, amount: 101, expected: 0 },
      { drug: DrugNames.Ludes, amount: 3, expected: 3 },
    ])(
      "drug: $drug, amount: $amount, expected: $expected",
      ({ drug, amount, expected }) => {
        const sut = new DrugWars();

        sut.buyDrugAtCurrentPrice(drug, amount);
        const actualDrug = sut.player[drug];

        expect(actualDrug).toBe(expected);
      }
    );
  });

  describe("checks if can or cannot sell", () => {
    test.each([
      {
        drug: DrugNames.Cocaine,
        hasAmount: 100,
        sellsAmount: 50,
        expectedToHave: 50,
      },
      {
        drug: DrugNames.Cocaine,
        hasAmount: 20,
        sellsAmount: 50,
        expectedToHave: 20,
      },
    ])(
      "drug: $drug, hasAmount: $hasAmount, sellsAmount: $sellsAmount, expectedToHave: $expectedToHave",
      ({ drug, hasAmount, sellsAmount, expectedToHave }) => {
        const sut = new DrugWars();
        sut.player[drug] = hasAmount;
        const expected = expectedToHave;

        sut.sellDrugAtCurrentPrice(drug, sellsAmount);
        const actual = sut.player[drug];

        expect(actual).toBe(expected);
      }
    );
  });

  describe("change area", () => {
    test("sets new area for player", () => {
      const sut = new DrugWars();
      const expected = Areas.Brooklyn;

      sut.changeArea(Areas.Brooklyn);

      const actual = sut.player.currentArea;

      expect(actual).toBe(expected);
    });

    test("updates days end", () => {
      const sut = new DrugWars();
      const expected = 29;

      sut.changeArea(Areas.Brooklyn);

      const actual = sut.player.daysEnd;

      expect(actual).toBe(expected);
    });

    test("changes prices", () => {
      const sut = new DrugWars();
      const pricesBefore = sut.prices;

      sut.changeArea(Areas.Brooklyn);

      const pricesAfter = sut.prices;

      expect(pricesAfter).not.toEqual(pricesBefore);
    });

    test("does not change area, days end, or prices if in same area", () => {
      const sut = new DrugWars();
      const areaBefore = sut.player.currentArea;
      const daysEndBefore = sut.player.daysEnd;
      const pricesBefore = sut.prices;

      sut.changeArea(Areas.Bronx);

      const areaAfter = sut.player.currentArea;
      const daysEndAfter = sut.player.daysEnd;
      const pricesAfter = sut.prices;

      expect(pricesAfter).toEqual(pricesBefore);
      expect(daysEndAfter).toEqual(daysEndBefore);
      expect(areaAfter).toEqual(areaBefore);
    });
  });
});
