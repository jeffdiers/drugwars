import { Drugs } from "../player/player.types";

export type PriceState = {
  readonly [Drugs.One]: number;
  readonly [Drugs.Two]: number;
  readonly [Drugs.Three]: number;
  readonly [Drugs.Four]: number;
  readonly [Drugs.Five]: number;
  readonly [Drugs.Six]: number;
  readonly coat: number;
  readonly gun: number;
  readonly heal: number;
  readonly foundMoney: number;
  readonly events: string[];
};

export const priceRanges = {
  [Drugs.One]: [15000, 29999],
  [Drugs.Two]: [5000, 13999],
  [Drugs.Three]: [1000, 4999],
  [Drugs.Four]: [300, 899],
  [Drugs.Five]: [90, 299],
  [Drugs.Six]: [10, 89],
  coat: [150, 250],
  gun: [200, 400],
  heal: [1000, 3000],
  foundMoney: [4000, 8000],
};

export const eventPriceRange = {
  one_drop_1: [4500, 16000],
  one_increase_2: [29000, 59999],
  one_increase_1: [70000, 79999],
  two_drop_1: [1500, 6000],
  two_increase_1: [13000, 42000],
  three_drop_1: [300, 1200],
  four_drop_1: [85, 200],
  four_drop_2: [60, 120],
  four_increase_1: [800, 3000],
  five_drop_1: [30, 120],
  five_increase_1: [400, 1500],
  six_drop_1: [4, 20],
};
