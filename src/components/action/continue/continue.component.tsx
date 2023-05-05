import type { FC } from "react";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

type ContinueProps = {
  text?: string;
  buttonText?: string;
  onContinue: Function;
};

const Continue: FC<ContinueProps> = ({ text, buttonText, onContinue }) => {
  useKeyDown(() => onContinue(), ["Enter"]);

  return (
    <DialogBox>
      <span>{text}</span>
      <Button onClick={() => onContinue()}>
        {buttonText ? buttonText : "continue"}
      </Button>
    </DialogBox>
  );
};

export default Continue;
