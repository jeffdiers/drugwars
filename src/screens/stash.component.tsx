import { KeyboardEvent, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import {
  depositStash,
  withdrawStash,
  selectStashBalance,
} from "../store/stash/stash.slice";
import { buy, sell, selectPlayer, Drugs } from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getDrugByKey } from "../utils/helpers";

import Input from "../components/input.component";
import SubmitInput from "../components/input-submit.component";

export enum CurrentAsk {
  ASK_VISIT,
  ASK_SELECT_DRUG,
  ASK_DEPOSIT,
  ASK_WITHDRAW,
}

export default function Shark() {
  const [currentAsk, setCurrentAsk] = useState(CurrentAsk.ASK_VISIT);
  const [currentDrug, setCurrentDrug] = useState<Drugs>(Drugs.Cocaine);
  const [info, setInfo] = useState("");

  const stash = useAppSelector(selectStashBalance);
  const player = useAppSelector(selectPlayer);

  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    if (event.key === "y") setCurrentAsk(CurrentAsk.ASK_SELECT_DRUG);
    if (event.key === "n") dispatch(updateStage(GameStage.MAIN));
  };

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
      setCurrentAsk(CurrentAsk.ASK_DEPOSIT);
    }
  };

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > player[currentDrug]) {
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
      dispatch(buy({ drug: currentDrug, amount, price: 0 }));
      dispatch(withdrawStash({ drug: currentDrug, amount }));
      setCurrentAsk(CurrentAsk.ASK_SELECT_DRUG);
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <Input onKeyDown={handleOnKeyDown}>
          Would you like to stash any drugs?
        </Input>
      )}
      {currentAsk === CurrentAsk.ASK_SELECT_DRUG && (
        <Input onKeyDown={handleOnKeyDownSelectDrug}>
          Which drug do you want to stash?
        </Input>
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <SubmitInput
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to deposit? Stash: ${stash[currentDrug]} | Coat: ${player[currentDrug]}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <SubmitInput
          name={currentDrug}
          labelText={`How much ${currentDrug} would you like to take out? Stash: ${stash[currentDrug]} | Coat: ${player[currentDrug]}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
