import { FC } from "react";

import Input from "./input.component";

type InputYesNoProps = {
  text: string;
  onYes: Function;
  onNo: Function;
};

const InputYesNo: FC<InputYesNoProps> = ({ text, onYes, onNo }) => {
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
    <Input onKeyDown={handleOnKeyDown}>
      {text}
      <br />
      Press y or n
    </Input>
  );
};

export default InputYesNo;
