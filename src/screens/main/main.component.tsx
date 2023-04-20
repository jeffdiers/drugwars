import { GameStage, updateStage } from "../../store/main/main.slice";
import {
  selectPriceEvents,
  removePriceEvent,
  selectPrices,
} from "../../store/price/price.slice";
import {
  upgradeCoat,
  buyGun,
  removePlayerEvent,
  removePlayerEventAction,
  selectPlayerEvents,
  selectPlayerEventAction,
  EventActions,
  healPlayer,
  selectMoney,
  addPlayerEvent,
  selectCanBuyGun,
  selectCops,
} from "../../store/player/player.slice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import InputYesNo from "../../components/input-yes-no.component";
import InputContinue from "../../components/input-continue.component";
import InputBuySellJet from "../../components/input-buy-sell-jet.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const priceEvents = useAppSelector(selectPriceEvents);
  const prices = useAppSelector(selectPrices);
  const money = useAppSelector(selectMoney);
  const cops = useAppSelector(selectCops);
  const canBuyGun = useAppSelector(selectCanBuyGun);
  const playerEvents = useAppSelector(selectPlayerEvents);
  const playerEventAction = useAppSelector(selectPlayerEventAction);

  return (
    <>
      {playerEventAction === EventActions.CopsChase ? (
        <InputContinue
          text={`Officer Hardass and ${cops} of his deputies are chasing you !!!!!`}
          onContinue={() => dispatch(updateStage(GameStage.COPS_CHASE))}
        />
      ) : playerEventAction === EventActions.UpgradeCoat ? (
        <InputYesNo
          text={`Would you like to buy 15 more pockets for more drugs? It's $${prices.coat}`}
          onYes={() => {
            if (prices.coat <= money) {
              dispatch(upgradeCoat(prices.coat));
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
        <InputYesNo
          text={`Would you like to buy a gun for $${prices.gun}?`}
          onYes={() => {
            if (canBuyGun) {
              dispatch(buyGun(prices.gun));
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
        <InputYesNo
          text={`Do you want to heal for $${prices.heal}?`}
          onYes={() => {
            if (prices.heal <= money) {
              dispatch(healPlayer(prices.heal));
            } else {
              dispatch(addPlayerEvent("You don't have enough money to heal!"));
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEvents.length ? (
        <InputContinue
          text={playerEvents[0]}
          onContinue={() => dispatch(removePlayerEvent())}
        />
      ) : priceEvents.length ? (
        <InputContinue
          text={priceEvents[0]}
          onContinue={() => dispatch(removePriceEvent())}
        />
      ) : (
        <InputBuySellJet
          onBuy={() => dispatch(updateStage(GameStage.BUY))}
          onSell={() => dispatch(updateStage(GameStage.SELL))}
          onJet={() => dispatch(updateStage(GameStage.JET))}
        />
      )}
    </>
  );
}
