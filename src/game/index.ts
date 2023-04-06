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

export class GamePrompts {
  START = "Press ENTER to Play or Ctrl+C to Quit";
  MAIN = "Are you going to (B)uy, (S)ell, or (J)et?";
  BUY_SELECT_DRUG = "What would you like to buy?";
  BUY_SELECT_AMOUNT = (max: number) =>
    `How much would you like to buy? Max Allowed: ${max}`;
  BUY_CONFIRM = "You bought drug!";
  BUY_ERROR = "You don't have enough money/coat space to buy that!";
  SELL_SELECT_DRUG = "What would you like to sell?";
  SELL_SELECT_AMOUNT = (max: number, drug: DrugNames | undefined) =>
    `How much would you like to sell? You have: ${max} ${drug}`;
  SELL_CONFIRM = "";
  SELL_ERROR = "You don't have that many drugs!";
  ERROR_WRONG_LETTER = "Enter the first letter of a drug to choose!";
  JET = "Where you gonna go?";
  JET_ERROR = "Choose a number between 1 and 6!";
}

export class DrugWars {
  player: Player;
  prices: Prices;
  shark: Shark;
  phase: GamePhase;
  drugToDeal!: DrugNames | undefined;
  amountToDeal!: string | undefined;
  buyMaxAllowed: number;
  sellMaxAllowed: number;
  errorWrongLetter: boolean;
  errorBuy: boolean;
  errorSell: boolean;
  errorJet: boolean;

  constructor() {
    this.player = new Player();
    this.prices = new Prices();
    this.shark = new Shark();
    this.phase = GamePhase.Start;
    this.buyMaxAllowed = 0;
    this.sellMaxAllowed = 0;
    this.errorWrongLetter = false;
    this.errorBuy = false;
    this.errorSell = false;
    this.errorJet = false;
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

  getAreaByKey(key: string) {
    if (key === "1") return Areas.Bronx;
    if (key === "2") return Areas.Ghetto;
    if (key === "3") return Areas.CentralPark;
    if (key === "4") return Areas.Manhattan;
    if (key === "5") return Areas.ConeyIsland;
    if (key === "6") return Areas.Brooklyn;
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
          this.phase = GamePhase.Main;
        }
        break;

      case GamePhase.Main:
        if (key === "b") {
          this.phase = GamePhase.Buy_SelectDrug;
        }
        if (key === "s") {
          this.phase = GamePhase.Sell_SelectDrug;
        }
        if (key === "j") {
          this.phase = GamePhase.Jet;
        }
        break;

      case GamePhase.Jet:
        const newArea = this.getAreaByKey(key);
        if (newArea) {
          this.changeArea(newArea);
          this.phase = GamePhase.Main;
          this.errorJet = false;
          break;
        }
        this.errorJet = true;
        break;

      case GamePhase.Buy_SelectDrug:
        const buyDrug = this.getDrugByKey(key);
        if (!buyDrug) {
          this.errorWrongLetter = true;
          this.phase = GamePhase.Buy_SelectDrug;
          break;
        }
        const buyPrice = this.prices[buyDrug];
        this.buyMaxAllowed = this.player.getMaxBuy(buyPrice);
        this.phase = GamePhase.Buy_SelectAmount;
        this.drugToDeal = buyDrug;
        this.errorWrongLetter = false;
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
              this.phase = GamePhase.Main;
              this.drugToDeal = undefined;
              this.amountToDeal = undefined;
              this.errorBuy = false;
            } else {
              this.errorBuy = true;
              this.amountToDeal = undefined;
            }
          } else if (this.drugToDeal) {
            this.errorBuy = false;
            const buyPrice = this.prices[this.drugToDeal];
            this.buyMaxAllowed = this.player.getMaxBuy(buyPrice);
            this.phase = GamePhase.Buy_SelectAmount;
          }
          break;
        }
        break;

      case GamePhase.Sell_SelectDrug:
        const sellDrug = this.getDrugByKey(key);
        if (!sellDrug) {
          this.errorWrongLetter = true;
          this.phase = GamePhase.Sell_SelectDrug;
          break;
        }
        this.sellMaxAllowed = this.player.getMaxSell(sellDrug);
        this.phase = GamePhase.Sell_SelectAmount;
        this.drugToDeal = sellDrug;
        this.errorWrongLetter = false;
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
              this.phase = GamePhase.Main;
              this.drugToDeal = undefined;
              this.amountToDeal = undefined;
              this.errorSell = false;
            } else {
              this.errorSell = true;
              this.amountToDeal = undefined;
            }
          } else if (this.drugToDeal) {
            this.errorSell = false;
            this.sellMaxAllowed = this.player.getMaxSell(this.drugToDeal);
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
