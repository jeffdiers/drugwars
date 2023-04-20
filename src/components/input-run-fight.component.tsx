import { FC } from "react";

import Input from "./input.component";

type InputRunFightProps = {
  onRun: Function;
  onFight: Function;
  canFight: boolean;
};

const InputRunFight: FC<InputRunFightProps> = ({
  onRun,
  onFight,
  canFight,
}) => {
  const isRunFight = (key: string) => {
    return key === "r" || key === "f";
  };

  const handleOnKeyDown = (key: string) => {
    if (isRunFight(key)) {
      if (key === "r") onRun();
      if (key === "f" && canFight) onFight();
    }
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      {canFight ? `Will you run or fight?` : `Will you run?`}
    </Input>
  );
};

export default InputRunFight;
