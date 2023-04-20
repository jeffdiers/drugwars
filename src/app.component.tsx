import { GameStage, selectStage } from "./store/main/main.slice";
import { useAppSelector } from "./utils/hooks";

import Start from "./screens/start/start.component";
import Shark from "./screens/shark/shark.component";
import Bank from "./screens/bank/bank.component";
import Stash from "./screens/stash/stash.component";
import Main from "./screens/main/main.component";
import Buy from "./screens/buy/buy.component";
import Sell from "./screens/sell/sell.component";
import Jet from "./screens/jet/jet.component";
import CopsChase from "./screens/chase/cops-chase.component";
import GameOver from "./screens/end/game-over.component";

import GameStats from "./components/game-stats.component";

export default function App() {
  const stage = useAppSelector(selectStage);

  return (
    <div>
      {stage === GameStage.START && <Start />}
      {stage !== GameStage.START &&
        stage !== GameStage.COPS_CHASE &&
        stage !== GameStage.GAME_OVER && <GameStats />}
      {stage === GameStage.SHARK && <Shark />}
      {stage === GameStage.BANK && <Bank />}
      {stage === GameStage.STASH && <Stash />}
      {stage === GameStage.MAIN && <Main />}
      {stage === GameStage.BUY && <Buy />}
      {stage === GameStage.SELL && <Sell />}
      {stage === GameStage.JET && <Jet />}
      {stage === GameStage.COPS_CHASE && <CopsChase />}
      {stage === GameStage.GAME_OVER && <GameOver />}
    </div>
  );
}
