import { FC } from "react";
import { Areas } from "../../../store/player/player.types";
import { getAreaByKey } from "../../../utils/helpers";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

import { SelectAreaButtons } from "./select-area.styles";

type SelectAreaProps = {
  onSelect: (key: Areas) => void;
};

const SelectArea: FC<SelectAreaProps> = ({ onSelect }) => {
  const handleOnKeyDown = (key: string) => {
    const areaKey = getAreaByKey(key);
    if (areaKey) onSelect(areaKey);
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      <DialogBox>
        <span>Where you gonna go?</span>
        <SelectAreaButtons>
          {Object.values(Areas).map((area, i) => (
            <Button key={i} onClick={() => onSelect(area)}>
              {area}
            </Button>
          ))}
        </SelectAreaButtons>
      </DialogBox>
    </ActionContainer>
  );
};

export default SelectArea;
