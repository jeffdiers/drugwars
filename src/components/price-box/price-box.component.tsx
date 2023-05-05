import type { ComponentType, FC } from "react";
import { useAppSelector } from "../../utils/redux-hooks";
import { moneyFormatter } from "../../utils/helpers";

import { Drugs } from "../../store/player/player.types";
import { selectPriceDrugs } from "../../store/price/price.selectors";
import { priceRanges } from "../../store/price/price.types";

import DialogBox from "../dialog-box/dialog-box.component";

import { PriceItem, PriceItemDottedLine } from "./price-box.styles";

export type PriceBoxProps = {
  priceRange?: boolean;
  withDialog?: boolean;
};

const PriceBox: FC<PriceBoxProps> = ({
  priceRange = false,
  withDialog = true,
}) => {
  const priceDrugs = useAppSelector(selectPriceDrugs);

  const withDialogBox = (Component: ComponentType) => (
    <DialogBox>
      <div>Hey dude, the prices are:</div>
      <Component />
    </DialogBox>
  );

  const PriceList = () => (
    <div>
      {Object.values(Drugs).map((drug, i) => (
        <PriceItem key={i}>
          <div>{drug}</div>
          <PriceItemDottedLine />
          {priceRange ? (
            <div>{`${moneyFormatter(priceRanges[drug][0])} - ${moneyFormatter(
              priceRanges[drug][1]
            )}`}</div>
          ) : (
            <div>{moneyFormatter(priceDrugs[drug])}</div>
          )}
        </PriceItem>
      ))}
    </div>
  );

  return withDialog ? <>{withDialogBox(PriceList)}</> : <PriceList />;
};

export default PriceBox;
