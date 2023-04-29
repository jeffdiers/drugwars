import { FC } from "react";

import ActionContainer from "./action-container.component";
import Button from "../button/button.component";

type BuySellJetProps = {
  onBuy: Function;
  onSell: Function;
  onJet: Function;
};

const BuySellJet: FC<BuySellJetProps> = ({ onBuy, onSell, onJet }) => {
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
    <ActionContainer onKeyDown={handleOnKeyDown}>
      Are you going to (B)uy, (S)ell, or (J)et?
      <br />
      <Button onClick={() => onBuy()}>buy</Button>
      <Button onClick={() => onSell()}>sell</Button>
      <Button onClick={() => onJet()}>jet</Button>
    </ActionContainer>
  );
};

export default BuySellJet;
