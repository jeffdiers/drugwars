import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";

describe("Stash Screen", () => {
  test("player goes to main when selects not to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /What are you gonna do/i;

    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to stash when player selects to visit stash", () => {
    renderWithProviders(<App />);

    const expected = /Which drug do you want to stash/i;

    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "y",
      keyCode: 13,
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("player can exit stash screen and continue to main (buy, sell, jet) screen", () => {
    renderWithProviders(<App />);

    const expected = /What are you gonna do/i;

    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "y",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "x",
      keyCode: 13,
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
