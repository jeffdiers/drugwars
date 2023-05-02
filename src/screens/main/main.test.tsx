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

describe("Main Screen", () => {
  describe("Buy Coat", () => {
    test("if player is asked to buy a coat they can select y", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateActionEvent(ActionEvents.Main));
      store.dispatch(changeArea(Areas.Queens));
      global.Math.random = () => 0.3;
      store.dispatch(rollPlayerEvents());
      store.dispatch(setPrices());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        maxTrench: 115,
        money: 1820,
        events: ["You bought more trench pockets for $180"],
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      };

      fireEvent.keyDown(screen.getByRole("dialog"), { key: "y", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);

      expect(
        screen.getByText(/You bought more trench pockets/i)
      ).toBeInTheDocument();
    });

    test("if player is asked to buy a coat they can select n", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateActionEvent(ActionEvents.Main));
      store.dispatch(changeArea(Areas.Queens));
      global.Math.random = () => 0.3;
      store.dispatch(rollPlayerEvents());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      };

      fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(screen.getByText(/What are you gonna do/i)).toBeInTheDocument();
    });
  });

  describe("Buy Gun", () => {
    test("if player is asked to buy a gun they can select y", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateActionEvent(ActionEvents.Main));
      store.dispatch(changeArea(Areas.Queens));
      global.Math.random = () => 0.45;
      store.dispatch(rollPlayerEvents());
      store.dispatch(setPrices());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        money: 1710,
        events: ["You bought a gun for $290!"],
        guns: 1,
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      };

      fireEvent.keyDown(screen.getByRole("dialog"), { key: "y", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);

      expect(screen.getByText(/You bought a gun for/i)).toBeInTheDocument();
    });

    test("if player is asked to buy a coat they can select n", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateActionEvent(ActionEvents.Main));
      store.dispatch(changeArea(Areas.Queens));
      global.Math.random = () => 0.45;
      store.dispatch(rollPlayerEvents());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        area: Areas.Queens,
        daysEnd: 29,
        actionEvent: ActionEvents.Main,
      };

      fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(screen.getByText(/What are you gonna do/i)).toBeInTheDocument();
    });

    test("if player is asked to buy a coat they can select n and area is bronx they go to shark", () => {
      const store = setupStore();
      const state = store.getState().player;
      store.dispatch(updateActionEvent(ActionEvents.Main));
      global.Math.random = () => 0.45;
      store.dispatch(rollPlayerEvents());
      renderWithProviders(<App />, { store });
      const expected = {
        ...state,
        actionEvent: ActionEvents.Shark,
      };

      fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

      const actual = store.getState().player;

      expect(actual).toEqual(expected);
      expect(
        screen.getByText(/Would you like to visit the loan shark/i)
      ).toBeInTheDocument();
    });
  });
});
