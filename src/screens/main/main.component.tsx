import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
import { removePriceEvent } from "../../store/price/price.slice";
import { selectPriceEvents } from "../../store/price/price.selectors";
import {
  removePlayerEvent,
  updateActionEvent,
} from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";
import { selectPlayerEvents } from "../../store/player/player.selectors";

import Continue from "../../components/action/continue/continue.component";
import BuySellJet from "../../components/action/buy-sell-jet/buy-sell-jet.component";
import PriceBox from "../../components/price-box/price-box.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const playerEvents = useAppSelector(selectPlayerEvents);
  const priceEvents = useAppSelector(selectPriceEvents);

  return (
    <>
      {playerEvents.length ? (
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
        <>
          <PriceBox />
          <BuySellJet
            onBuy={() => dispatch(updateActionEvent(ActionEvents.Buy))}
            onSell={() => dispatch(updateActionEvent(ActionEvents.Sell))}
            onJet={() => dispatch(updateActionEvent(ActionEvents.Jet))}
          />
        </>
      )}
    </>
  );
}
