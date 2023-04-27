import { useAppDispatch } from "../../utils/hooks";

import { updateActionEvent } from "../../store/player/player.slice";

import Continue from "../../components/action/continue.component";
import { ActionEvents } from "../../store/player/player.types";

export default function Start() {
  const dispatch = useAppDispatch();

  return (
    <Continue
      text="helloNew Game"
      onContinue={() => dispatch(updateActionEvent(ActionEvents.Shark))}
    />
  );
}
