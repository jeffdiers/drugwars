import type { FC } from "react";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

type BuySellJetProps = {
  onBuy: Function;
  onSell: Function;
  onJet: Function;
};

const BuySellJet: FC<BuySellJetProps> = ({ onBuy, onSell, onJet }) => {
  useKeyDown(() => onBuy(), ["b"]);
  useKeyDown(() => onSell(), ["s"]);
  useKeyDown(() => onJet(), ["j"]);

  return (
    <DialogBox>
      <span>What are you gonna do?</span>
      <Button onClick={() => onBuy()}>buy</Button>
      <Button onClick={() => onSell()}>sell</Button>
      <Button onClick={() => onJet()}>jet</Button>
    </DialogBox>
  );
};

export default BuySellJet;
