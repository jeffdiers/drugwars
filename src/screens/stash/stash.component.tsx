import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";

import {
  depositStash,
  withdrawStash,
  selectStashBalance,
} from "../../store/stash/stash.slice";
import { buy, sell, updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents, Drugs } from "../../store/player/player.types";

import YesNo from "../../components/action/yes-no/yes-no.component";
import InputAmount from "../../components/action/input-amount/input-amount.component";
import SelectDrug from "../../components/action/select-drug/select-drug.component";
import { selectPlayerInventory } from "../../store/player/player.selectors";

export enum CurrentAsk {
  ASK_VISIT,
  ASK_SELECT_DRUG,
  ASK_DEPOSIT,
  ASK_WITHDRAW,
}

export default function Shark() {
  const [currentAsk, setCurrentAsk] = useState(CurrentAsk.ASK_VISIT);
  const [currentDrug, setCurrentDrug] = useState<Drugs>(Drugs.One);
  const [info, setInfo] = useState("");

  const stash = useAppSelector(selectStashBalance);

  const playerInventory = useAppSelector(selectPlayerInventory);

  const dispatch = useAppDispatch();

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > playerInventory[currentDrug]) {
      setInfo(`You don't have that much ${currentDrug}!`);
    } else {
      setInfo("");
      setCurrentAsk(CurrentAsk.ASK_WITHDRAW);
      dispatch(sell({ drug: currentDrug, amount, price: 0 }));
      dispatch(depositStash({ drug: currentDrug, amount }));
    }
  };

  const handleValueWithdraw = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > stash[currentDrug]) {
      setInfo(`You don't have that much ${currentDrug} in your stash!`);
    } else {
      setInfo("");
      setCurrentAsk(CurrentAsk.ASK_SELECT_DRUG);
      dispatch(buy({ drug: currentDrug, amount, price: 0 }));
      dispatch(withdrawStash({ drug: currentDrug, amount }));
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <YesNo
          text="Would you like to stash any drugs?"
          onYes={() => setCurrentAsk(CurrentAsk.ASK_SELECT_DRUG)}
          onNo={() => dispatch(updateActionEvent(ActionEvents.Main))}
        />
      )}
      {currentAsk === CurrentAsk.ASK_SELECT_DRUG && (
        <SelectDrug
          text="Which drug do you want to stash?"
          onSelect={(drugKey) => {
            setCurrentDrug(drugKey);
            setCurrentAsk(CurrentAsk.ASK_DEPOSIT);
          }}
          onExit={() => dispatch(updateActionEvent(ActionEvents.Main))}
        />
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to deposit? Stash: ${stash[currentDrug]} | Coat: ${playerInventory[currentDrug]}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <InputAmount
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to take out? Stash: ${stash[currentDrug]} | Coat: ${playerInventory[currentDrug]}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
