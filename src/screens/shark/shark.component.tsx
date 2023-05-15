import { useState } from "react";
import {
  depositShark,
  withdrawShark,
  selectSharkBalance,
} from "../../store/shark/shark.slice";
import {
  depositPlayer,
  withdrawPlayer,
  updateActionEvent,
} from "../../store/player/player.slice";
import { selectPlayerMoney } from "../../store/player/player.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import YesNo from "../../components/action/yes-no/yes-no.component";
import InputAmount from "../../components/action/input-amount/input-amount.component";
import { ActionEvents } from "../../store/player/player.types";

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
      dispatch(updateActionEvent(ActionEvents.Bank));
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <YesNo
          text="Would you like to visit the shark?"
          onYes={() => setCurrentAsk(CurrentAsk.ASK_DEPOSIT)}
          onNo={() => dispatch(updateActionEvent(ActionEvents.Bank))}
        />
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <InputAmount
          name="amount"
          type="currency"
          labelText={`How much would you like to repay? Debt: ${moneyFormatter(
            debt
          )} | Wallet: ${moneyFormatter(playerMoney)}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <InputAmount
          name="amount"
          type="currency"
          labelText={`How much would you like to borrow? Debt: ${moneyFormatter(
            debt
          )} | Wallet: ${moneyFormatter(playerMoney)}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
