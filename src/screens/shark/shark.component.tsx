import { useState } from "react";
import { GameStage, updateStage } from "../../store/main/main.slice";
import {
  depositShark,
  withdrawShark,
  selectSharkBalance,
} from "../../store/shark/shark.slice";
import { depositPlayer, withdrawPlayer } from "../../store/player/player.slice";
import { selectPlayerMoney } from "../../store/player/player.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import YesNo from "../../components/action/yes-no.component";
import InputAmount from "../../components/action/input-amount.component";

export enum CurrentAsk {
  ASK_VISIT,
  ASK_DEPOSIT,
  ASK_WITHDRAW,
}

export default function Shark() {
  const [currentAsk, setCurrentAsk] = useState(CurrentAsk.ASK_VISIT);
  const [info, setInfo] = useState("");

  const debt = useAppSelector(selectSharkBalance);

  const playerMoney = useAppSelector(selectPlayerMoney);

  const dispatch = useAppDispatch();

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > debt) {
      setInfo("That's more than you owe!");
    } else if (amount > playerMoney) {
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
    } else if (amount > playerMoney) {
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
        <YesNo
          text="Would you like to visit the loan shark?"
          onYes={() => setCurrentAsk(CurrentAsk.ASK_DEPOSIT)}
          onNo={() => dispatch(updateStage(GameStage.BANK))}
        />
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <InputAmount
          name="amount"
          labelText={`How much would you like to repay? Debt: ${debt} | Wallet: ${playerMoney}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <InputAmount
          name="amount"
          labelText={`How much would you like to borrow? Debt: ${debt} | Wallet: ${playerMoney}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
