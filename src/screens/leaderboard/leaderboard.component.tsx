import { useEffect } from "react";
import Button from "../../components/button/button.component";
import {
  getTopTen,
  selectLeaderboardIsLoading,
  selectLeaderboardTopTen,
} from "../../store/leaderboard/leaderboard.slice";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";

import {
  LeaderboardContainer,
  LeaderboardTitleContainer,
  LeaderboardItem,
} from "./leaderboard.styles";
import { moneyFormatter } from "../../utils/helpers";

export default function Leaderboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopTen());
  }, [dispatch]);

  const leaderboardTopTen = useAppSelector(selectLeaderboardTopTen);
  const isLoading = useAppSelector(selectLeaderboardIsLoading);

  return (
    <LeaderboardContainer>
      {!isLoading && (
        <>
          <LeaderboardTitleContainer>leaderboard</LeaderboardTitleContainer>
          {leaderboardTopTen?.map(({ name, score }, i) => (
            <LeaderboardItem key={i}>
              <div>{name}</div>
              <div>{moneyFormatter(Number(score))}</div>
            </LeaderboardItem>
          ))}
          <Button
            onClick={() => dispatch(updateActionEvent(ActionEvents.Start))}
          >
            back
          </Button>
        </>
      )}
    </LeaderboardContainer>
  );
}
