import { useAppSelector } from "../../utils/hooks";
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
import { selectPriceDrugs } from "../../store/price/price.selectors";

import {
  GameStatsContainer,
  Title,
  Days,
  Hold,
  StashTitle,
  Stash,
  CoatTitle,
  Coat,
  PriceTitle,
  Price,
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

  const priceDrugs = useAppSelector(selectPriceDrugs);

  return (
    <GameStatsContainer>
      <Title>{playerArea}</Title>
      <Days>days end: {playerDaysEnd}</Days>
      <Hold>hold: {playerCoatSpace}</Hold>
      <StashTitle>stash</StashTitle>
      <Stash>
        {Object.values(Drugs).map((drug, i) => (
          <div key={i}>
            {drug}: {stash[drug]}
          </div>
        ))}
        <div>bank: {bankBalance}</div>
        <div>debt: {sharkBalance}</div>
      </Stash>
      <CoatTitle>trench coat</CoatTitle>
      <Coat>
        {Object.values(Drugs).map((drug, i) => (
          <div key={i}>
            {drug}: {playerInventory[drug]}
          </div>
        ))}
        <div>guns: {playerGuns}</div>
        <div>cash: {playerMoney}</div>
      </Coat>
      <PriceTitle>hey dude, the prices of drugs are: </PriceTitle>
      <Price>
        {Object.values(Drugs).map((drug, i) => (
          <Item key={i}>
            <div>{drug}</div>
            <div>{""}</div>
            <div>{moneyFormatter(priceDrugs[drug])}</div>
          </Item>
        ))}
      </Price>
    </GameStatsContainer>
  );
}
