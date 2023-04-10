// import { Drugs } from "./player";
import { Prices } from "./prices";
import { DrugNames } from "./drugs";

describe("Prices", () => {
  describe("are between correct range", () => {
    test.each([
      { drug: DrugNames.Cocaine, greaterThan: 15000, lessThan: 29999 },
      { drug: DrugNames.Heroin, greaterThan: 5000, lessThan: 13999 },
      { drug: DrugNames.Acid, greaterThan: 1000, lessThan: 4999 },
      { drug: DrugNames.Weed, greaterThan: 300, lessThan: 899 },
      { drug: DrugNames.Speed, greaterThan: 90, lessThan: 249 },
      { drug: DrugNames.Ludes, greaterThan: 10, lessThan: 89 },
    ])(
      "drug: $drug, greaterThan: $greaterThan, lessThan: $lessThan",
      ({ drug, greaterThan, lessThan }) => {
        const sut = new Prices();

        const actual = sut[drug];

        expect(actual).toBeGreaterThanOrEqual(greaterThan);
        expect(actual).toBeLessThanOrEqual(lessThan);
      }
    );
  });
});
