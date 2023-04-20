import { GameStage, updateStage } from "../../store/main/main.slice";
import { useAppDispatch } from "../../utils/hooks";

import InputContinue from "../../components/input-continue.component";

export default function Start() {
  const dispatch = useAppDispatch();

  return (
    <InputContinue
      text="New Game"
      onContinue={() => dispatch(updateStage(GameStage.SHARK))}
    />
  );
}
