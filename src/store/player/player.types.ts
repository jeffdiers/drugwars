export enum Areas {
  Bronx = "bronx",
  Ghetto = "ghetto",
  CentralPark = "central park",
  Manhattan = "manhattan",
  ConeyIsland = "coney island",
  Brooklyn = "brooklyn",
}

export enum Drugs {
  Cocaine = "cocaine",
  Heroin = "heroin",
  Acid = "acid",
  Weed = "weed",
  Speed = "speed",
  Ludes = "ludes",
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
  readonly cocaine: number;
  readonly heroin: number;
  readonly acid: number;
  readonly weed: number;
  readonly speed: number;
  readonly ludes: number;
  readonly events: string[];
  readonly actionEvent: ActionEvents;
};
