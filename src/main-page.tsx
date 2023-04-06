import { KeyboardEvent, useState, FC } from "react";
import { DrugWars, GamePhase, GamePrompts } from "./game";
import { DrugNames } from "./game/drugs";

type MainPageProps = { game: DrugWars };

export const MainPage: FC<MainPageProps> = ({ game }) => {
  const [inputText, setInputText] = useState("");

  const prompts = new GamePrompts();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    game.action(event.key);
    setInputText(event.key + Math.random());
    console.log(game);
  };

  return (
    <div role="button" tabIndex={0} onKeyDown={handleOnKeyDown}>
      <div>area: {game.player.currentArea}</div>
      <div>days left: {game.player.daysEnd}</div>
      <div>debt: {game.shark.balance}</div>
      <div>money: {game.player.money}</div>
      <div>prices: </div>
      <ul>
        <li>
          {DrugNames.Cocaine}: {game.prices.cocaine}
        </li>
        <li>
          {DrugNames.Heroin}: {game.prices.heroin}
        </li>
        <li>
          {DrugNames.Acid}: {game.prices.acid}
        </li>
        <li>
          {DrugNames.Weed}: {game.prices.weed}
        </li>
        <li>
          {DrugNames.Speed}: {game.prices.speed}
        </li>
        <li>
          {DrugNames.Ludes}: {game.prices.ludes}
        </li>
      </ul>
      <div>trench: </div>
      <ul>
        <li>
          {DrugNames.Cocaine}: {game.player.cocaine}
        </li>
        <li>
          {DrugNames.Heroin}: {game.player.heroin}
        </li>
        <li>
          {DrugNames.Acid}: {game.player.acid}
        </li>
        <li>
          {DrugNames.Weed}: {game.player.weed}
        </li>
        <li>
          {DrugNames.Speed}: {game.player.speed}
        </li>
        <li>
          {DrugNames.Ludes}: {game.player.ludes}
        </li>
      </ul>
      {game.phase === GamePhase.Start && <div>{prompts.START}</div>}
      {game.phase === GamePhase.Main && <div>{prompts.MAIN}</div>}
      {game.phase === GamePhase.Buy_SelectDrug && (
        <div>
          <div>{prompts.MAIN}</div>
          <div>{prompts.BUY_SELECT_DRUG}</div>
          <div>{game.errorWrongLetter && prompts.ERROR_WRONG_LETTER}</div>
        </div>
      )}
      {game.phase === GamePhase.Buy_SelectAmount && (
        <div>
          <div>{prompts.MAIN}</div>
          <div>{prompts.BUY_SELECT_AMOUNT(game.buyMaxAllowed)}</div>
          <div>{game.errorBuy && prompts.BUY_ERROR}</div>
        </div>
      )}
      {game.phase === GamePhase.Sell_SelectDrug && (
        <div>
          <div>{prompts.MAIN}</div>
          <div>{prompts.SELL_SELECT_DRUG}</div>
          <div>{game.errorWrongLetter && prompts.ERROR_WRONG_LETTER}</div>
        </div>
      )}
      {game.phase === GamePhase.Sell_SelectAmount && (
        <div>
          <div>{prompts.MAIN}</div>
          <div>
            {prompts.SELL_SELECT_AMOUNT(game.sellMaxAllowed, game.drugToDeal)}
          </div>
          <div>{game.errorSell && prompts.SELL_ERROR}</div>
        </div>
      )}
      {game.phase === GamePhase.Jet && (
        <div>
          <div>{prompts.JET}</div>
          <div>{game.errorJet && prompts.JET_ERROR}</div>
        </div>
      )}
      {inputText}
    </div>
  );
};
