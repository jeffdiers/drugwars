import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { useAppDispatch } from "../utils/hooks";

import Input from "../components/input.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b") dispatch(updateStage(GameStage.BUY));
    if (event.key === "s") dispatch(updateStage(GameStage.SELL));
    if (event.key === "j") dispatch(updateStage(GameStage.JET));
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      Are you going to (B)uy, (S)ell, or (J)et?
    </Input>
  );
}
