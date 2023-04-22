import { FC } from "react";
import { Drugs } from "../../store/player/player.types";
import { getDrugByKey } from "../../utils/helpers";

import ActionContainer from "./action-container.component";

type SelectDrugProps = {
  text: string;
  onSelect: (key: Drugs) => void;
};

const SelectDrug: FC<SelectDrugProps> = ({ text, onSelect }) => {
  const handleOnKeyDown = (key: string) => {
    const drugKey = getDrugByKey(key);
    if (drugKey) onSelect(drugKey);
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      {text}
      <br />
      Enter the first letter of a drug to choose!
    </ActionContainer>
  );
};

export default SelectDrug;
