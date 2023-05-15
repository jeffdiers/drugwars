import { useEffect, useState } from "react";
import {
  hitPlayer,
  addPlayerEvent,
  depositPlayer,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerCops,
  selectPlayerHealth,
  selectPlayerGuns,
  selectPlayerArea,
} from "../../store/player/player.selectors";
import { ActionEvents, Areas } from "../../store/player/player.types";
import { selectFoundMoney } from "../../store/price/price.selectors";

import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter, randomInteger } from "../../utils/helpers";

import RunFight from "../../components/action/run-fight/run-fight.component";
import Continue from "../../components/action/continue/continue.component";

import { CopsChaseContainer } from "./cops-chase.styles";

export default function CopsChase() {
  const dispatch = useAppDispatch();

  const playerCops = useAppSelector(selectPlayerCops);
  const playerHealth = useAppSelector(selectPlayerHealth);
  const playerGuns = useAppSelector(selectPlayerGuns);
  const playerArea = useAppSelector(selectPlayerArea);
  const foundMoney = useAppSelector(selectFoundMoney);

  const [numberOfCops, setNumberOfCops] = useState(playerCops);
  const [startChase, setStartChase] = useState(true);
  const [gotAway, setGotaway] = useState(false);
  const [winByFight, setWinByFight] = useState(false);

  const run = () => {
    setWinByFight(false);
    const playerHit = 1 === randomInteger(1, 3);
    if (playerHit) {
      dispatch(hitPlayer(3));
    } else {
      setNumberOfCops(numberOfCops - 1);
    }
  };

  const rollsPerGun = () => {
    let rolls = playerGuns;
    while (rolls > 0) {
      if (1 === randomInteger(1, 6)) return true;
      rolls--;
    }
    return false;
  };

  const fight = () => {
    setWinByFight(true);
    const copHit = rollsPerGun();
    if (copHit) {
      setNumberOfCops(numberOfCops - 1);
    } else {
      dispatch(hitPlayer(6));
    }
  };

  const handleGotAway = () => {
    if (winByFight) {
      const money = foundMoney * playerCops;
      dispatch(depositPlayer(money));
      dispatch(
        addPlayerEvent(`You found ${moneyFormatter(money)} while getting away!`)
      );
    }
    playerHealth < 100
      ? dispatch(updateActionEvent(ActionEvents.Heal))
      : playerArea === Areas.Bronx
      ? dispatch(updateActionEvent(ActionEvents.Shark))
      : dispatch(updateActionEvent(ActionEvents.Main));
  };

  useEffect(() => {
    if (numberOfCops <= 0) setGotaway(true);
  }, [numberOfCops]);

  return (
    <CopsChaseContainer>
      {gotAway ? (
        <Continue text="You got away!" onContinue={handleGotAway} />
      ) : startChase ? (
        <Continue
          text={`Officer Hardass and ${playerCops} of his deputies are chasing you !!!!!`}
          onContinue={() => setStartChase(false)}
        />
      ) : (
        <div>
          <div>Health: {playerHealth}</div>
          <div>Cops: {numberOfCops}</div>
          <div>Guns: {playerGuns}</div>
          <RunFight onFight={fight} onRun={run} canFight={playerGuns > 0} />
        </div>
      )}
    </CopsChaseContainer>
  );
}
