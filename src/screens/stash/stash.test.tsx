import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";

const setUpStash = () => {
  // roll player events wont get an event
  global.Math.random = () => 1;

  renderWithProviders(<App />);

  const container = screen.getByTestId("app-container");

  fireEvent.keyDown(container, { key: "Enter" });
  fireEvent.keyDown(container, { key: "n" });
  fireEvent.keyDown(container, { key: "n" });

  return container;
};

describe("Stash Screen", () => {
  test("player goes to main when selects not to visit stash", () => {
    const container = setUpStash();

    const expected = /What are you gonna do/i;

    fireEvent.keyDown(container, { key: "n" });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to stash when player selects to visit stash", () => {
    const container = setUpStash();

    const expected = /Which drug do you want to stash/i;

    fireEvent.keyDown(container, { key: "y" });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("player can exit stash screen and continue to main (buy, sell, jet) screen", () => {
    const container = setUpStash();

    const expected = /What are you gonna do/i;

    fireEvent.keyDown(container, { key: "y" });
    fireEvent.keyDown(container, { key: "x" });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("player can return to stash to stash more drugs", () => {
    const container = setUpStash();

    const expected = /Which drug do you want to stash/i;

    fireEvent.keyDown(container, { key: "y" });
    fireEvent.keyDown(container, { key: "c" });
    fireEvent.submit(screen.getByRole("textbox"));
    fireEvent.submit(screen.getByRole("textbox"));

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
