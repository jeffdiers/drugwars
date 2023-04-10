import { GameStage, selectStage } from "./store/main/main.slice";
import { selectPlayer, Drugs } from "./store/player/player.slice";
import { selectPrices } from "./store/price/price.slice";
import { useAppSelector } from "./utils/hooks";
import Start from "./screens/start.component";
import Main from "./screens/main.component";
import Buy from "./screens/buy.component";
import Sell from "./screens/sell.component";
import Jet from "./screens/jet.component";
import { useEffect } from "react";
import { selectSharkBalance } from "./store/shark/shark.slice";

export default function App() {
  const stage = useAppSelector(selectStage);
  const player = useAppSelector(selectPlayer);
  const prices = useAppSelector(selectPrices);
  const sharkBalance = useAppSelector(selectSharkBalance);

  useEffect(() => {
    console.log(player);
  }, [player]);

  return (
    <div>
      <div>area: {player.area}</div>
      <div>days left: {player.daysEnd}</div>
      <div>debt: {sharkBalance}</div>
      <div>money: {player.money}</div>
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
      {stage === GameStage.START && <Start />}
      {stage === GameStage.MAIN && <Main />}
      {stage === GameStage.BUY && <Buy />}
      {stage === GameStage.SELL && <Sell />}
      {stage === GameStage.JET && <Jet />}
    </div>
  );
}
