import { useEffect } from "react";
import {
  getTopTen,
  selectLeaderboardIsLoading,
  selectLeaderboardTopTen,
} from "../../store/leaderboard/leaderboard.slice";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";

import Leaderboard from "./leaderboard.component";
import Spinner from "../../components/spinner/spinner.component";

export default function LeaderboardContainer() {
  const dispatch = useAppDispatch();

  const leaderboardTopTen = useAppSelector(selectLeaderboardTopTen);
  const isLoading = useAppSelector(selectLeaderboardIsLoading);
  const goBack = () => dispatch(updateActionEvent(ActionEvents.Start));

  let mounted = false;

  useEffect(() => {
    if (!mounted) {
      mounted = true;
      dispatch(getTopTen());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Leaderboard topTen={leaderboardTopTen} goBack={goBack} />
      )}
    </>
  );
}
