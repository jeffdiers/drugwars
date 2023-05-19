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
import { useEffect, useState } from "react";
import {
  editScoreName,
  postScore,
  selectLeaderboardScoreId,
  selectLeaderboardScoreIsPosted,
} from "../../store/leaderboard/leaderboard.slice";
import InputAmount from "../../components/action/input-amount/input-amount.component";

export default function GameOver() {
  const dispatch = useAppDispatch();

  const playerHealth = useAppSelector(selectPlayerHealth);
  const playerMoney = useAppSelector(selectPlayerMoney);
  const bankBalance = useAppSelector(selectBankBalance);
  const sharkBalance = useAppSelector(selectSharkBalance);
  const scoreIsPosted = useAppSelector(selectLeaderboardScoreIsPosted);
  const scoreId = useAppSelector(selectLeaderboardScoreId);

  const profit = playerMoney + bankBalance - sharkBalance;
  const rank = profit > 0 ? Math.floor((profit / 10000000) * 100) : 0;

  const dealerRank = () => {
    if (rank >= 0 && rank <= 30) return "Small Time Pusha... WEAK";
    if (rank >= 31 && rank <= 50) return "Own The Block... NOT BAD";
    if (rank >= 51 && rank <= 75) return "Run The Town... PRETTY GOOD";
    if (rank >= 76 && rank <= 99) return "Kingpin... GOD DAMN";
    return "PABLO ESCOBAR... YOU ARE A GOD";
  };

  let mounted = false;

  const getRandomNameAndPost = async () => {
    const randomNameResponse = await fetch(
      "/.netlify/functions/get-random-name"
    );
    const randomNameData = await randomNameResponse.json();
    const currentSeasonResponse = await fetch(
      "/.netlify/functions/get-current-season-id"
    );
    const currentSeasonData = await currentSeasonResponse.json();
    const score = sharkBalance > 0 ? -sharkBalance : profit;
    dispatch(
      postScore({
        name: randomNameData[0].name,
        score,
        season: currentSeasonData[0].id,
      })
    );
  };

  useEffect(() => {
    if (!mounted) {
      mounted = true;
      if (!scoreIsPosted) {
        getRandomNameAndPost();
      }
    }
  }, [scoreIsPosted]);

  const endGame = () => {
    dispatch(resetPlayer());
    dispatch(resetShark());
    dispatch(resetStash());
    dispatch(resetBank());
    dispatch(setPrices());
  };

  useKeyDown(() => endGame(), ["Enter"]);

  const [enterName, setEnterName] = useState(false);

  const handleUpdateScoreName = (value: string) => {
    scoreId && dispatch(editScoreName({ name: value, id: scoreId }));
    setEnterName(false);
  };

  return (
    <GameOverContainer>
      {enterName ? (
        <InputAmount
          name="player-name"
          type="text"
          labelText="Whats your name pal?"
          handleValue={handleUpdateScoreName}
          goBack={() => setEnterName(false)}
        />
      ) : (
        <>
          <GameInfo>
            <div>Game Over!</div>
            <br />
            {playerHealth <= 0 ? (
              <div>You got busted!</div>
            ) : sharkBalance > 0 ? (
              <div>
                You owe the loan shark {moneyFormatter(sharkBalance)}. He sent
                his goons after you...
              </div>
            ) : (
              <div>
                <div>You made {moneyFormatter(profit)}</div>
                <br />
                <div>{dealerRank()}</div>
              </div>
            )}
          </GameInfo>
          <Button onClick={() => setEnterName(true)}>enter name</Button>
          <Button onClick={() => endGame()}>main menu</Button>
        </>
      )}
    </GameOverContainer>
  );
}
