import { useAppDispatch } from "../../utils/hooks";

import { updateActionEvent } from "../../store/player/player.slice";

import Continue from "../../components/action/continue/continue.component";
import { ActionEvents } from "../../store/player/player.types";

import { StartContainer, TitleContainer } from "./start.styles";

export default function Start() {
  const dispatch = useAppDispatch();

  return (
    <StartContainer>
      <TitleContainer>drug wars</TitleContainer>
      <Continue
        buttonText="New Game"
        onContinue={() => dispatch(updateActionEvent(ActionEvents.Shark))}
      />
    </StartContainer>
  );
}
