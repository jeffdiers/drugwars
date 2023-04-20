import { FC } from "react";

import Input from "./input.component";

type InputContinueProps = {
  text: string;
  onContinue: Function;
};

const InputContinue: FC<InputContinueProps> = ({ text, onContinue }) => {
  const handleOnKeyDown = (key: string) => {
    if (key === "Enter") onContinue();
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      {text}
      <br />
      Press ENTER to Continue
    </Input>
  );
};

export default InputContinue;
