import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { selectPriceEvents, removeEvent } from "../store/price/price.slice";
import {
  upgradeCoat,
  addPlayerEvent,
  removePlayerEvent,
  removePlayerEventAction,
  selectPlayerEvents,
  selectPlayerEventAction,
  selectMoney,
  EventActions,
} from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

import Input from "../components/input.component";
import { randomInteger } from "../utils/helpers";

export default function Main() {
  const dispatch = useAppDispatch();

  const priceEvents = useAppSelector(selectPriceEvents);
  const playerEvents = useAppSelector(selectPlayerEvents);
  const playerEventAction = useAppSelector(selectPlayerEventAction);
  const money = useAppSelector(selectMoney);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b") dispatch(updateStage(GameStage.BUY));
    if (event.key === "s") dispatch(updateStage(GameStage.SELL));
    if (event.key === "j") dispatch(updateStage(GameStage.JET));
  };

  const handleOnKeyDownPriceEvents = (event: KeyboardEvent) => {
    if (event.key === "Enter") dispatch(removeEvent());
  };

  const handleOnKeyDownPlayerEvents = (event: KeyboardEvent) => {
    if (event.key === "Enter") dispatch(removePlayerEvent());
  };

  const coatPrice = randomInteger(150, 250);

  const handleOnKeyDownEventAction = (event: KeyboardEvent) => {
    if (event.key === "y") {
      dispatch(upgradeCoat(coatPrice));
      dispatch(
        addPlayerEvent(`** You bought more trench pockets for $${coatPrice} **`)
      );
      dispatch(removePlayerEventAction());
    }
    if (event.key === "n") dispatch(removePlayerEventAction());
  };

  return (
    <>
      {playerEventAction === EventActions.UpgradeCoat ? (
        <Input onKeyDown={handleOnKeyDownEventAction}>
          {`** Would you like to buy 15 more pockets for more drugs? It's $${coatPrice} **`}
          <br />
          {`Wallet: ${money}`}
        </Input>
      ) : playerEvents.length ? (
        <Input onKeyDown={handleOnKeyDownPlayerEvents}>
          {playerEvents[0]}
          <br />
          Press ENTER to Continue
        </Input>
      ) : priceEvents.length ? (
        <Input onKeyDown={handleOnKeyDownPriceEvents}>
          {priceEvents[0]}
          <br />
          Press ENTER to Continue
        </Input>
      ) : (
        <Input onKeyDown={handleOnKeyDown}>
          Are you going to (B)uy, (S)ell, or (J)et?
        </Input>
      )}
    </>
  );
}
