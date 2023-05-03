import { useState } from "react";
import {
  depositBank,
  withdrawBank,
  selectBankBalance,
} from "../../store/bank/bank.slice";
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

  const bankBalance = useAppSelector(selectBankBalance);

  const playerMoney = useAppSelector(selectPlayerMoney);

  const dispatch = useAppDispatch();

  const handleValueDeposit = (value: string) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      setInfo("That isn't a number!");
    } else if (amount > playerMoney) {
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
      dispatch(updateActionEvent(ActionEvents.Stash));
    }
  };

  return (
    <>
      {currentAsk === CurrentAsk.ASK_VISIT && (
        <YesNo
          text="Would you like to visit the bank?"
          onYes={() => setCurrentAsk(CurrentAsk.ASK_DEPOSIT)}
          onNo={() => dispatch(updateActionEvent(ActionEvents.Stash))}
        />
      )}
      {currentAsk === CurrentAsk.ASK_DEPOSIT && (
        <InputAmount
          name="amount"
          type="currency"
          labelText={`How much would you like to deposit? Bank: ${moneyFormatter(
            bankBalance
          )} | Wallet: ${moneyFormatter(playerMoney)}`}
          handleValue={handleValueDeposit}
        />
      )}
      {currentAsk === CurrentAsk.ASK_WITHDRAW && (
        <InputAmount
          name="amount"
          type="currency"
          labelText={`How much would you like to withdraw? Bank: ${moneyFormatter(
            bankBalance
          )} | Wallet: ${moneyFormatter(playerMoney)}`}
          handleValue={handleValueWithdraw}
        />
      )}

      {info}
    </>
  );
}
