import packageJson from "../package.json";
import { useAppSelector } from "./utils/redux-hooks";

import Start from "./screens/start/start.component";
import Instructions from "./screens/instructions/instructions.component";
import LeaderboardContainer from "./screens/leaderboard/leaderboard.container";
import Shark from "./screens/shark/shark.component";
import Bank from "./screens/bank/bank.component";
import Stash from "./screens/stash/stash.component";
import Main from "./screens/main/main.component";
import Buy from "./screens/buy/buy.component";
import Sell from "./screens/sell/sell.component";
import Jet from "./screens/jet/jet.component";
import CopsChase from "./screens/chase/cops-chase.component";
import BuyCoat from "./screens/buy-coat/buy-coat.component";
import BuyGun from "./screens/buy-gun/buy-gun.component";
import Heal from "./screens/heal/heal.component";
import GameOver from "./screens/end/game-over.component";
import GameStats from "./components/game-stats/game-stats.component";

import { selectPlayerActionEvent } from "./store/player/player.selectors";
import { ActionEvents } from "./store/player/player.types";

import { AppContainer, GameScreen, VersionContainer } from "./app.styles";

export default function App() {
  const playerActionEvent = useAppSelector(selectPlayerActionEvent);

  const renderGameStats = () => {
    if (
      playerActionEvent !== ActionEvents.Start &&
      playerActionEvent !== ActionEvents.Instructions &&
      playerActionEvent !== ActionEvents.Leaderboard &&
      playerActionEvent !== ActionEvents.CopsChase &&
      playerActionEvent !== ActionEvents.GameOver
    ) {
      return <GameStats />;
    }
  };

  const renderScreens = () => {
    switch (playerActionEvent) {
      case ActionEvents.Start:
        return <Start />;
      case ActionEvents.Instructions:
        return <Instructions />;
      case ActionEvents.Leaderboard:
        return <LeaderboardContainer />;
      case ActionEvents.Shark:
        return <Shark />;
      case ActionEvents.Bank:
        return <Bank />;
      case ActionEvents.Stash:
        return <Stash />;
      case ActionEvents.Main:
        return <Main />;
      case ActionEvents.Buy:
        return <Buy />;
      case ActionEvents.Sell:
        return <Sell />;
      case ActionEvents.Jet:
        return <Jet />;
      case ActionEvents.CopsChase:
        return <CopsChase />;
      case ActionEvents.BuyCoat:
        return <BuyCoat />;
      case ActionEvents.BuyGun:
        return <BuyGun />;
      case ActionEvents.Heal:
        return <Heal />;
      case ActionEvents.GameOver:
        return <GameOver />;

      default:
        break;
    }
  };

  return (
    <AppContainer data-testid="app-container">
      <GameScreen>
        {renderGameStats()}
        {renderScreens()}
      </GameScreen>
      <VersionContainer>v{packageJson.version}</VersionContainer>
    </AppContainer>
  );
}
