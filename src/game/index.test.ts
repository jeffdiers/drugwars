import { DrugNames } from "./drugs";
import { DrugWars, GamePhase } from "./index";
import { Areas } from "./player";

describe("DrugWars", () => {
  describe("action", () => {
    describe("Start", () => {
      test.each([
        { input: "Enter", expected: GamePhase.Main },
        { input: "s", expected: GamePhase.Start },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = new DrugWars();

        sut.action(input);

        const actualPhase = sut.phase;

        expect(actualPhase).toBe(expected);
      });
    });

    describe("Main", () => {
      test.each([
        { input: "b", expected: GamePhase.Buy_SelectDrug },
        { input: "p", expected: GamePhase.Main },
        { input: "s", expected: GamePhase.Sell_SelectDrug },
        { input: "j", expected: GamePhase.Jet },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action(input);

        const actualPhase = sut.phase;

        expect(actualPhase).toBe(expected);
      });
    });

    describe("Jet", () => {
      test.each([
        { input: "1", expected: Areas.Bronx },
        { input: "2", expected: Areas.Ghetto },
        { input: "3", expected: Areas.CentralPark },
        { input: "4", expected: Areas.Manhattan },
        { input: "5", expected: Areas.ConeyIsland },
        { input: "6", expected: Areas.Brooklyn },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action("j");
        sut.action(input);

        const actual = sut.player.currentArea;

        expect(actual).toBe(expected);
      });

      test("player changes area and menu is main", () => {
        const sut = new DrugWars();
        const expected = GamePhase.Main;

        sut.action("Enter");
        sut.action("j");
        sut.action("6");

        const actual = sut.phase;

        expect(actual).toBe(expected);
      });

      test("player enters a letter", () => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action("j");
        sut.action("p");

        const actual = sut.errorJet;

        expect(actual).toBeTruthy();
      });

      test("player enters a number not in list", () => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action("j");
        sut.action("7");

        const actual = sut.errorJet;

        expect(actual).toBeTruthy();
      });
    });

    describe("Buy_SelectDrug", () => {
      test.each([
        { input: "c", expected: DrugNames.Cocaine },
        { input: "h", expected: DrugNames.Heroin },
        { input: "a", expected: DrugNames.Acid },
        { input: "w", expected: DrugNames.Weed },
        { input: "s", expected: DrugNames.Speed },
        { input: "l", expected: DrugNames.Ludes },
        { input: "p", expected: undefined },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action("b");
        sut.action(input);

        const actual = sut.drugToDeal;

        expect(actual).toBe(expected);
      });
    });

    describe("Buy_SelectAmount", () => {
      test.each([
        {
          input: "5",
          input2: null,
          inputDrug: "l",
          expected: 5,
        },
        {
          input: "5",
          input2: null,
          inputDrug: "c",
          expected: 0,
        },
        {
          input: "1",
          input2: "1",
          inputDrug: "l",
          expected: 11,
        },
        {
          input: "1",
          input2: "0",
          inputDrug: "l",
          expected: 10,
        },
        {
          input: "0",
          input2: null,
          inputDrug: "l",
          expected: 0,
        },
      ])(
        "input: $input, input2: $input2, inputDrug: $inputDrug, expected: $expected",
        ({ input, input2, inputDrug, expected }) => {
          const sut = new DrugWars();

          sut.action("Enter");
          sut.action("b");
          sut.action(inputDrug);
          sut.action(input);
          input2 && sut.action(input2);
          sut.action("Enter");

          const actual = sut.player.totalInventory();

          expect(actual).toBe(expected);
        }
      );

      test("if cant buy and hit enter go back to buy phase", () => {
        const sut = new DrugWars();
        const expectedPhase = GamePhase.Buy_SelectAmount;

        sut.action("Enter");
        sut.action("b");
        sut.action("c");
        sut.action("1");
        sut.action("Enter");
        sut.action("Enter");

        const actualPhase = sut.phase;

        expect(actualPhase).toBe(expectedPhase);
      });
    });

    describe("Sell_SelectDrug", () => {
      test.each([
        { input: "c", expected: DrugNames.Cocaine },
        { input: "h", expected: DrugNames.Heroin },
        { input: "a", expected: DrugNames.Acid },
        { input: "w", expected: DrugNames.Weed },
        { input: "s", expected: DrugNames.Speed },
        { input: "l", expected: DrugNames.Ludes },
        { input: "p", expected: undefined },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const sut = new DrugWars();

        sut.action("Enter");
        sut.action("s");
        sut.action(input);

        const actual = sut.drugToDeal;

        expect(actual).toBe(expected);
      });
    });

    describe("Sell_SelectAmount", () => {
      test.each([
        {
          input: "5",
          input2: null,
          inputDrug: "l",
          expected: 5,
        },
        {
          input: "5",
          input2: null,
          inputDrug: "c",
          expected: 10,
        },
        {
          input: "1",
          input2: "1",
          inputDrug: "l",
          expected: 10,
        },
        {
          input: "1",
          input2: "0",
          inputDrug: "l",
          expected: 0,
        },
        {
          input: "0",
          input2: null,
          inputDrug: "l",
          expected: 10,
        },
      ])(
        "input: $input, input2: $input2, inputDrug: $inputDrug, expected: $expected",
        ({ input, input2, inputDrug, expected }) => {
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

          const actual = sut.player.totalInventory();

          expect(actual).toBe(expected);
        }
      );

      test("if cant sell and hit enter go back to buy screen", () => {
        const sut = new DrugWars();
        const expectedPhase = GamePhase.Sell_SelectAmount;

        sut.action("Enter");
        sut.action("s");
        sut.action("c");
        sut.action("1");
        sut.action("Enter");
        sut.action("Enter");

        const actualPhase = sut.phase;

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
