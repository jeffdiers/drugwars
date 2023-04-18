import { selectSharkBalance } from "../store/shark/shark.slice";
import { selectBankBalance } from "../store/bank/bank.slice";
import { selectStashBalance } from "../store/stash/stash.slice";
import {
  selectPlayer,
  Drugs,
  selectTotalInventory,
  selectCoatSpace,
} from "../store/player/player.slice";
import { selectPrices } from "../store/price/price.slice";

import { useAppSelector } from "../utils/hooks";

export default function GameStats() {
  const player = useAppSelector(selectPlayer);
  const totalInventory = useAppSelector(selectTotalInventory);
  const prices = useAppSelector(selectPrices);
  const stash = useAppSelector(selectStashBalance);
  const sharkBalance = useAppSelector(selectSharkBalance);
  const bankBalance = useAppSelector(selectBankBalance);
  const coatSpace = useAppSelector(selectCoatSpace);

  return (
    <div>
      <div>area: {player.area}</div>
      <div>days left: {player.daysEnd}</div>
      <div>debt: {sharkBalance}</div>
      <div>bank: {bankBalance}</div>
      <div>money: {player.money}</div>
      <div>trench space: {coatSpace}</div>
      <div>guns: {player.guns}</div>
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
          {Drugs.Cocaine}: {player.cocaine}
        </li>
        <li>
          {Drugs.Heroin}: {player.heroin}
        </li>
        <li>
          {Drugs.Acid}: {player.acid}
        </li>
        <li>
          {Drugs.Weed}: {player.weed}
        </li>
        <li>
          {Drugs.Speed}: {player.speed}
        </li>
        <li>
          {Drugs.Ludes}: {player.ludes}
        </li>
      </ul>
    </div>
  );
}
