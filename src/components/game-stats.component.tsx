import { selectSharkBalance } from "../store/shark/shark.slice";
import { selectBankBalance } from "../store/bank/bank.slice";
import { selectStashBalance } from "../store/stash/stash.slice";
import { Drugs } from "../store/player/player.slice";
import {
  selectPlayerArea,
  selectPlayerCoatSpace,
  selectPlayerDaysEnd,
  selectPlayerGuns,
  selectPlayerInventory,
  selectPlayerMoney,
} from "../store/player/player.selectors";
import { selectPrices } from "../store/price/price.slice";

import { useAppSelector } from "../utils/hooks";

export default function GameStats() {
  const prices = useAppSelector(selectPrices);
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
    <div>
      <div>area: {playerArea}</div>
      <div>days left: {playerDaysEnd}</div>
      <div>debt: {sharkBalance}</div>
      <div>bank: {bankBalance}</div>
      <div>money: {playerMoney}</div>
      <div>trench space: {playerCoatSpace}</div>
      <div>guns: {playerGuns}</div>
      <div>stash: </div>
      <ul>
        <li>
          {Drugs.Cocaine}: {stash.cocaine}
        </li>
        <li>
          {Drugs.Heroin}: {stash.heroin}
        </li>
        <li>
          {Drugs.Acid}: {stash.acid}
        </li>
        <li>
          {Drugs.Weed}: {stash.weed}
        </li>
        <li>
          {Drugs.Speed}: {stash.speed}
        </li>
        <li>
          {Drugs.Ludes}: {stash.ludes}
        </li>
      </ul>
      <div>prices: </div>
      <ul>
        <li>
          {Drugs.Cocaine}: {prices.cocaine}
        </li>
        <li>
          {Drugs.Heroin}: {prices.heroin}
        </li>
        <li>
          {Drugs.Acid}: {prices.acid}
        </li>
        <li>
          {Drugs.Weed}: {prices.weed}
        </li>
        <li>
          {Drugs.Speed}: {prices.speed}
        </li>
        <li>
          {Drugs.Ludes}: {prices.ludes}
        </li>
      </ul>
      <div>trench: </div>
      <ul>
        <li>
          {Drugs.Cocaine}: {playerInventory.cocaine}
        </li>
        <li>
          {Drugs.Heroin}: {playerInventory.heroin}
        </li>
        <li>
          {Drugs.Acid}: {playerInventory.acid}
        </li>
        <li>
          {Drugs.Weed}: {playerInventory.weed}
        </li>
        <li>
          {Drugs.Speed}: {playerInventory.speed}
        </li>
        <li>
          {Drugs.Ludes}: {playerInventory.ludes}
        </li>
      </ul>
    </div>
  );
}
