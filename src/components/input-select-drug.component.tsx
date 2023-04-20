import { FC } from "react";
import { getDrugByKey } from "../utils/helpers";

import Input from "./input.component";
import { Drugs } from "../store/player/player.slice";

type InputSelectDrugProps = {
  text: string;
  onSelect: (key: Drugs) => void;
};

const InputSelectDrug: FC<InputSelectDrugProps> = ({ text, onSelect }) => {
  const handleOnKeyDown = (key: string) => {
    const drugKey = getDrugByKey(key);
    if (drugKey) onSelect(drugKey);
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      {text}
      <br />
      Enter the first letter of a drug to choose!
    </Input>
  );
};

export default InputSelectDrug;
