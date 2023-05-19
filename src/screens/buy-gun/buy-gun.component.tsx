import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import {
  buyGun,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerArea,
  selectPlayerCoatSpace,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { selectPriceGun } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no/yes-no.component";
import { ActionEvents, Areas } from "../../store/player/player.types";

export default function BuyGun() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const playerArea = useAppSelector(selectPlayerArea);
  const priceGun = useAppSelector(selectPriceGun);

  const handleUpdateActionEvent = () => {
    playerArea === Areas.Bronx
      ? dispatch(updateActionEvent(ActionEvents.Shark))
      : dispatch(updateActionEvent(ActionEvents.Main));
  };

  return (
    <YesNo
      text={`Would you like to buy a gun for ${moneyFormatter(
        priceGun
      )}? (5 pockets)`}
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
        handleUpdateActionEvent();
      }}
      onNo={() => handleUpdateActionEvent()}
    />
  );
}
