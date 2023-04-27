import { FC } from "react";

import Button from "../button.component";
import ActionContainer from "./action-container.component";

type ContinueProps = {
  text?: string;
  onContinue: Function;
};

const Continue: FC<ContinueProps> = ({ text, onContinue }) => {
  const handleOnKeyDown = (key: string) => {
    if (key === "Enter") onContinue();
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      {text}
      <br />
      <Button onClick={() => onContinue()}>ok</Button>
      <br />
      Press ENTER to Continue
    </ActionContainer>
  );
};

export default Continue;
