import { Drugs } from "./drugs";

export class Prices extends Drugs {
  private randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor() {
    super();
    this.cocaine = this.randomInteger(15000, 29999);
    this.heroin = this.randomInteger(5000, 13999);
    this.acid = this.randomInteger(1000, 4999);
    this.weed = this.randomInteger(300, 899);
    this.speed = this.randomInteger(90, 249);
    this.ludes = this.randomInteger(10, 89);
  }
}
