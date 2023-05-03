import { useAppDispatch } from "../../utils/redux-hooks";
import { useKeyDown } from "../../utils/hooks";

import { updateActionEvent } from "../../store/player/player.slice";

import Button from "../../components/button/button.component";

import { ActionEvents } from "../../store/player/player.types";

import { StartContainer, TitleContainer } from "./start.styles";

export default function Start() {
  const dispatch = useAppDispatch();

  useKeyDown(() => dispatch(updateActionEvent(ActionEvents.Shark)), ["Enter"]);

  return (
    <StartContainer>
      <TitleContainer>drug wars</TitleContainer>
      <Button onClick={() => dispatch(updateActionEvent(ActionEvents.Shark))}>
        New Game
      </Button>
    </StartContainer>
  );
}
