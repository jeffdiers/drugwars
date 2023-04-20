import { useEffect, useState } from "react";
import {
  selectPlayerHealth,
  selectCopsAmount,
  selectPlayerGuns,
  hitCop,
  hitPlayer,
  addPlayerEvent,
  depositPlayer,
  removePlayerEventAction,
  askHealPlayer,
} from "../../store/player/player.slice";
import { GameStage, updateStage } from "../../store/main/main.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { randomInteger } from "../../utils/helpers";

import InputRunFight from "../../components/input-run-fight.component";
import InputContinue from "../../components/input-continue.component";

export default function CopsChase() {
  const dispatch = useAppDispatch();

  const [gotAway, setGotaway] = useState(false);
  const [winByFight, setWinByFight] = useState(false);

  const health = useAppSelector(selectPlayerHealth);
  const cops = useAppSelector(selectCopsAmount) + 1;
  const guns = useAppSelector(selectPlayerGuns);

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
    let rolls = guns;
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
    if (cops <= 0) setGotaway(true);
  }, [cops]);

  return (
    <>
      {gotAway ? (
        <InputContinue text="You got away!" onContinue={handleGotAway} />
      ) : (
        <div>
          <div>Health: {health}</div>
          <div>Cops: {cops}</div>
          <div>Guns: {guns}</div>
          <InputRunFight onFight={fight} onRun={run} canFight={guns > 0} />
        </div>
      )}
    </>
  );
}
