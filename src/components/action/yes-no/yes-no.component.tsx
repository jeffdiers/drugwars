import { FC } from "react";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

type YesNoProps = {
  text: string;
  onYes: Function;
  onNo: Function;
};

const YesNo: FC<YesNoProps> = ({ text, onYes, onNo }) => {
  const isYesNo = (key: string) => {
    return key === "y" || key === "n";
  };

  const handleOnKeyDown = (key: string) => {
    if (isYesNo(key)) {
      if (key === "y") onYes();
      if (key === "n") onNo();
    }
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      <DialogBox>
        <span>{text}</span>
        <Button onClick={() => onYes()}>yes</Button>
        <Button onClick={() => onNo()}>no</Button>
      </DialogBox>
    </ActionContainer>
  );
};

export default YesNo;
