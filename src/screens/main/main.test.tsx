import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import { updateActionEvent, changeArea } from "../../store/player/player.slice";
import { ActionEvents, Areas } from "../../store/player/player.types";

describe("Main Screen", () => {
  test("render main page and not ask shark if not in bronx", () => {
    const store = setupStore();
    store.dispatch(updateActionEvent(ActionEvents.Main));
    store.dispatch(changeArea(Areas.Brooklyn));

    renderWithProviders(<App />, { store });

    const expected = /What are you gonna do/i;

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });

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
    const element = screen.getByTestId("app-container");

    fireEvent.keyDown(element, { key: input, keyCode: 66 });

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
