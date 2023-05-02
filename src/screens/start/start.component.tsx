import { useAppDispatch } from "../../utils/hooks";

import { updateActionEvent } from "../../store/player/player.slice";

import Button from "../../components/button/button.component";

import { ActionEvents } from "../../store/player/player.types";

import { StartContainer, TitleContainer } from "./start.styles";
import ActionContainer from "../../components/action/action-container.component";

export default function Start() {
  const dispatch = useAppDispatch();

  const handleOnKeyDown = (key: string) => {
    if (key === "Enter") dispatch(updateActionEvent(ActionEvents.Shark));
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      <StartContainer>
        <TitleContainer>drug wars</TitleContainer>
        <Button onClick={() => dispatch(updateActionEvent(ActionEvents.Shark))}>
          New Game
        </Button>
      </StartContainer>
    </ActionContainer>
  );
}
