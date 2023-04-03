import { DrugNames } from "./drugs";
import { Areas, Player } from "./player";
import { Prices } from "./prices";

export class DrugWars {
  player: Player;
  prices: Prices;

  constructor() {
    this.player = new Player();
    this.prices = new Prices();
  }

  buyDrugAtCurrentPrice(drug: DrugNames, amount: number) {
    const price = this.prices[drug];
    const canBuy = this.player.canBuy(amount, price);
    if (canBuy) this.player.buy(drug, amount, price);
  }

  sellDrugAtCurrentPrice(drug: DrugNames, amount: number) {
    const price = this.prices[drug];
    const canSell = this.player.canSell(drug, amount);
    if (canSell) this.player.sell(drug, amount, price);
  }

  changeArea(area: Areas) {
    if (this.player.currentArea !== area) {
      this.player.currentArea = area;
      this.player.daysEnd = this.player.daysEnd - 1;
      this.prices = new Prices();
    }
  }
}
