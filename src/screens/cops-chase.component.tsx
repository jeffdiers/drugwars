import { KeyboardEvent, useState } from "react";
import {
  selectPlayerHealth,
  selectCopsAmount,
  selectPlayerGuns,
  hitCop,
  hitPlayer,
  healPlayer,
  addPlayerEvent,
  selectMoney,
  depositPlayer,
} from "../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { randomInteger } from "../utils/helpers";

import Input from "../components/input.component";
import { GameStage, updateStage } from "../store/main/main.slice";

export default function CopsChase() {
  const dispatch = useAppDispatch();

  const [winByFight, setWinByFight] = useState(false);

  const money = useAppSelector(selectMoney);
  const health = useAppSelector(selectPlayerHealth);
  const cops = useAppSelector(selectCopsAmount) + 1;
  const guns = useAppSelector(selectPlayerGuns);

  const canFight = guns > 0;

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

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "r") run();
    if (event.key === "f" && canFight) fight();
  };

  const healPrice = randomInteger(1000, 3000);
  const foundMoney = randomInteger(4000, 6000);

  const isYesNo = (event: KeyboardEvent) => {
    return event.key === "y" || event.key === "n";
  };

  const handleOnKeyDown_endChase = (event: KeyboardEvent) => {
    if (isYesNo(event)) {
      if (event.key === "y") {
        const canHeal = healPrice < money;
        if (canHeal) {
          dispatch(healPlayer());
          dispatch(addPlayerEvent(`** You're back to full health! **`));
        } else {
          dispatch(addPlayerEvent("You don't have enough money to heal!"));
        }
        dispatch(updateStage(GameStage.MAIN));
      }
      if (event.key === "n") dispatch(updateStage(GameStage.MAIN));
      winByFight && dispatch(depositPlayer(foundMoney));
    }
  };

  return (
    <div>
      <div>Health: {health}</div>
      <div>Cops: {cops}</div>
      <div>Guns: {guns}</div>
      {cops <= 0 ? (
        <Input onKeyDown={handleOnKeyDown_endChase}>
          You got away!
          <br />
          {winByFight && `You found $${foundMoney} while getting away!`}
          <br />
          {`Do you want to heal for $${healPrice}?`}
          <br />
          {`Wallet: ${money}`}
        </Input>
      ) : (
        <Input onKeyDown={handleOnKeyDown}>
          {canFight ? `Will you run or fight?` : `Will you run?`}
        </Input>
      )}
    </div>
  );
}
