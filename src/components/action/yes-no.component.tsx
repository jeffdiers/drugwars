import { FC } from "react";

import ActionContainer from "./action-container.component";
import Button from "../button/button.component";

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
      {text}
      <br />
      <Button onClick={() => onYes()}>yes</Button>
      <Button onClick={() => onNo()}>no</Button>
    </ActionContainer>
  );
};

export default YesNo;
