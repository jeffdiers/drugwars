import { KeyboardEvent, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import {
  depositBank,
  withdrawBank,
  selectBankBalance,
} from "../store/bank/bank.slice";
import {
  depositPlayer,
  withdrawPlayer,
  selectMoney,
} from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

import Input from "../components/input.component";
import SubmitInput from "../components/input-submit.component";

export enum CurrentAsk {
  ASK_VISIT,
  ASK_DEPOSIT,
  ASK_WITHDRAW,
}

export default function Shark() {
  const [currentAsk, setCurrentAsk] = useState(CurrentAsk.ASK_VISIT);
  const [info, setInfo] = useState("");

  const bankBalance = useAppSelector(selectBankBalance);
  const money = useAppSelector(selectMoney);

  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    if (event.key === "y") setCurrentAsk(CurrentAsk.ASK_DEPOSIT);
    if (event.key === "n") dispatch(updateStage(GameStage.STASH));
  };

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > money) {
      setInfo("You don't have that much!");
    } else {
      setInfo("");
      setCurrentAsk(CurrentAsk.ASK_WITHDRAW);
      dispatch(withdrawPlayer(amount));
      dispatch(depositBank(amount));
    }
  };

  const handleValueWithdraw = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > bankBalance) {
      setInfo("You don't have that much!");
    } else {
      setInfo("");
      dispatch(withdrawBank(amount));
      dispatch(depositPlayer(amount));
      dispatch(updateStage(GameStage.STASH));
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <Input onKeyDown={handleOnKeyDown}>
          Would you like to visit the bank?
        </Input>
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <SubmitInput
          name="amount"
          labelText={`How much would you like to deposit? Bank: ${bankBalance} | Wallet: ${money}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <SubmitInput
          name="amount"
          labelText={`How much would you like to withdraw? Bank: ${bankBalance} | Wallet: ${money}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
