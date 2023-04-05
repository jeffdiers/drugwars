import { Player, Areas } from "./player";
import { DrugNames } from "./drugs";

describe("Player", () => {
  describe("can get amount of a drug", () => {
    test("can get cocaine", () => {
      const sut = new Player();
      const expected = 0;

      const actual = sut.getDrug(DrugNames.Cocaine);

      expect(actual).toBe(expected);
    });

    test("can buy a drug and get amount", () => {
      const sut = new Player();
      sut.buy(DrugNames.Weed, 420, 3);
      const expected = 420;

      const actual = sut.getDrug(DrugNames.Weed);

      expect(actual).toBe(expected);
    });
  });

  describe("can buy all drugs", () => {
    test.each([
      { drug: DrugNames.Cocaine, amount: 30, price: 2, expectedMoney: 1940 },
      { drug: DrugNames.Heroin, amount: 10, price: 3, expectedMoney: 1970 },
      { drug: DrugNames.Acid, amount: 24, price: 5, expectedMoney: 1880 },
      { drug: DrugNames.Weed, amount: 2, price: 420, expectedMoney: 1160 },
      { drug: DrugNames.Speed, amount: 5, price: 5, expectedMoney: 1975 },
      { drug: DrugNames.Ludes, amount: 5, price: 5, expectedMoney: 1975 },
    ])(
      "drug: $drug, amount: $amount, price $price, expectedMoney: $expectedMoney",
      ({ drug, amount, price, expectedMoney }) => {
        const sut = new Player();
        sut.buy(drug, amount, price);

        const actualAmount = sut.getDrug(drug);
        const actualMoney = sut.money;

        expect(actualAmount).toEqual(amount);
        expect(actualMoney).toEqual(expectedMoney);
      }
    );
  });

  describe("can sell all drugs", () => {
    test.each([
      { drug: DrugNames.Cocaine, amount: 3, price: 1000, expectedMoney: 5000 },
      { drug: DrugNames.Heroin, amount: 3, price: 1000, expectedMoney: 5000 },
      { drug: DrugNames.Acid, amount: 4, price: 1000, expectedMoney: 6000 },
      { drug: DrugNames.Weed, amount: 1, price: 420, expectedMoney: 2420 },
      { drug: DrugNames.Speed, amount: 5, price: 5, expectedMoney: 2025 },
      { drug: DrugNames.Ludes, amount: 5, price: 5, expectedMoney: 2025 },
    ])(
      "drug: $drug, amount: $amount, price $price, expectedMoney: $expectedMoney",
      ({ drug, amount, price, expectedMoney }) => {
        const sut = new Player();
        sut.buy(drug, amount, 0);
        sut.sell(drug, amount, price);

        const actualAmount = sut.getDrug(drug);
        const actualMoney = sut.money;

        expect(actualAmount).toEqual(0);
        expect(actualMoney).toEqual(expectedMoney);
      }
    );
  });

  describe("checks if player can buy drug", () => {
    test.each([
      { amount: 3, price: 3000, expected: false },
      { amount: 3, price: 100, expected: true },
      { amount: 300, price: 1, expected: false },
      { amount: 30, price: 1, expected: true },
      { amount: 300, price: 100, expected: false },
    ])(
      "amount: $amount, price: $price, expected: $expected",
      ({ amount, price, expected }) => {
        const sut = new Player();

        const actual = sut.canBuy(amount, price);

        expect(actual).toBe(expected);
      }
    );

    test("cannot buy if has inventory and amount is more than max trench", () => {
      const sut = new Player();
      sut.buy(DrugNames.Weed, 20, 0);
      sut.buy(DrugNames.Heroin, 60, 0);
      const expected = false;

      const actual = sut.canBuy(40, 1);

      expect(actual).toBe(expected);
    });

    test("can buy if has inventory and amount is less than max trench", () => {
      const sut = new Player();
      sut.buy(DrugNames.Weed, 20, 0);
      sut.buy(DrugNames.Heroin, 60, 0);
      const expected = true;

      const actual = sut.canBuy(10, 1);

      expect(actual).toBe(expected);
    });
  });

  describe("checks if player can sell drug", () => {
    test.each([
      { drug: DrugNames.Cocaine, amount: 300, expected: false },
      { drug: DrugNames.Cocaine, amount: 100, expected: true },
    ])(
      "drug: $drug, amount: $amount, expected: $expected",
      ({ drug, amount, expected }) => {
        const sut = new Player();
        sut.buy(DrugNames.Cocaine, 200, 0);

        const actual = sut.canSell(drug, amount);

        expect(actual).toBe(expected);
      }
    );
  });
});
