import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import App from "./app.component";
import { setupStore } from "./store/store";
import { changeArea, updateActionEvent } from "./store/player/player.slice";
import { ActionEvents, Areas } from "./store/player/player.types";
import { hitPlayer } from "./store/player/player.slice";

describe("main component", () => {
  test("render with default state", () => {
    renderWithProviders(<App />);

    const expected = /New game/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("render main page and not ask shark if not in bronx", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.Main));
    store.dispatch(changeArea(Areas.Brooklyn));

    renderWithProviders(<App />, { store });

    const expected = /What are you gonna do/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("render shark with Enter key press from start", () => {
    renderWithProviders(<App />);
    const element = screen.getByRole("dialog");

    const expected = /Would you like to visit the loan shark/i;

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("ask to visit bank when player selects not to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /Would you like to visit the bank/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("ask to visit stash when player selects not to visit bank", () => {
    renderWithProviders(<App />);

    const expected = /Would you like to stash any drugs/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to main when player selects not to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /What are you gonna do/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to shark when player selects to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /How much would you like to repay/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "y", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to bank when player selects to visit bank", () => {
    renderWithProviders(<App />);

    const expected = /How much would you like to deposit/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "y", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to stash when player selects to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /Which drug do you want to stash/i;

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "y", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  describe("main stage", () => {
    test.each([
      { input: "b", expected: /What would you like to buy/i },
      { input: "s", expected: /What would you like to sell/i },
      { input: "j", expected: /Where you gonna go/i },
    ])("input: $input, expected: $expected", ({ input, expected }) => {
      const store = setupStore();
      const action = updateActionEvent(ActionEvents.Main);
      store.dispatch(changeArea(Areas.Brooklyn));

      store.dispatch(action);
      renderWithProviders(<App />, { store });
      const element = screen.getByRole("dialog");

      fireEvent.keyDown(element, { key: input, keyCode: 66 });

      const actual = screen.getByText(expected);

      expect(actual).toBeInTheDocument();
    });
  });

  describe("buy stage", () => {
    describe("select drug", () => {
      test.each([
        { input: "c", expected: /How much cocaine would you like to buy/i },
        { input: "h", expected: /How much heroin would you like to buy/i },
        { input: "m", expected: /How much molly would you like to buy/i },
        { input: "l", expected: /How much lsd would you like to buy/i },
        { input: "s", expected: /How much shrooms would you like to buy/i },
        { input: "w", expected: /How much weed would you like to buy/i },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const store = setupStore();
        const action = updateActionEvent(ActionEvents.Buy);

        store.dispatch(action);
        renderWithProviders(<App />, { store });
        const element = screen.getByRole("dialog");

        fireEvent.keyDown(element, { key: input, keyCode: 66 });

        const actual = screen.getByText(expected);

        expect(actual).toBeInTheDocument();
      });
    });
  });

  describe("sell stage", () => {
    describe("select drug", () => {
      test.each([
        { input: "c", expected: /How much cocaine would you like to sell/i },
        { input: "h", expected: /How much heroin would you like to sell/i },
        { input: "m", expected: /How much molly would you like to sell/i },
        { input: "l", expected: /How much lsd would you like to sell/i },
        { input: "s", expected: /How much shrooms would you like to sell/i },
        { input: "w", expected: /How much weed would you like to sell/i },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const store = setupStore();
        const action = updateActionEvent(ActionEvents.Sell);

        store.dispatch(action);
        renderWithProviders(<App />, { store });
        const element = screen.getByRole("dialog");

        fireEvent.keyDown(element, { key: input, keyCode: 66 });

        const actual = screen.getByText(expected);

        expect(actual).toBeInTheDocument();
      });
    });
  });

  describe("jet stage", () => {
    describe("select area", () => {
      test.each([{ input: "2", expected: /queens/i }])(
        "input: $input, expected: $expected",
        ({ input, expected }) => {
          const store = setupStore();
          const action = updateActionEvent(ActionEvents.Jet);

          store.dispatch(action);
          renderWithProviders(<App />, { store });
          const element = screen.getByRole("dialog");

          fireEvent.keyDown(element, { key: input, keyCode: 66 });

          const actual = screen.getByText(expected);

          expect(actual).toBeInTheDocument();
        }
      );
    });
  });

  test("if player health reaches 0 game over", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.Main));
    store.dispatch(hitPlayer(100));
    renderWithProviders(<App />, { store });

    const expected = /Game over/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});