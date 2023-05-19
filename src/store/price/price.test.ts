import { Drugs } from "../player/player.types";
import { setupStore } from "../store";
import reducer, { setPrices } from "./price.slice";

describe("price slice", () => {
  describe("are between correct range", () => {
    test.each([
      { drug: Drugs.One, greaterThan: 15000, lessThan: 29999 },
      { drug: Drugs.Two, greaterThan: 5000, lessThan: 13999 },
      { drug: Drugs.Three, greaterThan: 1000, lessThan: 4999 },
      { drug: Drugs.Four, greaterThan: 300, lessThan: 899 },
      { drug: Drugs.Five, greaterThan: 90, lessThan: 299 },
      { drug: Drugs.Six, greaterThan: 10, lessThan: 89 },
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
