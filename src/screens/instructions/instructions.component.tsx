import Button from "../../components/button/button.component";
import PriceBox from "../../components/price-box/price-box.component";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";
import { useAppDispatch } from "../../utils/redux-hooks";

import { InstructionsContainer } from "./instructions.styles";

export default function Instructions() {
  const dispatch = useAppDispatch();

  return (
    <InstructionsContainer>
      <div>
        This is a game of buying, selling, and fighting. The object of the game
        is to pay off your debt to the loan shark. Then, make as much money as
        you can in a 1 month period. If you deal too heavily in drugs, you might
        run into the police!! Your main drug stash will be in the Bronx. (It's a
        nice neighborhood) The Prices of drugs per unit are:
      </div>
      <PriceBox withDialog={false} priceRange={true} />
      <Button onClick={() => dispatch(updateActionEvent(ActionEvents.Start))}>
        back
      </Button>
    </InstructionsContainer>
  );
}
