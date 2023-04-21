import { GameStage, updateStage } from "../../store/main/main.slice";
import { useAppDispatch } from "../../utils/hooks";

import Continue from "../../components/action/continue.component";

export default function Start() {
  const dispatch = useAppDispatch();

  return (
    <Continue
      text="New Game"
      onContinue={() => dispatch(updateStage(GameStage.SHARK))}
    />
  );
}
