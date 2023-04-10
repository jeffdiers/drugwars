import { Shark } from "./shark";

describe("Shark", () => {
  test("applies interest to balance", () => {
    const sut = new Shark();
    const expected = 5940;

    sut.addInterest();

    const actual = sut.balance;

    expect(actual).toBe(expected);
  });

  test("check if can withdraw", () => {
    const sut = new Shark();
    const expected = false;

    const actual = sut.canWithdraw(6500);

    expect(actual).toBe(expected);
  });
});
