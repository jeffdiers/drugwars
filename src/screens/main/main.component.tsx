import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { GameStage, updateStage } from "../../store/main/main.slice";
import { removePriceEvent } from "../../store/price/price.slice";
import {
  selectPriceCoat,
  selectPriceGun,
  selectPriceHeal,
  selectPriceEvents,
} from "../../store/price/price.selectors";
import {
  upgradeCoat,
  buyGun,
  removePlayerEvent,
  removePlayerEventAction,
  healPlayer,
  addPlayerEvent,
} from "../../store/player/player.slice";
import { EventActions } from "../../store/player/player.types";
import {
  selectPlayerMoney,
  selectPlayerCoatSpace,
  selectPlayerEvents,
  selectPlayerEventAction,
  selectPlayerCops,
} from "../../store/player/player.selectors";

import YesNo from "../../components/action/yes-no.component";
import Continue from "../../components/action/continue.component";
import BuySellJet from "../../components/action/buy-sell-jet.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const playerEvents = useAppSelector(selectPlayerEvents);
  const playerEventAction = useAppSelector(selectPlayerEventAction);
  const playerCops = useAppSelector(selectPlayerCops);

  const priceGun = useAppSelector(selectPriceGun);
  const priceCoat = useAppSelector(selectPriceCoat);
  const priceHeal = useAppSelector(selectPriceHeal);
  const priceEvents = useAppSelector(selectPriceEvents);

  return (
    <>
      {playerEventAction === EventActions.CopsChase ? (
        <Continue
          text={`Officer Hardass and ${playerCops} of his deputies are chasing you !!!!!`}
          onContinue={() => dispatch(updateStage(GameStage.COPS_CHASE))}
        />
      ) : playerEventAction === EventActions.UpgradeCoat ? (
        <YesNo
          text={`Would you like to buy 15 more pockets for more drugs? It's $${priceCoat}`}
          onYes={() => {
            if (priceCoat <= playerMoney) {
              dispatch(upgradeCoat(priceCoat));
            } else {
              dispatch(
                addPlayerEvent("You don't have enough money to buy a coat!")
              );
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEventAction === EventActions.BuyGun ? (
        <YesNo
          text={`Would you like to buy a gun for $${priceGun}?`}
          onYes={() => {
            if (priceGun <= playerMoney && playerCoatSpace >= 5) {
              dispatch(buyGun(priceGun));
            } else {
              dispatch(
                addPlayerEvent(
                  "You don't have enough money/coat space to buy a gun!"
                )
              );
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEventAction === EventActions.AskHeal ? (
        <YesNo
          text={`Do you want to heal for $${priceHeal}?`}
          onYes={() => {
            if (priceHeal <= playerMoney) {
              dispatch(healPlayer(priceHeal));
            } else {
              dispatch(addPlayerEvent("You don't have enough money to heal!"));
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEvents.length ? (
        <Continue
          text={playerEvents[0]}
          onContinue={() => dispatch(removePlayerEvent())}
        />
      ) : priceEvents.length ? (
        <Continue
          text={priceEvents[0]}
          onContinue={() => dispatch(removePriceEvent())}
        />
      ) : (
        <BuySellJet
          onBuy={() => dispatch(updateStage(GameStage.BUY))}
          onSell={() => dispatch(updateStage(GameStage.SELL))}
          onJet={() => dispatch(updateStage(GameStage.JET))}
        />
      )}
    </>
  );
}
