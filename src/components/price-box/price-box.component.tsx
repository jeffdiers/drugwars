import { useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import { Drugs } from "../../store/player/player.types";
import { selectPriceDrugs } from "../../store/price/price.selectors";

import DialogBox from "../dialog-box/dialog-box.component";

import { PriceItem, PriceItemDottedLine } from "./price-box.styles";

export default function PriceBox() {
  const priceDrugs = useAppSelector(selectPriceDrugs);

  return (
    <DialogBox>
      <div>Hey dude, the prices are:</div>
      <div>
        {Object.values(Drugs).map((drug, i) => (
          <PriceItem key={i}>
            <div>{drug}</div>
            <PriceItemDottedLine />
            <div>{moneyFormatter(priceDrugs[drug])}</div>
          </PriceItem>
        ))}
      </div>
    </DialogBox>
  );
}
