import { FC } from "react";

import ActionContainer from "./action-container.component";

type RunFightProps = {
  onRun: Function;
  onFight: Function;
  canFight: boolean;
};

const RunFight: FC<RunFightProps> = ({ onRun, onFight, canFight }) => {
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
    <ActionContainer onKeyDown={handleOnKeyDown}>
      {canFight ? `Will you run or fight?` : `Will you run?`}
    </ActionContainer>
  );
};

export default RunFight;
