import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";

describe("Stash Screen", () => {
  test("player goes to main when selects not to visit stash", () => {
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
});
