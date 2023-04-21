import { useEffect, useState } from "react";
import { GameStage, updateStage } from "../../store/main/main.slice";
import {
  Drugs,
  selectPlayer,
  selectTotalInventory,
  buy,
} from "../../store/player/player.slice";
import { selectPrices } from "../../store/price/price.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

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

  const player = useAppSelector(selectPlayer);
  const totalInventory = useAppSelector(selectTotalInventory);
  const prices = useAppSelector(selectPrices);

  const handleValueBuy = (value: string) => {
    const amount = Number(value);
    const price = prices[currentDrug];
    const canBuy = amount >= 0 && amount <= maxBuy;
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (!canBuy) {
      setInfo("You don't have enough money/coat space to buy that!");
    } else {
      setInfo("");
      dispatch(buy({ drug: currentDrug, amount, price }));
      dispatch(updateStage(GameStage.MAIN));
    }
  };

  useEffect(() => {
    const price = prices[currentDrug];
    const maxAmount = Math.floor(player.money / price);
    const coatSpace = player.maxTrench - totalInventory;
    const max = maxAmount > coatSpace ? coatSpace : maxAmount;
    setMaxBuy(max);
  }, [currentDrug, player.money, player.maxTrench, prices, totalInventory]);

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
