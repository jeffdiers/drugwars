import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import { GameStage, updateStage } from "../../store/main/main.slice";
import { rollPlayerEvents } from "../../store/player/player.slice";
import { setPrices } from "../../store/price/price.slice";

describe("Main Screen", () => {
  describe("Buy Coat", () => {
    test("if player is asked to buy a coat they can select y", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateStage(GameStage.MAIN));
      global.Math.random = () => 0.3;
      store.dispatch(rollPlayerEvents());
      store.dispatch(setPrices());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        maxTrench: 115,
        money: 1820,
        events: ["** You bought more trench pockets for $180 **"],
        eventAction: undefined,
      };

      fireEvent.keyDown(screen.getByRole("button"), { key: "y", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);

      expect(
        screen.getByText(/You bought more trench pockets/i)
      ).toBeInTheDocument();
    });

    test("if player is asked to buy a coat they can select n", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateStage(GameStage.MAIN));
      global.Math.random = () => 0.3;
      store.dispatch(rollPlayerEvents());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        eventAction: undefined,
      };

      fireEvent.keyDown(screen.getByRole("button"), { key: "n", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(screen.getByText(/Are you going/i)).toBeInTheDocument();
    });
  });

  describe("Buy Gun", () => {
    test("if player is asked to buy a gun they can select y", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateStage(GameStage.MAIN));
      global.Math.random = () => 0.45;
      store.dispatch(rollPlayerEvents());
      store.dispatch(setPrices());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        money: 1710,
        events: ["** You bought a gun for $290 **"],
        guns: 1,
        eventAction: undefined,
      };

      fireEvent.keyDown(screen.getByRole("button"), { key: "y", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);

      expect(screen.getByText(/You bought a gun for/i)).toBeInTheDocument();
    });

    test("if player is asked to buy a coat they can select n", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateStage(GameStage.MAIN));
      global.Math.random = () => 0.45;
      store.dispatch(rollPlayerEvents());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        eventAction: undefined,
      };

      fireEvent.keyDown(screen.getByRole("button"), { key: "n", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(screen.getByText(/Are you going/i)).toBeInTheDocument();
    });
  });
});
