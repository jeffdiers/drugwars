import { useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import { selectSharkBalance } from "../../store/shark/shark.slice";
import { selectBankBalance } from "../../store/bank/bank.slice";
import { selectStashBalance } from "../../store/stash/stash.slice";
import { Drugs } from "../../store/player/player.types";
import {
  selectPlayerArea,
  selectPlayerCoatSpace,
  selectPlayerDaysEnd,
  selectPlayerGuns,
  selectPlayerInventory,
  selectPlayerMoney,
} from "../../store/player/player.selectors";

import {
  GameStatsContainer,
  Title,
  Days,
  Hold,
  StashTitle,
  Stash,
  CoatTitle,
  Coat,
  Item,
} from "./game-stats.styles";

export default function GameStats() {
  const stash = useAppSelector(selectStashBalance);
  const sharkBalance = useAppSelector(selectSharkBalance);
  const bankBalance = useAppSelector(selectBankBalance);

  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const playerInventory = useAppSelector(selectPlayerInventory);
  const playerArea = useAppSelector(selectPlayerArea);
  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerGuns = useAppSelector(selectPlayerGuns);
  const playerDaysEnd = useAppSelector(selectPlayerDaysEnd);

  return (
    <GameStatsContainer>
      <Title>{playerArea}</Title>
      <Days>days end: {playerDaysEnd}</Days>
      <Hold>hold: {playerCoatSpace}</Hold>
      <StashTitle>stash</StashTitle>
      <Stash>
        {Object.values(Drugs).map((drug, i) => (
          <Item key={i}>
            <div>{drug}</div>
            <div>{stash[drug]}</div>
          </Item>
        ))}
        <br />
        <Item>
          <div>bank</div>
          <div>{moneyFormatter(bankBalance)}</div>
        </Item>
        <Item>
          <div>debt</div>
          <div>{moneyFormatter(sharkBalance)}</div>
        </Item>
      </Stash>
      <CoatTitle>trench coat</CoatTitle>
      <Coat>
        {Object.values(Drugs).map((drug, i) => (
          <Item key={i}>
            <div>{drug}</div>
            <div>{playerInventory[drug]}</div>
          </Item>
        ))}
        <br />
        <Item>
          <div>guns</div>
          <div>{playerGuns}</div>
        </Item>
        <Item>
          <div>cash</div>
          <div>{moneyFormatter(playerMoney)}</div>
        </Item>
      </Coat>
    </GameStatsContainer>
  );
}
