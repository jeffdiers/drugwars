import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { useKeyDown } from "../../utils/hooks";

import {
  updateActionEvent,
  resetPlayer,
} from "../../store/player/player.slice";
import { resetBank } from "../../store/bank/bank.slice";
import { resetShark } from "../../store/shark/shark.slice";
import { resetStash } from "../../store/stash/stash.slice";
import {
  clearPriceEvents,
  rollEvents,
  setPrices,
} from "../../store/price/price.slice";
import { resetScoreIsPosted } from "../../store/leaderboard/leaderboard.slice";

import Button from "../../components/button/button.component";

import { ActionEvents, Areas } from "../../store/player/player.types";

import { StartContainer, TitleContainer } from "./start.styles";
import {
  selectPlayerArea,
  selectPlayerDaysEnd,
} from "../../store/player/player.selectors";

export default function Start() {
  const dispatch = useAppDispatch();

  const playerArea = useAppSelector(selectPlayerArea);
  const playerDaysEnd = useAppSelector(selectPlayerDaysEnd);

  const newGame = () => {
    dispatch(resetPlayer());
    dispatch(resetShark());
    dispatch(resetStash());
    dispatch(resetBank());
    dispatch(setPrices());
    dispatch(clearPriceEvents());
    dispatch(rollEvents());
    dispatch(resetScoreIsPosted());
    dispatch(updateActionEvent(ActionEvents.Shark));
  };

  const contnueGame = () => {
    playerArea === Areas.Bronx
      ? dispatch(updateActionEvent(ActionEvents.Shark))
      : dispatch(updateActionEvent(ActionEvents.Main));
  };

  useKeyDown(() => newGame(), ["Enter"]);
  useKeyDown(() => playerDaysEnd < 30 && contnueGame(), ["c"]);

  return (
    <StartContainer>
      <TitleContainer>drug wars</TitleContainer>
      <Button onClick={() => newGame()}>New Game</Button>
      {playerDaysEnd < 30 && (
        <Button onClick={() => contnueGame()}>Continue Game</Button>
      )}
      <Button
        onClick={() => dispatch(updateActionEvent(ActionEvents.Instructions))}
      >
        Instructions
      </Button>
      <Button
        onClick={() => dispatch(updateActionEvent(ActionEvents.Leaderboard))}
      >
        Leaderboard
      </Button>
    </StartContainer>
  );
}
