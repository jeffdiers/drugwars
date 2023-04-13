import { Drugs } from "../player/player.slice";
import { setupStore } from "../store";
import reducer, { setPrices, rollEvents } from "./price.slice";

describe("price slice", () => {
  describe("are between correct range", () => {
    test.each([
      { drug: Drugs.Cocaine, greaterThan: 15000, lessThan: 29999 },
      { drug: Drugs.Heroin, greaterThan: 5000, lessThan: 13999 },
      { drug: Drugs.Acid, greaterThan: 1000, lessThan: 4999 },
      { drug: Drugs.Weed, greaterThan: 300, lessThan: 899 },
      { drug: Drugs.Speed, greaterThan: 90, lessThan: 249 },
      { drug: Drugs.Ludes, greaterThan: 10, lessThan: 89 },
    ])(
      "drug: $drug, greaterThan: $greaterThan, lessThan: $lessThan",
      ({ drug, greaterThan, lessThan }) => {
        const state = setupStore().getState().price;
        const action = setPrices();

        const sut = reducer(state, action);
        const actual = sut[drug];

        expect(actual).toBeGreaterThanOrEqual(greaterThan);
        expect(actual).toBeLessThanOrEqual(lessThan);
      }
    );
  });
});
