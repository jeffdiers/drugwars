import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { useAppDispatch } from "../utils/hooks";

import Input from "../components/input.component";

export default function Start() {
  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") dispatch(updateStage(GameStage.SHARK));
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      Press ENTER to Play or Ctrl+C to Quit
    </Input>
  );
}
