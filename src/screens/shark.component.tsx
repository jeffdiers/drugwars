import { KeyboardEvent, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import {
  depositShark,
  withdrawShark,
  selectSharkBalance,
} from "../store/shark/shark.slice";
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

  const debt = useAppSelector(selectSharkBalance);
  const money = useAppSelector(selectMoney);

  const dispatch = useAppDispatch();

  const handleOnKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    if (event.key === "y") setCurrentAsk(CurrentAsk.ASK_DEPOSIT);
    if (event.key === "n") dispatch(updateStage(GameStage.BANK));
  };

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > debt) {
      setInfo("That's more than you owe!");
    } else if (amount > money) {
      setInfo("You don't have enough!");
    } else {
      setInfo("");
      setCurrentAsk(CurrentAsk.ASK_WITHDRAW);
      dispatch(withdrawPlayer(amount));
      dispatch(depositShark(amount));
    }
  };

  const handleValueWithdraw = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (debt > 0 && amount > debt) {
      setInfo("You can't borrow more than you owe!");
    } else if (amount > money) {
      setInfo("You can't borrow more than you have!");
    } else {
      setInfo("");
      dispatch(withdrawShark(amount));
      dispatch(depositPlayer(amount));
      dispatch(updateStage(GameStage.BANK));
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <Input onKeyDown={handleOnKeyDown}>
          Would you like to visit the loan shark?
        </Input>
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <SubmitInput
          name="amount"
          labelText={`How much would you like to repay? Debt: ${debt} | Wallet: ${money}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <SubmitInput
          name="amount"
          labelText={`How much would you like to borrow? Debt: ${debt} | Wallet: ${money}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
