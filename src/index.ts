import { Player } from "./player";

export class DrugWars {
  public player: Player;

  constructor(player: Player) {
    this.player = player;
  }
  newGame() {
    return "new game";
  }

  getPlayerStats() {
    return this.player;
  }
}
