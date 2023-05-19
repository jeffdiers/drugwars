import type { FC } from "react";
import type { PlayerScore } from "../../store/leaderboard/leaderboard.slice";
import { moneyFormatter } from "../../utils/helpers";

import Button from "../../components/button/button.component";
import {
  LeaderboardContainer,
  LeaderboardTitleContainer,
  LeaderboardCountdownContainer,
  LeaderboardItem,
} from "./leaderboard.styles";
import Countdown from "../../components/countdown/countdown.component";

type LeaderboardProps = {
  topTen: PlayerScore[] | undefined;
  goBack: () => void;
};

const COUNTDOWN_END_DATE = new Date("2023-05-22T04:20:00").getTime();

const Leaderboard: FC<LeaderboardProps> = ({ topTen, goBack }) => (
  <LeaderboardContainer>
    <LeaderboardTitleContainer>leaderboard</LeaderboardTitleContainer>
    <LeaderboardCountdownContainer>
      <Countdown endDate={COUNTDOWN_END_DATE} />
    </LeaderboardCountdownContainer>
    {topTen?.map(({ name, score }, i) => (
      <LeaderboardItem key={i}>
        <div>{name}</div>
        <div>{moneyFormatter(Number(score))}</div>
      </LeaderboardItem>
    ))}
    <Button onClick={goBack}>back</Button>
  </LeaderboardContainer>
);

export default Leaderboard;
