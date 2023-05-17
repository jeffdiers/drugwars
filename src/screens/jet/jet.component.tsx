import {
  changeArea,
  rollPlayerEvents,
  updateActionEvent,
} from "../../store/player/player.slice";
import { Areas, ActionEvents } from "../../store/player/player.types";
import { selectPlayerArea } from "../../store/player/player.selectors";
import { setPrices, rollEvents } from "../../store/price/price.slice";
import { addInterestShark } from "../../store/shark/shark.slice";
import { addInterestBank } from "../../store/bank/bank.slice";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";

import SelectArea from "../../components/action/select-area/select-area.component";

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

  return (
    <SelectArea
      currentArea={playerArea}
      onSelect={handleOnSelect}
      onExit={() => dispatch(updateActionEvent(ActionEvents.Main))}
    />
  );
}
