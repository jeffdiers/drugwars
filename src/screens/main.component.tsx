import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { selectPriceEvents, removeEvent } from "../store/price/price.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

import Input from "../components/input.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const priceEvents = useAppSelector(selectPriceEvents);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b") dispatch(updateStage(GameStage.BUY));
    if (event.key === "s") dispatch(updateStage(GameStage.SELL));
    if (event.key === "j") dispatch(updateStage(GameStage.JET));
  };

  const handleOnKeyDownEvents = (event: KeyboardEvent) => {
    if (event.key === "Enter") dispatch(removeEvent());
  };

  return (
    <>
      {priceEvents.length ? (
        <Input onKeyDown={handleOnKeyDownEvents}>
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
