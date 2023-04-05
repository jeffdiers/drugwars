import { KeyboardEvent, useState, FC, useEffect } from "react";
import { DrugWars, GamePhase, GamePrompt } from "./game";

type MainPageProps = { game: DrugWars };

export const MainPage: FC<MainPageProps> = ({ game }) => {
  const [propmtText, setPromptText] = useState(game.prompt);
  const [inputText, setInputText] = useState("");

  const handleOnKeyDown = (event: KeyboardEvent) => {
    game.action(event.key);
    setInputText(event.key);
    setPromptText(game.prompt);
    console.log(game);
  };

  return (
    <div role="button" tabIndex={0} onKeyDown={handleOnKeyDown}>
      {game.phase === GamePhase.Start && <div>{GamePrompt.Start}</div>}
      {game.phase === GamePhase.Main && <div>{propmtText}</div>}
      {game.phase === GamePhase.Buy_SelectDrug && (
        <div>
          <div>{GamePrompt.Main}</div>
          <div>{propmtText}</div>
        </div>
      )}
      {game.phase === GamePhase.Buy_SelectAmount && (
        <div>
          <div>{GamePrompt.Main}</div>
          <div>{propmtText}</div>
        </div>
      )}
      {game.phase === GamePhase.Sell_SelectDrug && (
        <div>
          <div>{GamePrompt.Main}</div>
          <div>{propmtText}</div>
        </div>
      )}
      {game.phase === GamePhase.Sell_SelectAmount && (
        <div>
          <div>{GamePrompt.Main}</div>
          <div>{propmtText}</div>
        </div>
      )}
      {game.phase === GamePhase.Jet && "hello jet menu"}
      {inputText}
    </div>
  );
};
