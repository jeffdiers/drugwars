import { FC } from "react";
import { getAreaByKey } from "../utils/helpers";

import Input from "./input.component";
import { Areas } from "../store/player/player.slice";

type InputSelectAreaProps = {
  onSelect: (key: Areas) => void;
};

const InputSelectArea: FC<InputSelectAreaProps> = ({ onSelect }) => {
  const handleOnKeyDown = (key: string) => {
    const areaKey = getAreaByKey(key);
    if (areaKey) onSelect(areaKey);
  };

  return <Input onKeyDown={handleOnKeyDown}>Where you gonna go?</Input>;
};

export default InputSelectArea;
