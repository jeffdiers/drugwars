import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import App from "./app.component";
import { setupStore } from "./store/store";
import { GameStage, updateStage } from "./store/main/main.slice";
import { Areas, changeArea } from "./store/player/player.slice";
import { hitPlayer } from "./store/player/player.slice";

describe("main component", () => {
  test("render with default state", () => {
    renderWithProviders(<App />);

    const expected = /Press ENTER to Play/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("render main page and not ask shark if not in bronx", () => {
    const store = setupStore();
    store.dispatch(updateStage(GameStage.MAIN));
    store.dispatch(changeArea(Areas.Brooklyn));

    renderWithProviders(<App />, { store });

    const expected = /Are you going to/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("render shark with Enter key press from start", () => {
    renderWithProviders(<App />);
    const element = screen.getByRole("input");

    const expected = /Would you like to visit the loan shark/i;

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("ask to visit bank when player selects not to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /Would you like to visit the bank/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("ask to visit stash when player selects not to visit bank", () => {
    renderWithProviders(<App />);

    const expected = /Would you like to stash any drugs/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to main when player selects not to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /Are you going to/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to shark when player selects to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /How much would you like to repay/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "y", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to bank when player selects to visit bank", () => {
    renderWithProviders(<App />);

    const expected = /How much would you like to deposit/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "y", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to stash when player selects to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /Which drug do you want to stash/i;

    fireEvent.keyDown(screen.getByRole("input"), { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "n", keyCode: 13 });
    fireEvent.keyDown(screen.getByRole("input"), { key: "y", keyCode: 13 });

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
      const action = updateStage(GameStage.MAIN);
      store.dispatch(changeArea(Areas.Brooklyn));

      store.dispatch(action);
      renderWithProviders(<App />, { store });
      const element = screen.getByRole("input");

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
        { input: "a", expected: /How much acid would you like to buy/i },
        { input: "w", expected: /How much weed would you like to buy/i },
        { input: "s", expected: /How much speed would you like to buy/i },
        { input: "l", expected: /How much ludes would you like to buy/i },
        { input: "p", expected: /Enter the first letter of a drug to choose/i },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const store = setupStore();
        const action = updateStage(GameStage.BUY);

        store.dispatch(action);
        renderWithProviders(<App />, { store });
        const element = screen.getByRole("input");

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
        { input: "a", expected: /How much acid would you like to sell/i },
        { input: "w", expected: /How much weed would you like to sell/i },
        { input: "s", expected: /How much speed would you like to sell/i },
        { input: "l", expected: /How much ludes would you like to sell/i },
        { input: "p", expected: /Enter the first letter of a drug to choose/i },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const store = setupStore();
        const action = updateStage(GameStage.SELL);

        store.dispatch(action);
        renderWithProviders(<App />, { store });
        const element = screen.getByRole("input");

        fireEvent.keyDown(element, { key: input, keyCode: 66 });

        const actual = screen.getByText(expected);

        expect(actual).toBeInTheDocument();
      });
    });
  });

  describe("jet stage", () => {
    describe("select drug", () => {
      test.each([
        { input: "1", expected: /area: bronx/i },
        { input: "2", expected: /area: ghetto/i },
      ])("input: $input, expected: $expected", ({ input, expected }) => {
        const store = setupStore();
        const action = updateStage(GameStage.JET);

        store.dispatch(action);
        renderWithProviders(<App />, { store });
        const element = screen.getByRole("input");

        fireEvent.keyDown(element, { key: input, keyCode: 66 });

        const actual = screen.getByText(expected);

        expect(actual).toBeInTheDocument();
      });
    });
  });

  test("if player health reaches 0 game over", () => {
    const store = setupStore();
    store.dispatch(updateStage(GameStage.MAIN));
    store.dispatch(hitPlayer(100));
    renderWithProviders(<App />, { store });

    const expected = /Game over/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
