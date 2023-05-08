import type { FC } from "react";
import { Drugs } from "../../../store/player/player.types";
import { getFirstLetter } from "../../../utils/helpers";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

import { SelectDrugButtons } from "./select-drug.styles";

type SelectDrugProps = {
  text: string;
  onSelect: (key: Drugs) => void;
  onExit: () => void;
};

const SelectDrug: FC<SelectDrugProps> = ({ text, onSelect, onExit }) => {
  useKeyDown(() => onSelect(Drugs.One), [getFirstLetter(Drugs.One)]);
  useKeyDown(() => onSelect(Drugs.Two), [getFirstLetter(Drugs.Two)]);
  useKeyDown(() => onSelect(Drugs.Three), [getFirstLetter(Drugs.Three)]);
  useKeyDown(() => onSelect(Drugs.Four), [getFirstLetter(Drugs.Four)]);
  useKeyDown(() => onSelect(Drugs.Five), [getFirstLetter(Drugs.Five)]);
  useKeyDown(() => onSelect(Drugs.Six), [getFirstLetter(Drugs.Six)]);
  useKeyDown(() => onExit(), ["x"]);

  return (
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
  );
};

export default SelectDrug;
