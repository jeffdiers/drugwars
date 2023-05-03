import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import {
  upgradeCoat,
  addPlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerArea,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { selectPriceCoat } from "../../store/price/price.selectors";

import YesNo from "../../components/action/yes-no/yes-no.component";
import { ActionEvents, Areas } from "../../store/player/player.types";

export default function BuyCoat() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerArea = useAppSelector(selectPlayerArea);
  const priceCoat = useAppSelector(selectPriceCoat);

  const handleUpdateActionEvent = () => {
    playerArea === Areas.Bronx
      ? dispatch(updateActionEvent(ActionEvents.Shark))
      : dispatch(updateActionEvent(ActionEvents.Main));
  };

  return (
    <YesNo
      text={`Would you like to buy 15 more pockets for more drugs? It's ${moneyFormatter(
        priceCoat
      )}`}
      onYes={() => {
        if (priceCoat <= playerMoney) {
          dispatch(upgradeCoat(priceCoat));
        } else {
          dispatch(
            addPlayerEvent("You don't have enough money to buy a coat!")
          );
        }
        handleUpdateActionEvent();
      }}
      onNo={() => handleUpdateActionEvent()}
    />
  );
}
