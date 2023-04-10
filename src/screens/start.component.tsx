import { KeyboardEvent, useEffect, useRef } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { useAppDispatch } from "../utils/hooks";

import Input from "../components/input.component";

export default function Start() {
  const buttonRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") dispatch(updateStage(GameStage.MAIN));
  };

  useEffect(() => {
    buttonRef.current?.focus();
  });

  return (
    <Input onKeyDown={handleOnKeyDown}>
      Press ENTER to Play or Ctrl+C to Quit
    </Input>
  );
}
