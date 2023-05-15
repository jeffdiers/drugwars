import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";

describe("sell stage", () => {
  test.each([
    { input: "c", expected: /How much cocaine would you like to sell/i },
    { input: "a", expected: /How much adderall would you like to sell/i },
    { input: "m", expected: /How much molly would you like to sell/i },
    { input: "l", expected: /How much lsd would you like to sell/i },
    { input: "s", expected: /How much shrooms would you like to sell/i },
    { input: "w", expected: /How much weed would you like to sell/i },
  ])("input: $input, expected: $expected", ({ input, expected }) => {
    const store = setupStore();
    const action = updateActionEvent(ActionEvents.Sell);

    store.dispatch(action);
    renderWithProviders(<App />, { store });
    const element = screen.getByTestId("app-container");

    fireEvent.keyDown(element, { key: input, keyCode: 66 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
