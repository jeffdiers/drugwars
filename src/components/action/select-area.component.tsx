import { FC } from "react";
import { Areas } from "../../store/player/player.types";
import { getAreaByKey } from "../../utils/helpers";

import ActionContainer from "./action-container.component";
import Button from "../button.component";

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
      <ul>
        {Object.values(Areas).map((area, i) => (
          <li key={i}>
            <Button onClick={() => onSelect(area)}>{area}</Button>
          </li>
        ))}
      </ul>
    </ActionContainer>
  );
};

export default SelectArea;
