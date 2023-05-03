import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";
import { buy, updateActionEvent } from "../../store/player/player.slice";
import {
  selectPlayerCoatSpace,
  selectPlayerMoney,
} from "../../store/player/player.selectors";
import { ActionEvents, Drugs } from "../../store/player/player.types";
import { selectPriceDrugs } from "../../store/price/price.selectors";

import InputAmount from "../../components/action/input-amount/input-amount.component";
import SelectDrug from "../../components/action/select-drug/select-drug.component";
import PriceBox from "../../components/price-box/price-box.component";

enum AskBuy {
  ASK_SELECT,
  ASK_BUY,
}

export default function Buy() {
  const dispatch = useAppDispatch();

  const [currentAsk, setCurrentAsk] = useState(AskBuy.ASK_SELECT);
  const [currentDrug, setCurrentDrug] = useState(Drugs.One);
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
        <>
          <PriceBox />
          <SelectDrug
            text="What would you like to buy?"
            onSelect={(drugKey) => {
              setCurrentDrug(drugKey);
              setCurrentAsk(AskBuy.ASK_BUY);
            }}
            onExit={() => dispatch(updateActionEvent(ActionEvents.Main))}
          />
        </>
      )}
      {currentAsk === AskBuy.ASK_BUY && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to buy? Price: ${moneyFormatter(
            priceDrugs[currentDrug]
          )} | Max allowed: ${maxBuy}`}
          handleValue={handleValueBuy}
        />
      )}
      {info}
    </>
  );
}
