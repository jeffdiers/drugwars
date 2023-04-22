import { FC } from "react";
import { Areas } from "../../store/player/player.types";
import { getAreaByKey } from "../../utils/helpers";

import ActionContainer from "./action-container.component";

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
      Where you gonna go?
    </ActionContainer>
  );
};

export default SelectArea;
