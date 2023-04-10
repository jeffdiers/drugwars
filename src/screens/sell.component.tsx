import { FC, KeyboardEvent, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { selectDrugPrice } from "../store/price/price.slice";
import { Drugs, selectMaxSell, sell } from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getDrugByKey } from "../utils/helpers";

import Input from "../components/input.component";

type AskSellProps = { drug: Drugs };

const AskSell: FC<AskSellProps> = ({ drug }) => {
  const [amount, setAmount] = useState("");

  const dispatch = useAppDispatch();

  const maxSell = useAppSelector((state) => selectMaxSell(state, drug));
  const price = useAppSelector((state) => selectDrugPrice(state, drug));

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (Number(event.key) || event.key === "0") {
      setAmount(amount + event.key);
    }
    if (event.key === "Enter") {
      const canSell = Number(amount) <= maxSell;
      if (canSell) {
        dispatch(sell({ drug, amount: Number(amount), price }));
        dispatch(updateStage(GameStage.MAIN));
      } else {
        setAmount("");
      }
    }
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      How much {drug} would you like to sell? Max Allowed: {maxSell}
      <br />
      {amount}
    </Input>
  );
};

export default function Sell() {
  const [drug, setDrug] = useState<Drugs | undefined>(undefined);
  const [keyInfo, setKeyInfo] = useState<boolean>(false);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    const drugKey = getDrugByKey(event.key);
    if (!drugKey) setKeyInfo(true);
    setDrug(drugKey);
  };

  return (
    <div>
      {drug ? (
        <AskSell drug={drug} />
      ) : (
        <Input onKeyDown={handleOnKeyDown}>What would you like to sell?</Input>
      )}
      {keyInfo && <div>Enter the first letter of a drug to choose!</div>}
    </div>
  );
}
