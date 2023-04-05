import { DrugNames } from "./drugs";
import { DrugWars, GamePhase, GamePrompt } from "./index";
import { Areas } from "./player";

describe("DrugWars", () => {
  describe("has correct properties", () => {
    test.each([
      { property: "player" },
      { property: "prices" },
      { property: "shark" },
      { property: "prompt" },
    ])("property: $property", ({ property }) => {
      const sut = new DrugWars();

      expect(sut).toHaveProperty(property);
    });
  });

  describe("action", () => {
    describe("Start", () => {
      test.each([
        {
          input: "Enter",
          expectedPhase: GamePhase.Main,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "s",
          expectedPhase: GamePhase.Start,
          expectedPrompt: GamePrompt.Start,
        },
      ])(
        "input: $input, expectedPhase: $expectedPhase, expectedPrompt: $expectedPrompt",
        ({ input, expectedPhase, expectedPrompt }) => {
          const sut = new DrugWars();

          sut.action(input);

          const actualPrompt = sut.prompt;
          const actualPhase = sut.phase;

          expect(actualPrompt).toBe(expectedPrompt);
          expect(actualPhase).toBe(expectedPhase);
        }
      );
    });

    describe("Main", () => {
      test.each([
        {
          input: "b",
          expectedPhase: GamePhase.Buy_SelectDrug,
          expectedPrompt: GamePrompt.Buy_SelectDrug,
        },
        {
          input: "p",
          expectedPhase: GamePhase.Main,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "s",
          expectedPhase: GamePhase.Sell_SelectDrug,
          expectedPrompt: GamePrompt.Sell_SelectDrug,
        },
        {
          input: "j",
          expectedPhase: GamePhase.Jet,
          expectedPrompt: GamePrompt.Jet,
        },
      ])(
        "input: $input, expectedPhase: $expectedPhase, expectedPrompt: $expectedPrompt",
        ({ input, expectedPhase, expectedPrompt }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action(input);

          const actualPrompt = sut.prompt;
          const actualPhase = sut.phase;

          expect(actualPrompt).toBe(expectedPrompt);
          expect(actualPhase).toBe(expectedPhase);
        }
      );
    });

    describe("Buy_SelectDrug", () => {
      test.each([
        {
          input: "c",
          expected: DrugNames.Cocaine,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "h",
          expected: DrugNames.Heroin,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "a",
          expected: DrugNames.Acid,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "w",
          expected: DrugNames.Weed,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "s",
          expected: DrugNames.Speed,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "l",
          expected: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Buy_SelectAmount,
        },
        {
          input: "p",
          expected: undefined,
          expectedPrompt: GamePrompt.ErrorWrongLetter,
        },
      ])(
        "input: $input, expected: $expected, expectedPrompt: $expectedPrompt",
        ({ input, expected, expectedPrompt }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action("b");
          sut.action(input);

          const actual = sut.drugToDeal;
          const actualPrompt = sut.prompt;

          expect(actual).toBe(expected);
          expect(actualPrompt).toBe(expectedPrompt);
        }
      );
    });

    describe("Buy_SelectAmount", () => {
      test.each([
        {
          input: "5",
          input2: null,
          inputDrug: "l",
          expected: 5,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "5",
          input2: null,
          inputDrug: "c",
          expected: 0,
          expectedDrug: DrugNames.Cocaine,
          expectedPrompt: GamePrompt.BuyErrorCantBuy,
        },
        {
          input: "1",
          input2: "1",
          inputDrug: "l",
          expected: 11,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "1",
          input2: "0",
          inputDrug: "l",
          expected: 10,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "0",
          input2: null,
          inputDrug: "l",
          expected: 0,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
      ])(
        "input: $input, input2: $input2, inputDrug: $inputDrug, expected: $expected, expectedPrompt: $expectedPrompt",
        ({
          input,
          input2,
          inputDrug,
          expected,
          expectedDrug,
          expectedPrompt,
        }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action("b");
          sut.action(inputDrug);
          sut.action(input);
          input2 && sut.action(input2);
          sut.action("Enter");

          const actual = sut.player[expectedDrug];
          const actualPrompt = sut.prompt;

          expect(actual).toBe(expected);
          expect(actualPrompt).toBe(expectedPrompt);
        }
      );

      test("if cant buy and hit enter go back to buy screen", () => {
        const sut = new DrugWars();
        const expectedPrompt = GamePrompt.Buy_SelectAmount;
        const expectedPhase = GamePhase.Buy_SelectAmount;

        sut.action("Enter");
        sut.action("b");
        sut.action("c");
        sut.action("1");
        sut.action("Enter");
        sut.action("Enter");

        const actualPrompt = sut.prompt;
        const actualPhase = sut.phase;

        expect(actualPrompt).toBe(expectedPrompt);
        expect(actualPhase).toBe(expectedPhase);
      });
    });

    describe("Sell_SelectDrug", () => {
      test.each([
        {
          input: "c",
          expected: DrugNames.Cocaine,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "h",
          expected: DrugNames.Heroin,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "a",
          expected: DrugNames.Acid,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "w",
          expected: DrugNames.Weed,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "s",
          expected: DrugNames.Speed,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "l",
          expected: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Sell_SelectAmount,
        },
        {
          input: "p",
          expected: undefined,
          expectedPrompt: GamePrompt.ErrorWrongLetter,
        },
      ])(
        "input: $input, expected: $expected, expectedPrompt: $expectedPrompt",
        ({ input, expected, expectedPrompt }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action("s");
          sut.action(input);

          const actual = sut.drugToDeal;
          const actualPrompt = sut.prompt;

          expect(actual).toBe(expected);
          expect(actualPrompt).toBe(expectedPrompt);
        }
      );
    });

    describe("Sell_SelectAmount", () => {
      test.each([
        {
          input: "5",
          input2: null,
          inputDrug: "l",
          expected: 5,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "5",
          input2: null,
          inputDrug: "c",
          expected: 0,
          expectedDrug: DrugNames.Cocaine,
          expectedPrompt: GamePrompt.SellError,
        },
        {
          input: "1",
          input2: "1",
          inputDrug: "l",
          expected: 10,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.SellError,
        },
        {
          input: "1",
          input2: "0",
          inputDrug: "l",
          expected: 0,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
        {
          input: "0",
          input2: null,
          inputDrug: "l",
          expected: 10,
          expectedDrug: DrugNames.Ludes,
          expectedPrompt: GamePrompt.Main,
        },
      ])(
        "input: $input, input2: $input2, inputDrug: $inputDrug, expected: $expected, expectedPrompt: $expectedPrompt",
        ({
          input,
          input2,
          inputDrug,
          expected,
          expectedDrug,
          expectedPrompt,
        }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action("b");
          sut.action("l");
          sut.action("10");
          sut.action("Enter");

          sut.action("Enter");
          sut.action("s");
          sut.action(inputDrug);
          sut.action(input);
          input2 && sut.action(input2);
          sut.action("Enter");

          const actual = sut.player[expectedDrug];
          const actualPrompt = sut.prompt;

          expect(actual).toBe(expected);
          expect(actualPrompt).toBe(expectedPrompt);
        }
      );

      test("if cant buy and hit enter go back to buy screen", () => {
        const sut = new DrugWars();
        const expectedPrompt = GamePrompt.Buy_SelectAmount;
        const expectedPhase = GamePhase.Buy_SelectAmount;

        sut.action("Enter");
        sut.action("b");
        sut.action("c");
        sut.action("1");
        sut.action("Enter");
        sut.action("Enter");

        const actualPrompt = sut.prompt;
        const actualPhase = sut.phase;

        expect(actualPrompt).toBe(expectedPrompt);
        expect(actualPhase).toBe(expectedPhase);
      });
    });
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

    test("adds interest to shark", () => {
      const sut = new DrugWars();
      const balanceBefore = sut.shark.balance;

      sut.changeArea(Areas.Brooklyn);

      const balanceAfter = sut.shark.balance;

      expect(balanceAfter).toBeGreaterThan(balanceBefore);
    });

    test("does not change area, days end, add interest, or prices if in same area", () => {
      const sut = new DrugWars();
      const areaBefore = sut.player.currentArea;
      const daysEndBefore = sut.player.daysEnd;
      const pricesBefore = sut.prices;
      const balanceBefore = sut.shark.balance;

      sut.changeArea(Areas.Bronx);

      const areaAfter = sut.player.currentArea;
      const daysEndAfter = sut.player.daysEnd;
      const pricesAfter = sut.prices;
      const balanceAfter = sut.shark.balance;

      expect(pricesAfter).toEqual(pricesBefore);
      expect(daysEndAfter).toEqual(daysEndBefore);
      expect(areaAfter).toEqual(areaBefore);
      expect(balanceAfter).toEqual(balanceBefore);
    });
  });

  describe("loan shark", () => {
    test("player can borrow from", () => {
      const sut = new DrugWars();
      const expectedMoney = 3000;
      const expectedShark = 6500;

      sut.borrowFromShark(1000);

      const acutalMoney = sut.player.money;
      const actualShark = sut.shark.balance;

      expect(acutalMoney).toBe(expectedMoney);
      expect(actualShark).toBe(expectedShark);
    });

    test("cannot borrow more than you owe", () => {
      const sut = new DrugWars();
      const expectedMoney = 2000;
      const expectedShark = 5500;

      sut.borrowFromShark(6000);

      const acutalMoney = sut.player.money;
      const actualShark = sut.shark.balance;

      expect(acutalMoney).toBe(expectedMoney);
      expect(actualShark).toBe(expectedShark);
    });

    test("cannot borrow more than you have", () => {
      const sut = new DrugWars();
      const expectedMoney = 2000;
      const expectedShark = 5500;

      sut.borrowFromShark(3000);

      const acutalMoney = sut.player.money;
      const actualShark = sut.shark.balance;

      expect(acutalMoney).toBe(expectedMoney);
      expect(actualShark).toBe(expectedShark);
    });
  });
});
