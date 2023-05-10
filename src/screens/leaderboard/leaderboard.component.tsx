import type { FC } from "react";
import type { PlayerScore } from "../../store/leaderboard/leaderboard.slice";
import { moneyFormatter } from "../../utils/helpers";

import Button from "../../components/button/button.component";
import {
  LeaderboardContainer,
  LeaderboardTitleContainer,
  LeaderboardItem,
} from "./leaderboard.styles";

type LeaderboardProps = {
  topTen: PlayerScore[] | undefined;
  goBack: () => void;
};

const Leaderboard: FC<LeaderboardProps> = ({ topTen, goBack }) => (
  <LeaderboardContainer>
    <LeaderboardTitleContainer>leaderboard</LeaderboardTitleContainer>
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
