import { FC } from "react";

import Input from "./input.component";

type InputBuySellJetProps = {
  onBuy: Function;
  onSell: Function;
  onJet: Function;
};

const InputBuySellJet: FC<InputBuySellJetProps> = ({
  onBuy,
  onSell,
  onJet,
}) => {
  const isBuySellJet = (key: string) => {
    return key === "b" || key === "s" || key === "j";
  };

  const handleOnKeyDown = (key: string) => {
    if (isBuySellJet(key)) {
      if (key === "b") onBuy();
      if (key === "s") onSell();
      if (key === "j") onJet();
    }
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      Are you going to (B)uy, (S)ell, or (J)et?
    </Input>
  );
};

export default InputBuySellJet;
