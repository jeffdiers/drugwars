import { FC } from "react";
import { Drugs } from "../../../store/player/player.types";
import { getDrugByKey } from "../../../utils/helpers";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";

import { SelectDrugContainer, SelectDrugButtons } from "./select-drug.styles";

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
      <SelectDrugContainer>
        <span>{text}</span>
        <SelectDrugButtons>
          {Object.values(Drugs).map((drug, i) => (
            <Button key={i} onClick={() => onSelect(drug)}>
              {drug}
            </Button>
          ))}
        </SelectDrugButtons>
      </SelectDrugContainer>
    </ActionContainer>
  );
};

export default SelectDrug;
