import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { buy, updateActionEvent } from "../../store/player/player.slice";
import {
  selectPlayerCoatSpace,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { ActionEvents, Drugs } from "../../store/player/player.types";
import { selectPriceDrugs } from "../../store/price/price.selectors";

import InputAmount from "../../components/action/input-amount.component";
import SelectDrug from "../../components/action/select-drug.component";

enum AskBuy {
  ASK_SELECT,
  ASK_BUY,
}

export default function Buy() {
  const dispatch = useAppDispatch();

  const [currentAsk, setCurrentAsk] = useState(AskBuy.ASK_SELECT);
  const [currentDrug, setCurrentDrug] = useState(Drugs.Cocaine);
  const [maxBuy, setMaxBuy] = useState(0);
  const [info, setInfo] = useState("");

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const priceDrugs = useAppSelector(selectPriceDrugs);

  const handleValueBuy = (value: string) => {
    const amount = Number(value);
    const price = priceDrugs[currentDrug];
    const canBuy = amount >= 0 && amount <= maxBuy;
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (!canBuy) {
      setInfo("You don't have enough money/coat space to buy that!");
    } else {
      setInfo("");
      dispatch(buy({ drug: currentDrug, amount, price }));
      dispatch(updateActionEvent(ActionEvents.Main));
    }
  };

  useEffect(() => {
    const price = priceDrugs[currentDrug];
    const maxAmount = Math.floor(playerMoney / price);
    const max = maxAmount > playerCoatSpace ? playerCoatSpace : maxAmount;
    setMaxBuy(max);
  }, [currentDrug, playerMoney, playerCoatSpace, priceDrugs]);

  return (
    <>
      {currentAsk === AskBuy.ASK_SELECT && (
        <SelectDrug
          text="What would you like to buy?"
          onSelect={(drugKey) => {
            setCurrentDrug(drugKey);
            setCurrentAsk(AskBuy.ASK_BUY);
          }}
        />
      )}
      {currentAsk === AskBuy.ASK_BUY && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to buy? Max Allowed: ${maxBuy}`}
          handleValue={handleValueBuy}
        />
      )}
      {info}
    </>
  );
}
