import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { useKeyDown } from "../../utils/hooks";
import { moneyFormatter } from "../../utils/helpers";
import { selectSharkBalance } from "../../store/shark/shark.slice";

import {
  selectPlayerHealth,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { resetPlayer } from "../../store/player/player.slice";
import { resetShark } from "../../store/shark/shark.slice";
import { resetStash } from "../../store/stash/stash.slice";
import { resetBank } from "../../store/bank/bank.slice";
import { setPrices } from "../../store/price/price.slice";
import { selectBankBalance } from "../../store/bank/bank.slice";

import Button from "../../components/button/button.component";

import { GameOverContainer, GameInfo } from "./game-over.styles";

export default function GameOver() {
  const dispatch = useAppDispatch();

  const playerHealth = useAppSelector(selectPlayerHealth);
  const playerMoney = useAppSelector(selectPlayerMoney);
  const bankBalance = useAppSelector(selectBankBalance);
  const sharkBalance = useAppSelector(selectSharkBalance);

  const profit = playerMoney + bankBalance - sharkBalance;
  const rank = profit > 0 ? Math.floor((profit / 10000000) * 100) : 0;

  const dealerRank = () => {
    if (rank >= 0 && rank <= 30) return "Small Time Pusha... WEAK";
    if (rank >= 31 && rank <= 50) return "Own The Block... NOT BAD";
    if (rank >= 51 && rank <= 75) return "Run The Town... PRETTY GOOD";
    if (rank >= 76 && rank <= 99) return "Kingpin... GOD DAMN";
    return "PABLO ESCOBAR... YOU ARE A GOD";
  };

  const endGame = () => {
    dispatch(resetPlayer());
    dispatch(resetShark());
    dispatch(resetStash());
    dispatch(resetBank());
    dispatch(setPrices());
  };

  useKeyDown(() => endGame(), ["Enter"]);

  return (
    <GameOverContainer>
      <GameInfo>
        <div>Game Over!</div>
        <br />
        {playerHealth <= 0 ? (
          <div>You got busted!</div>
        ) : (
          <div>
            <div>You made {moneyFormatter(profit)}</div>
            <br />
            <div>{dealerRank()}</div>
            <br />
            {sharkBalance > 0 && (
              <div>
                You might want to skip town... the loan shark is looking for you
              </div>
            )}
          </div>
        )}
      </GameInfo>
      <Button onClick={() => endGame()}>main menu</Button>
    </GameOverContainer>
  );
}
