export enum Areas {
  Bronx = "bronx",
  Queens = "queens",
  CentralPark = "central park",
  Manhattan = "manhattan",
  ConeyIsland = "coney island",
  Brooklyn = "brooklyn",
}

export enum Drugs {
  One = "cocaine",
  Two = "molly",
  Three = "lsd",
  Four = "shrooms",
  Five = "adderall",
  Six = "weed",
}

export type DrugsMap = {
  [key: string]: number;
};

export interface BuyAndSellPayloadAction {
  drug: Drugs;
  amount: number;
  price: number;
}

export enum ActionEvents {
  Start,
  Instructions,
  Leaderboard,
  Shark,
  Bank,
  Stash,
  Main,
  Buy,
  Sell,
  Jet,
  CopsChase,
  BuyCoat,
  BuyGun,
  Heal,
  GameOver,
}

export type PlayerState = {
  readonly area: Areas;
  readonly daysEnd: number;
  readonly health: number;
  readonly money: number;
  readonly maxTrench: number;
  readonly guns: number;
  readonly cops: number;
  readonly [Drugs.One]: number;
  readonly [Drugs.Two]: number;
  readonly [Drugs.Three]: number;
  readonly [Drugs.Four]: number;
  readonly [Drugs.Five]: number;
  readonly [Drugs.Six]: number;
  readonly events: string[];
  readonly actionEvent: ActionEvents;
};
