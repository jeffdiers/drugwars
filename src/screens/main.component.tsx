import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { selectPriceEvents, removeEvent } from "../store/price/price.slice";
import {
  upgradeCoat,
  buyGun,
  removePlayerEvent,
  removePlayerEventAction,
  selectPlayerEvents,
  selectPlayerEventAction,
  EventActions,
  selectCopsAmount,
} from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

import Input from "../components/input.component";
import InputConfirm from "../components/input-confirm.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const priceEvents = useAppSelector(selectPriceEvents);
  const playerEvents = useAppSelector(selectPlayerEvents);
  const playerEventAction = useAppSelector(selectPlayerEventAction);
  const copsAmount = useAppSelector(selectCopsAmount);

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

  const handleOnKeyDownEventAction_CopsChase = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      dispatch(updateStage(GameStage.COPS_CHASE));
      dispatch(removePlayerEventAction());
    }
  };

  return (
    <>
      {playerEventAction === EventActions.CopsChase ? (
        <Input onKeyDown={handleOnKeyDownEventAction_CopsChase}>
          {`Officer Hardass and ${copsAmount} of his deputies are chasing you !!!!!`}
          <br />
          Press ENTER to Continue
        </Input>
      ) : playerEventAction === EventActions.UpgradeCoat ? (
        <InputConfirm
          labelText={playerEvents[0]}
          handleYes={() => dispatch(upgradeCoat())}
          handleNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEventAction === EventActions.BuyGun ? (
        <InputConfirm
          labelText={playerEvents[0]}
          handleYes={() => dispatch(buyGun())}
          handleNo={() => dispatch(removePlayerEventAction())}
        />
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
