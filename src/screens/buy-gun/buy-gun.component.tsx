import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import {
  buyGun,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerCoatSpace,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { selectPriceGun } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no/yes-no.component";
import { ActionEvents } from "../../store/player/player.types";

export default function BuyGun() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const priceGun = useAppSelector(selectPriceGun);

  return (
    <YesNo
      text={`Would you like to buy a gun for $${priceGun}?`}
      onYes={() => {
        if (priceGun <= playerMoney && playerCoatSpace >= 5) {
          dispatch(buyGun(priceGun));
        } else {
          dispatch(
            addPlayerEvent(
              "You don't have enough money/coat space to buy a gun!"
            )
          );
        }
        dispatch(updateActionEvent(ActionEvents.Main));
      }}
      onNo={() => dispatch(updateActionEvent(ActionEvents.Main))}
    />
  );
}
