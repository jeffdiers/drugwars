import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import {
  upgradeCoat,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import { selectPlayerMoney } from "../../store/player/player.selectors";
import { selectPriceCoat } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no.component";
import { ActionEvents } from "../../store/player/player.types";

export default function BuyCoat() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const priceCoat = useAppSelector(selectPriceCoat);

  return (
    <YesNo
      text={`Would you like to buy 15 more pockets for more drugs? It's $${priceCoat}`}
      onYes={() => {
        if (priceCoat <= playerMoney) {
          dispatch(upgradeCoat(priceCoat));
        } else {
          dispatch(
            addPlayerEvent("You don't have enough money to buy a coat!")
          );
        }
        dispatch(updateActionEvent(ActionEvents.Main));
      }}
      onNo={() => dispatch(updateActionEvent(ActionEvents.Main))}
    />
  );
}
