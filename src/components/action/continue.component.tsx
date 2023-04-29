import { FC } from "react";

import Button from "../button/button.component";
import ActionContainer from "./action-container.component";

type ContinueProps = {
  text?: string;
  buttonText?: string;
  onContinue: Function;
};

const Continue: FC<ContinueProps> = ({ text, buttonText, onContinue }) => {
  const handleOnKeyDown = (key: string) => {
    if (key === "Enter") onContinue();
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      {text}
      <Button onClick={() => onContinue()}>
        {buttonText ? buttonText : "continue"}
      </Button>
    </ActionContainer>
  );
};

export default Continue;
