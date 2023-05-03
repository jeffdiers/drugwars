import { useEffect, useState } from "react";
import { sell, updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents, Drugs } from "../../store/player/player.types";
import { selectPlayerInventory } from "../../store/player/player.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";

import InputAmount from "../../components/action/input-amount/input-amount.component";
import SelectDrug from "../../components/action/select-drug/select-drug.component";

import { selectPriceDrugs } from "../../store/price/price.selectors";
import { moneyFormatter } from "../../utils/helpers";
import PriceBox from "../../components/price-box/price-box.component";

enum AskSell {
  ASK_SELECT,
  ASK_SELL,
}

export default function Sell() {
  const [currentAsk, setCurrentAsk] = useState(AskSell.ASK_SELECT);
  const [currentDrug, setCurrentDrug] = useState(Drugs.One);
  const [maxSell, setMaxSell] = useState(0);
  const [info, setInfo] = useState("");

  const playerInventory = useAppSelector(selectPlayerInventory);
  const priceDrugs = useAppSelector(selectPriceDrugs);

  const dispatch = useAppDispatch();

  const handleValueSell = (value: string) => {
    const amount = Number(value);
    const price = priceDrugs[currentDrug];
    const canSell = amount <= maxSell;
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (!canSell) {
      setInfo("You don't have enough money/coat space to buy that!");
    } else {
      setInfo("");
      dispatch(sell({ drug: currentDrug, amount, price }));
      dispatch(updateActionEvent(ActionEvents.Main));
    }
  };

  useEffect(() => {
    const max = playerInventory[currentDrug];
    setMaxSell(max);
  }, [currentDrug, playerInventory]);

  return (
    <>
      {currentAsk === AskSell.ASK_SELECT && (
        <>
          <PriceBox />
          <SelectDrug
            text="What would you like to sell?"
            onSelect={(drugKey) => {
              setCurrentDrug(drugKey);
              setCurrentAsk(AskSell.ASK_SELL);
            }}
            onExit={() => dispatch(updateActionEvent(ActionEvents.Main))}
          />
        </>
      )}
      {currentAsk === AskSell.ASK_SELL && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to sell? Price: ${moneyFormatter(
            priceDrugs[currentDrug]
          )} | Max allowed: ${maxSell}`}
          handleValue={handleValueSell}
        />
      )}
      {info}
    </>
  );
}
