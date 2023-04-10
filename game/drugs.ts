export enum DrugNames {
  Cocaine = "cocaine",
  Heroin = "heroin",
  Acid = "acid",
  Weed = "weed",
  Speed = "speed",
  Ludes = "ludes",
}

export class Drugs {
  cocaine: number;
  heroin: number;
  acid: number;
  weed: number;
  speed: number;
  ludes: number;

  constructor() {
    this.cocaine = 0;
    this.heroin = 0;
    this.acid = 0;
    this.weed = 0;
    this.speed = 0;
    this.ludes = 0;
  }
}
