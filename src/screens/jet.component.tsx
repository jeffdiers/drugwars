import { KeyboardEvent } from "react";
import { GameStage, updateStage } from "../store/main/main.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getAreaByKey } from "../utils/helpers";

import Input from "../components/input.component";
import { Areas, changeArea, selectArea } from "../store/player/player.slice";
import { setPrices } from "../store/price/price.slice";
import { addInterest } from "../store/shark/shark.slice";

export default function Jet() {
  const dispatch = useAppDispatch();

  const currentArea = useAppSelector(selectArea);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    const areaKey = getAreaByKey(event.key);
    if (areaKey && areaKey !== currentArea) {
      dispatch(changeArea(areaKey));
      dispatch(setPrices());
      dispatch(addInterest());
      dispatch(updateStage(GameStage.MAIN));
    }
  };

  return (
    <Input onKeyDown={handleOnKeyDown}>
      <>
        Where you gonna go?
        <ul>
          <li>1: {Areas.Bronx}</li>
          <li>2: {Areas.Ghetto}</li>
          <li>3: {Areas.CentralPark}</li>
          <li>4: {Areas.Manhattan}</li>
          <li>5: {Areas.ConeyIsland}</li>
          <li>6: {Areas.Brooklyn}</li>
        </ul>
      </>
    </Input>
  );
}
