import { GameStage, updateStage } from "../../store/main/main.slice";
import {
  Areas,
  changeArea,
  rollPlayerEvents,
} from "../../store/player/player.slice";
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
      areaKey === Areas.Bronx
        ? dispatch(updateStage(GameStage.SHARK))
        : dispatch(updateStage(GameStage.MAIN));
      dispatch(setPrices());
      dispatch(rollEvents());
      dispatch(rollPlayerEvents());
      dispatch(addInterestShark());
      dispatch(addInterestBank());
    }
  };

  return (
    <>
      <SelectArea onSelect={handleOnSelect} />
      <ul>
        <li>1: {Areas.Bronx}</li>
        <li>2: {Areas.Ghetto}</li>
        <li>3: {Areas.CentralPark}</li>
        <li>4: {Areas.Manhattan}</li>
        <li>5: {Areas.ConeyIsland}</li>
        <li>6: {Areas.Brooklyn}</li>
      </ul>
    </>
  );
}
