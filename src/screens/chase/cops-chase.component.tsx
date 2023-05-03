import { useEffect, useState } from "react";
import {
  hitCop,
  hitPlayer,
  addPlayerEvent,
  depositPlayer,
  updateActionEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerCops,
  selectPlayerHealth,
  selectPlayerGuns,
} from "../../store/player/player.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter, randomInteger } from "../../utils/helpers";

import RunFight from "../../components/action/run-fight/run-fight.component";
import Continue from "../../components/action/continue/continue.component";
import { ActionEvents } from "../../store/player/player.types";

import { CopsChaseContainer } from "./cops-chase.styles";

export default function CopsChase() {
  const dispatch = useAppDispatch();

  const [startChase, setStartChase] = useState(true);
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
      dispatch(
        addPlayerEvent(
          `You found ${moneyFormatter(foundMoney)} while getting away!`
        )
      );
    }
    dispatch(updateActionEvent(ActionEvents.Heal));
  };

  useEffect(() => {
    if (playerCops <= 0) setGotaway(true);
  }, [playerCops]);

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
          <div>Cops: {playerCops}</div>
          <div>Guns: {playerGuns}</div>
          <RunFight onFight={fight} onRun={run} canFight={playerGuns > 0} />
        </div>
      )}
    </CopsChaseContainer>
  );
}
