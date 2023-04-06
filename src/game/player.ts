import { Drugs, DrugNames } from "./drugs";

export enum Areas {
  Bronx = "bronx",
  Ghetto = "ghetto",
  CentralPark = "central park",
  Manhattan = "manhattan",
  ConeyIsland = "coney island",
  Brooklyn = "brooklyn",
}

interface Transactions {
  getMaxSell(drug: DrugNames): number;
  getMaxBuy(price: number): number;
  buy(drug: DrugNames, amount: number, price: number): void;
  sell(drug: DrugNames, amount: number, price: number): void;
  canBuy(amount: number, price: number): boolean;
  canSell(drug: DrugNames, amount: number): boolean;
}

export class Player extends Drugs implements Transactions {
  money: number;
  maxTrench: number;
  currentArea: Areas;
  daysEnd: number;

  constructor() {
    super();
    this.money = 2000;
    this.maxTrench = 100;
    this.currentArea = Areas.Bronx;
    this.daysEnd = 30;
  }

  totalInventory() {
    return (
      this.cocaine +
      this.heroin +
      this.acid +
      this.weed +
      this.speed +
      this.ludes
    );
  }

  getMaxSell(drug: DrugNames): number {
    for (let prop in this) {
      if (prop === drug) return this[drug];
    }
    return 0;
  }

  getMaxBuy(price: number): number {
    const maxAmount = Math.floor(this.money / price);
    const coatSpace = this.maxTrench - this.totalInventory();
    if (maxAmount > coatSpace) return coatSpace;
    return maxAmount;
  }

  buy(drug: DrugNames, amount: number, price: number) {
    const totalPrice = price * amount;
    for (let prop in this) {
      if (prop === drug) {
        this[drug] = amount;
        this.money = this.money - totalPrice;
      }
    }
  }

  sell(drug: DrugNames, amount: number, price: number) {
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
    if (
      totalPrice > this.money ||
      amount + this.totalInventory() > this.maxTrench
    )
      return false;
    return true;
  }

  canSell(drug: DrugNames, amount: number) {
    const hasAmount = this.getMaxSell(drug);
    if (amount > hasAmount) return false;
    return true;
  }
}
