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
  readonly events: string[];
};

export const priceRanges = {
  [Drugs.One]: [15000, 29999],
  [Drugs.Two]: [5000, 13999],
  [Drugs.Three]: [1000, 4999],
  [Drugs.Four]: [300, 899],
  [Drugs.Five]: [90, 249],
  [Drugs.Six]: [10, 89],
};
