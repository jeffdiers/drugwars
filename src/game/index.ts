import { DrugNames } from "./drugs";
import { Areas, Player } from "./player";
import { Prices } from "./prices";
import { Shark } from "./shark";

export enum GamePhase {
  Start,
  Main,
  Buy_SelectDrug,
  Buy_SelectAmount,
  BuyConfirm,
  Sell_SelectAmount,
  Sell_SelectDrug,
  Jet,
}

export enum GamePrompt {
  Start = "Press ENTER to Play or Ctrl+C to Quit",
  Main = "Are you going to (B)uy, (S)ell, or (J)et?",
  Buy_SelectDrug = "What would you like to buy?",
  Buy_SelectAmount = "How much would you like to buy?",
  BuyConfirm = "You bought drug!",
  ErrorWrongLetter = "Enter the first letter of a drug to choose!",
  BuyErrorCantBuy = "You don't have enough money/coat space to buy that!",
  Sell_SelectDrug = "What would you like to sell?",
  Sell_SelectAmount = "How much would you like to sell?",
  SellError = "You don't have that many drugs!",
  Jet = "Where you gonna go?",
}

interface ActionInput {
  key: string;
  amount?: number;
}

export class DrugWars {
  player: Player;
  prices: Prices;
  shark: Shark;
  prompt: GamePrompt;
  phase: GamePhase;
  drugToDeal!: DrugNames | undefined;
  amountToDeal!: string | undefined;

  constructor() {
    this.player = new Player();
    this.prices = new Prices();
    this.shark = new Shark();
    this.prompt = GamePrompt.Start;
    this.phase = GamePhase.Start;
  }

  getDrugByKey(key: string) {
    if (key === "c") return DrugNames.Cocaine;
    if (key === "h") return DrugNames.Heroin;
    if (key === "a") return DrugNames.Acid;
    if (key === "w") return DrugNames.Weed;
    if (key === "s") return DrugNames.Speed;
    if (key === "l") return DrugNames.Ludes;
    return undefined;
  }

  getAmountToDeal(key: string) {
    if (this.amountToDeal) {
      return this.amountToDeal + key;
    } else {
      return key;
    }
  }

  action(key: string) {
    switch (this.phase) {
      case GamePhase.Start:
        if (key === "Enter") {
          this.prompt = GamePrompt.Main;
          this.phase = GamePhase.Main;
        }
        break;

      case GamePhase.Main:
        if (key === "b") {
          this.prompt = GamePrompt.Buy_SelectDrug;
          this.phase = GamePhase.Buy_SelectDrug;
        }
        if (key === "s") {
          this.prompt = GamePrompt.Sell_SelectDrug;
          this.phase = GamePhase.Sell_SelectDrug;
        }
        if (key === "j") {
          this.prompt = GamePrompt.Jet;
          this.phase = GamePhase.Jet;
        }
        break;

      case GamePhase.Buy_SelectDrug:
        if (!this.getDrugByKey(key)) {
          this.prompt = GamePrompt.ErrorWrongLetter;
          this.phase = GamePhase.Buy_SelectDrug;
          break;
        }
        this.prompt = GamePrompt.Buy_SelectAmount;
        this.phase = GamePhase.Buy_SelectAmount;
        this.drugToDeal = this.getDrugByKey(key);
        break;

      case GamePhase.Buy_SelectAmount:
        if (Number(key) || key === "0")
          this.amountToDeal = this.getAmountToDeal(key);
        if (key === "Enter") {
          if (this.drugToDeal && this.amountToDeal) {
            const price = this.prices[this.drugToDeal];
            const amount = Number(this.amountToDeal);
            const canBuy = this.player.canBuy(amount, price);
            if (canBuy) {
              this.player.buy(this.drugToDeal, amount, price);
              this.prompt = GamePrompt.Main;
              this.phase = GamePhase.Main;
              this.drugToDeal = undefined;
              this.amountToDeal = undefined;
            } else {
              this.prompt = GamePrompt.BuyErrorCantBuy;
              this.amountToDeal = undefined;
            }
          } else {
            this.prompt = GamePrompt.Buy_SelectAmount;
            this.phase = GamePhase.Buy_SelectAmount;
          }
          break;
        }
        break;

      case GamePhase.Sell_SelectDrug:
        if (!this.getDrugByKey(key)) {
          this.prompt = GamePrompt.ErrorWrongLetter;
          this.phase = GamePhase.Sell_SelectDrug;
          break;
        }
        this.prompt = GamePrompt.Sell_SelectAmount;
        this.phase = GamePhase.Sell_SelectAmount;
        this.drugToDeal = this.getDrugByKey(key);
        break;

      case GamePhase.Sell_SelectAmount:
        if (Number(key) || key === "0")
          this.amountToDeal = this.getAmountToDeal(key);
        if (key === "Enter") {
          if (this.drugToDeal && this.amountToDeal) {
            const price = this.prices[this.drugToDeal];
            const amount = Number(this.amountToDeal);
            const canSell = this.player.canSell(this.drugToDeal, amount);
            if (canSell) {
              this.player.sell(this.drugToDeal, amount, price);
              this.prompt = GamePrompt.Main;
              this.phase = GamePhase.Main;
              this.drugToDeal = undefined;
              this.amountToDeal = undefined;
            } else {
              this.prompt = GamePrompt.SellError;
              this.amountToDeal = undefined;
            }
          } else {
            this.prompt = GamePrompt.Sell_SelectAmount;
            this.phase = GamePhase.Sell_SelectAmount;
          }
          break;
        }
        break;

      default:
        break;
    }
  }

  changeArea(area: Areas) {
    if (this.player.currentArea !== area) {
      this.player.currentArea = area;
      this.player.daysEnd = this.player.daysEnd - 1;
      this.prices = new Prices();
      this.shark.addInterest();
    }
  }

  borrowFromShark(amount: number) {
    if (amount > this.shark.balance || amount > this.player.money) return;
    this.player.money = this.player.money + amount;
    this.shark.balance = this.shark.balance + amount;
  }
}
