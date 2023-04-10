import { Drugs, DrugNames } from "./drugs";

describe("Drugs", () => {
  test.each([
    { expected: DrugNames.Cocaine },
    { expected: DrugNames.Heroin },
    { expected: DrugNames.Acid },
    { expected: DrugNames.Weed },
    { expected: DrugNames.Speed },
    { expected: DrugNames.Ludes },
  ])("expected: $expected", ({ expected }) => {
    const sut = new Drugs();

    expect(sut).toHaveProperty(expected, 0);
  });
});
