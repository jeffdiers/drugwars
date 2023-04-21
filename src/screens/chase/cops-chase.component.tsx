import { useEffect, useState } from "react";
import {
  hitCop,
  hitPlayer,
  addPlayerEvent,
  depositPlayer,
  removePlayerEventAction,
  askHealPlayer,
} from "../../store/player/player.slice";
import {
  selectPlayerCops,
  selectPlayerHealth,
  selectPlayerGuns,
} from "../../store/player/player.selectors";
import { GameStage, updateStage } from "../../store/main/main.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { randomInteger } from "../../utils/helpers";

import RunFight from "../../components/action/run-fight.component";
import Continue from "../../components/action/continue.component";

export default function CopsChase() {
  const dispatch = useAppDispatch();

  const [gotAway, setGotaway] = useState(false);
  const [winByFight, setWinByFight] = useState(false);

  const playerCops = useAppSelector(selectPlayerCops);
  const playerHealth = useAppSelector(selectPlayerHealth);
  const playerGuns = useAppSelector(selectPlayerGuns);

  const run = () => {
    setWinByFight(false);
    const playerHit = 1 === randomInteger(1, 3);
    if (playerHit) {
      dispatch(hitPlayer(3));
    } else {
      dispatch(hitCop());
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
      dispatch(hitCop());
    } else {
      dispatch(hitPlayer(6));
    }
  };

  const handleGotAway = () => {
    if (winByFight) {
      const foundMoney = randomInteger(4000, 6000);
      dispatch(depositPlayer(foundMoney));
      dispatch(addPlayerEvent(`You found $${foundMoney} while getting away!`));
    }
    dispatch(removePlayerEventAction());
    dispatch(updateStage(GameStage.MAIN));
    dispatch(askHealPlayer());
  };

  useEffect(() => {
    if (playerCops <= 0) setGotaway(true);
  }, [playerCops]);

  return (
    <>
      {gotAway ? (
        <Continue text="You got away!" onContinue={handleGotAway} />
      ) : (
        <div>
          <div>Health: {playerHealth}</div>
          <div>Cops: {playerCops}</div>
          <div>Guns: {playerGuns}</div>
          <RunFight onFight={fight} onRun={run} canFight={playerGuns > 0} />
        </div>
      )}
    </>
  );
}
