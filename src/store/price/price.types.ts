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
