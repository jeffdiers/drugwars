import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import {
  healPlayer,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerArea,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { selectPriceHeal } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no/yes-no.component";
import { ActionEvents, Areas } from "../../store/player/player.types";

export default function Heal() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerArea = useAppSelector(selectPlayerArea);
  const priceHeal = useAppSelector(selectPriceHeal);

  const handleUpdateActionEvent = () => {
    playerArea === Areas.Bronx
      ? dispatch(updateActionEvent(ActionEvents.Shark))
      : dispatch(updateActionEvent(ActionEvents.Main));
  };

  return (
    <YesNo
      text={`Do you want to heal for ${moneyFormatter(priceHeal)}?`}
      onYes={() => {
        if (priceHeal <= playerMoney) {
          dispatch(healPlayer(priceHeal));
        } else {
          dispatch(addPlayerEvent("You don't have enough money to heal!"));
        }
        handleUpdateActionEvent();
      }}
      onNo={() => handleUpdateActionEvent()}
    />
  );
}
