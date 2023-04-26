import { FC } from "react";

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
      Press ENTER to Continue
    </ActionContainer>
  );
};

export default Continue;
