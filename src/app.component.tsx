import { GameStage, selectStage } from "./store/main/main.slice";
import { useAppSelector } from "./utils/hooks";

import Start from "./screens/start.component";
import Shark from "./screens/shark.component";
import Bank from "./screens/bank.component";
import Stash from "./screens/stash.component";
import Main from "./screens/main.component";
import Buy from "./screens/buy.component";
import Sell from "./screens/sell.component";
import Jet from "./screens/jet.component";

import GameStats from "./components/game-stats.component";

export default function App() {
  const stage = useAppSelector(selectStage);

  return (
    <div>
      {stage === GameStage.START && <Start />}
      {stage !== GameStage.START && <GameStats />}
      {stage === GameStage.SHARK && <Shark />}
      {stage === GameStage.BANK && <Bank />}
      {stage === GameStage.STASH && <Stash />}
      {stage === GameStage.MAIN && <Main />}
      {stage === GameStage.BUY && <Buy />}
      {stage === GameStage.SELL && <Sell />}
      {stage === GameStage.JET && <Jet />}
    </div>
  );
}
