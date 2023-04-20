import { useEffect, useState } from "react";
import { GameStage, updateStage } from "../../store/main/main.slice";
import { selectPrices } from "../../store/price/price.slice";
import { Drugs, selectPlayer, sell } from "../../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import InputAmount from "../../components/input-amount.component";
import InputSelectDrug from "../../components/input-select-drug.component";

enum AskSell {
  ASK_SELECT,
  ASK_SELL,
}

export default function Sell() {
  const [currentAsk, setCurrentAsk] = useState(AskSell.ASK_SELECT);
  const [currentDrug, setCurrentDrug] = useState(Drugs.Cocaine);
  const [maxSell, setMaxSell] = useState(0);
  const [info, setInfo] = useState("");

  const player = useAppSelector(selectPlayer);
  const prices = useAppSelector(selectPrices);

  const dispatch = useAppDispatch();

  const handleValueSell = (value: string) => {
    const amount = Number(value);
    const price = prices[currentDrug];
    const canSell = amount <= maxSell;
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (!canSell) {
      setInfo("You don't have enough money/coat space to buy that!");
    } else {
      setInfo("");
      dispatch(sell({ drug: currentDrug, amount, price }));
      dispatch(updateStage(GameStage.MAIN));
    }
  };

  useEffect(() => {
    const max = player[currentDrug];
    setMaxSell(max);
  }, [currentDrug, player]);

  return (
    <>
      {currentAsk === AskSell.ASK_SELECT && (
        <InputSelectDrug
          text="What would you like to sell?"
          onSelect={(drugKey) => {
            setCurrentDrug(drugKey);
            setCurrentAsk(AskSell.ASK_SELL);
          }}
        />
      )}
      {currentAsk === AskSell.ASK_SELL && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to sell? Max Allowed: ${maxSell}`}
          handleValue={handleValueSell}
        />
      )}
      {info}
    </>
  );
}
