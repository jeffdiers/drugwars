import { FC, KeyboardEvent, useState } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { Drugs, selectMaxBuy, buy } from "../store/player/player.slice";
import { selectDrugPrice } from "../store/price/price.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getDrugByKey } from "../utils/helpers";

import Input from "../components/input.component";

type AskBuyProps = { drug: Drugs };

const AskBuy: FC<AskBuyProps> = ({ drug }) => {
  const [amount, setAmount] = useState("");

  const dispatch = useAppDispatch();

  const maxBuy = useAppSelector((state) => selectMaxBuy(state, drug));
  const price = useAppSelector((state) => selectDrugPrice(state, drug));

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (Number(event.key) || event.key === "0") {
      setAmount(amount + event.key);
    }
    if (event.key === "Enter") {
      const canBuy = Number(amount) > 0 && Number(amount) <= maxBuy;
      if (canBuy) {
        dispatch(buy({ drug, amount: Number(amount), price }));
        dispatch(updateStage(GameStage.MAIN));
      } else {
        setAmount("");
      }
    }
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      <>
        How much {drug} would you like to buy? Max Allowed: {maxBuy}
        <br />
        {amount}
      </>
    </Input>
  );
};

export default function Buy() {
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
        <AskBuy drug={drug} />
      ) : (
        <Input onKeyDown={handleOnKeyDown}>What would you like to buy?</Input>
      )}
      {keyInfo && <div>Enter the first letter of a drug to choose!</div>}
    </div>
  );
}
