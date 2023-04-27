import { changeArea, rollPlayerEvents } from "../../store/player/player.slice";
import { Areas } from "../../store/player/player.types";
import { selectPlayerArea } from "../../store/player/player.selectors";
import { setPrices, rollEvents } from "../../store/price/price.slice";
import { addInterestShark } from "../../store/shark/shark.slice";
import { addInterestBank } from "../../store/bank/bank.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import SelectArea from "../../components/action/select-area.component";

export default function Jet() {
  const dispatch = useAppDispatch();

  const playerArea = useAppSelector(selectPlayerArea);

  const handleOnSelect = (areaKey: Areas) => {
    if (areaKey !== playerArea) {
      dispatch(changeArea(areaKey));
      dispatch(setPrices());
      dispatch(rollEvents());
      dispatch(rollPlayerEvents());
      dispatch(addInterestShark());
      dispatch(addInterestBank());
    }
  };

  return <SelectArea onSelect={handleOnSelect} />;
}
