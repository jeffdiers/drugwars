import { KeyboardEvent, useEffect, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import {
  Drugs,
  selectPlayer,
  selectTotalInventory,
  buy,
} from "../store/player/player.slice";
import { selectPrices } from "../store/price/price.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getDrugByKey } from "../utils/helpers";

import Input from "../components/input.component";
import SubmitInput from "../components/input-submit.component";

enum AskBuy {
  ASK_SELECT,
  ASK_BUY,
}

export default function Buy() {
  const [currentAsk, setCurrentAsk] = useState(AskBuy.ASK_SELECT);
  const [currentDrug, setCurrentDrug] = useState(Drugs.Cocaine);
  const [maxBuy, setMaxBuy] = useState(0);
  const [info, setInfo] = useState("");

  const player = useAppSelector(selectPlayer);
  const totalInventory = useAppSelector(selectTotalInventory);
  const prices = useAppSelector(selectPrices);

  const dispatch = useAppDispatch();

  const handleOnKeyDownSelectDrug = (event: KeyboardEvent) => {
    event.preventDefault();

    const drugKey = getDrugByKey(event.key);
    if (event.key === "x") {
      dispatch(updateStage(GameStage.MAIN));
    } else if (!drugKey) {
      setInfo("Enter the first letter of a drug to choose! Or x to exit");
    } else {
      setInfo("");
      setCurrentDrug(drugKey);
      setCurrentAsk(AskBuy.ASK_BUY);
    }
  };

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
        <Input onKeyDown={handleOnKeyDownSelectDrug}>
          What would you like to buy?
        </Input>
      )}
      {currentAsk === AskBuy.ASK_BUY && (
        <SubmitInput
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to buy? Max Allowed: ${maxBuy}`}
          handleValue={handleValueBuy}
        />
      )}
      {info}
    </>
  );
}
