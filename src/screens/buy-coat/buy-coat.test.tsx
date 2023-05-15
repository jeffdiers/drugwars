import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import {
  rollPlayerEvents,
  updateActionEvent,
  changeArea,
} from "../../store/player/player.slice";
import { setPrices } from "../../store/price/price.slice";
import { ActionEvents, Areas } from "../../store/player/player.types";

const setUpBuyCoat = (inputArea: Areas) => {
  const store = setupStore();
  const state = store.getState().player;
  store.dispatch(updateActionEvent(ActionEvents.Main));
  store.dispatch(changeArea(inputArea));
  global.Math.random = () => 0.3;
  store.dispatch(rollPlayerEvents());
  store.dispatch(setPrices());
  renderWithProviders(<App />, { store });
  return { store, state };
};

describe("Buy Coat Screen", () => {
  test.each([
    {
      inputKey: "n",
      inputArea: Areas.Queens,
      expectedText: /What are you gonna do/i,
      expectedState: {
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      },
    },
    {
      inputKey: "y",
      inputArea: Areas.Queens,
      expectedText: /You bought more trench pockets/i,
      expectedState: {
        maxTrench: 115,
        money: 1820,
        events: ["You bought more trench pockets for $180"],
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      },
    },
    {
      inputKey: "n",
      inputArea: Areas.Bronx,
      expectedText: /Would you like to visit the shark/i,
      expectedState: {
        area: Areas.Bronx,
        daysEnd: 29,
        actionEvent: ActionEvents.Shark,
      },
    },
  ])(
    "inputKey: $inputKey, expectedText: $expected",
    ({ inputKey, inputArea, expectedText, expectedState }) => {
      const { store, state } = setUpBuyCoat(inputArea);

      const expected = {
        ...state,
        ...expectedState,
      };

      fireEvent.keyDown(screen.getByTestId("app-container"), {
        key: inputKey,
        keyCode: 13,
      });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    }
  );
});
