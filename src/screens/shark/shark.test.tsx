import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";

describe("Start Screen", () => {
  test("player goes to bank if selects not to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /Would you like to visit the bank/i;

    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "n",
      keyCode: 13,
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("go to shark when player selects to visit shark", () => {
    renderWithProviders(<App />);

    const expected = /How much would you like to repay/i;

    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "Enter",
      keyCode: 13,
    });
    fireEvent.keyDown(screen.getByTestId("app-container"), {
      key: "y",
      keyCode: 13,
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
