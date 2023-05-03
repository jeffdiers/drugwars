import { FC } from "react";
import { Areas } from "../../../store/player/player.types";
import { useKeyDown } from "../../../utils/hooks";

import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

import { SelectAreaButtons } from "./select-area.styles";

type SelectAreaProps = {
  onSelect: (key: Areas) => void;
  onExit: () => void;
};

const SelectArea: FC<SelectAreaProps> = ({ onSelect, onExit }) => {
  useKeyDown(() => onSelect(Areas.Bronx), ["1"]);
  useKeyDown(() => onSelect(Areas.Queens), ["2"]);
  useKeyDown(() => onSelect(Areas.CentralPark), ["3"]);
  useKeyDown(() => onSelect(Areas.Manhattan), ["4"]);
  useKeyDown(() => onSelect(Areas.ConeyIsland), ["5"]);
  useKeyDown(() => onSelect(Areas.Brooklyn), ["6"]);
  useKeyDown(() => onExit(), ["x"]);

  return (
    <DialogBox>
      <span>Where you gonna go?</span>
      <SelectAreaButtons>
        {Object.values(Areas).map((area, i) => (
          <Button key={i} onClick={() => onSelect(area)}>
            {area}
          </Button>
        ))}
      </SelectAreaButtons>
      <Button onClick={() => onExit()}>exit</Button>
    </DialogBox>
  );
};

export default SelectArea;
