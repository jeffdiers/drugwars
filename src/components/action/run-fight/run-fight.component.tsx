import type { FC } from "react";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";

import { RunFightContainer } from "./run-fight.styles";

type RunFightProps = {
  onRun: Function;
  onFight: Function;
  canFight: boolean;
};

const RunFight: FC<RunFightProps> = ({ onRun, onFight, canFight }) => {
  useKeyDown(() => onRun(), ["r"]);
  useKeyDown(() => canFight && onFight(), ["f"]);

  return (
    <RunFightContainer>
      <span>{canFight ? `Will you run or fight?` : `Will you run?`}</span>
      {canFight && <Button onClick={() => onFight()}>fight</Button>}
      <Button onClick={() => onRun()}>run</Button>
    </RunFightContainer>
  );
};

export default RunFight;
