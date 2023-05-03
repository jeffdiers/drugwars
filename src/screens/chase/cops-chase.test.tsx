import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import {
  buyGun,
  hitPlayer,
  updateActionEvent,
} from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";

describe("Cops Chase", () => {
  test("if player has no guns the prompt is Will you run?", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });

    const expected = "Will you run?";

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player has guns the prompt is will you fight", () => {
    const store = setupStore();
    store.dispatch(buyGun(0));
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });

    const expected = "Will you run or fight?";

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player runs and cops are gone display you got away", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    global.Math.random = () => 0.5;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "r",
      keyCode: 13,
    });

    const expected = /You got away/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player runs and health gets to 0 you got busted", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    store.dispatch(hitPlayer(97));
    global.Math.random = () => 0;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "r",
      keyCode: 13,
    });

    const expected = /Game over/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("player cannot press f to fight with no guns", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    global.Math.random = () => 0;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "f",
      keyCode: 13,
    });

    const expected = "Will you run?";

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player fights and cops are gone you got away", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    store.dispatch(buyGun(0));
    global.Math.random = () => 0;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "f",
      keyCode: 13,
    });

    const expected = /You got away/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player fights and health gets to 0 you got busted", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    store.dispatch(buyGun(0));
    store.dispatch(hitPlayer(94));
    global.Math.random = () => 0.5;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "f",
      keyCode: 13,
    });

    const expected = /Game over/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("if player wins fight they got away", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.CopsChase));
    store.dispatch(buyGun(0));
    global.Math.random = () => 0;
    renderWithProviders(<App />, { store });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "f",
      keyCode: 13,
    });

    const expected = /You got away/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
