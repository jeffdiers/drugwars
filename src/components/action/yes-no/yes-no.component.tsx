import { FC } from "react";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";

import { YesNoContainer } from "./yes-no.styles";

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
      <YesNoContainer>
        <span>{text}</span>
        <Button onClick={() => onYes()}>yes</Button>
        <Button onClick={() => onNo()}>no</Button>
      </YesNoContainer>
    </ActionContainer>
  );
};

export default YesNo;
