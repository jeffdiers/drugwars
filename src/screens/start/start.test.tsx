import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";

describe("Start Screen", () => {
  test("has correct text", () => {
    renderWithProviders(<App />);

    const expected = /New game/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

  test("render shark after new game", () => {
    renderWithProviders(<App />);
    const element = screen.getByTestId("app-container");

    const expected = /Would you like to visit the shark/i;

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
