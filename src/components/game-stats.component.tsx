import { useAppSelector } from "../utils/hooks";

import { selectSharkBalance } from "../store/shark/shark.slice";
import { selectBankBalance } from "../store/bank/bank.slice";
import { selectStashBalance } from "../store/stash/stash.slice";
import { Drugs } from "../store/player/player.types";
import {
  selectPlayerArea,
  selectPlayerCoatSpace,
  selectPlayerDaysEnd,
  selectPlayerGuns,
  selectPlayerInventory,
  selectPlayerMoney,
} from "../store/player/player.selectors";
import { selectPriceDrugs } from "../store/price/price.selectors";

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
        {Object.values(Drugs).map((drug, i) => (
          <li key={i}>
            {drug}: {stash[drug]}
          </li>
        ))}
      </ul>
      <div>prices: </div>
      <ul>
        {Object.values(Drugs).map((drug, i) => (
          <li key={i}>
            {drug}: {priceDrugs[drug]}
          </li>
        ))}
      </ul>
      <div>trench: </div>
      <ul>
        {Object.values(Drugs).map((drug, i) => (
          <li key={i}>
            {drug}: {playerInventory[drug]}
          </li>
        ))}
      </ul>
    </div>
  );
}
