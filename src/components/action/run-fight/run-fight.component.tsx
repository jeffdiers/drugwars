import { FC } from "react";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";

import { RunFightContainer } from "./run-fight.styles";

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
      <RunFightContainer>
        <span>{canFight ? `Will you run or fight?` : `Will you run?`}</span>
        {canFight && <Button onClick={() => onFight()}>fight</Button>}
        <Button onClick={() => onRun()}>run</Button>
      </RunFightContainer>
    </ActionContainer>
  );
};

export default RunFight;
