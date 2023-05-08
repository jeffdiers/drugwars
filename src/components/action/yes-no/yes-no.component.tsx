import type { FC } from "react";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

type YesNoProps = {
  text: string;
  onYes: Function;
  onNo: Function;
};

const YesNo: FC<YesNoProps> = ({ text, onYes, onNo }) => {
  useKeyDown(() => onYes(), ["y"]);
  useKeyDown(() => onNo(), ["n"]);

  return (
    <DialogBox>
      <span>{text}</span>
      <Button onClick={() => onYes()}>yes</Button>
      <Button onClick={() => onNo()}>no</Button>
    </DialogBox>
  );
};

export default YesNo;
