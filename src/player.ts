export enum Drugs {
  Cocaine = "cocaine",
  Heroin = "heroin",
  Acid = "acid",
  Weed = "weed",
  Speed = "speed",
  Ludes = "ludes",
}

export class Player {
  money: number;
  cocaine: number;
  heroin: number;
  acid: number;
  weed: number;
  speed: number;
  ludes: number;
  maxTrench: number;

  constructor() {
    this.money = 2000;
    this.cocaine = 0;
    this.heroin = 0;
    this.acid = 0;
    this.weed = 0;
    this.speed = 0;
    this.ludes = 0;
    this.maxTrench = 100;
  }

  getDrug(drug: Drugs): number {
    for (let prop in this) {
      if (prop === drug) return this[drug];
    }
    return 0;
  }

  buy(drug: Drugs, amount: number, price: number) {
    const totalPrice = price * amount;
    for (let prop in this) {
      if (prop === drug) {
        this[drug] = amount;
        this.money = this.money - totalPrice;
      }
    }
  }

  sell(drug: Drugs, amount: number, price: number) {
    const totalPrice = price * amount;
    for (let prop in this) {
      if (prop === drug) {
        this[drug] = this[drug] - amount;
        this.money = this.money + totalPrice;
      }
    }
  }

  canBuy(amount: number, price: number) {
    const totalPrice = price * amount;
    const totalInventory =
      this.cocaine +
      this.heroin +
      this.acid +
      this.weed +
      this.speed +
      this.ludes;
    if (totalPrice > this.money || amount + totalInventory > this.maxTrench)
      return false;
    return true;
  }

  canSell(drug: Drugs, amount: number) {
    const hasAmount = this.getDrug(drug);
    if (amount > hasAmount) return false;
    return true;
  }
}
