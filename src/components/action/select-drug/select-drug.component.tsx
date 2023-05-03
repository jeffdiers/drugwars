import { FC } from "react";
import { Drugs } from "../../../store/player/player.types";
import { getDrugByKey } from "../../../utils/helpers";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

import { SelectDrugButtons } from "./select-drug.styles";

type SelectDrugProps = {
  text: string;
  onSelect: (key: Drugs) => void;
  onExit: () => void;
};

const SelectDrug: FC<SelectDrugProps> = ({ text, onSelect, onExit }) => {
  const handleOnKeyDown = (key: string) => {
    const drugKey = getDrugByKey(key);
    if (drugKey) onSelect(drugKey);
    if (key === "x") onExit();
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      <DialogBox>
        <span>{text}</span>
        <SelectDrugButtons>
          {Object.values(Drugs).map((drug, i) => (
            <Button key={i} onClick={() => onSelect(drug)}>
              {drug}
            </Button>
          ))}
        </SelectDrugButtons>
        <Button onClick={() => onExit()}>exit</Button>
      </DialogBox>
    </ActionContainer>
  );
};

export default SelectDrug;
