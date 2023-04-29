import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import {
  healPlayer,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import { selectPlayerMoney } from "../../store/player/player.selectors";
import { selectPriceHeal } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no/yes-no.component";
import { ActionEvents } from "../../store/player/player.types";

export default function Heal() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const priceHeal = useAppSelector(selectPriceHeal);

  return (
    <YesNo
      text={`Do you want to heal for $${priceHeal}?`}
      onYes={() => {
        if (priceHeal <= playerMoney) {
          dispatch(healPlayer(priceHeal));
        } else {
          dispatch(addPlayerEvent("You don't have enough money to heal!"));
        }
        dispatch(updateActionEvent(ActionEvents.Main));
      }}
      onNo={() => dispatch(updateActionEvent(ActionEvents.Main))}
    />
  );
}
