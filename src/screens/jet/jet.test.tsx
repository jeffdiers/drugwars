import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents } from "../../store/player/player.types";

const setUpJet = (input: string) => {
  const store = setupStore();
  const action = updateActionEvent(ActionEvents.Jet);
  global.Math.random = () => 0.95;

  store.dispatch(action);
  renderWithProviders(<App />, { store });
  const element = screen.getByTestId("app-container");

  fireEvent.keyDown(element, { key: input, keyCode: 66 });
};

describe("jet stage", () => {
  test.each([
    { input: "2", expected: /queens/i },
    { input: "3", expected: /central park/i },
    { input: "4", expected: /manhattan/i },
    { input: "5", expected: /coney island/i },
    { input: "6", expected: /brooklyn/i },
    { input: "x", expected: /What are you gonna do/i },
  ])("input: $input, expected: $expected", ({ input, expected }) => {
    setUpJet(input);

    const actual = screen.getByText(expected);

    expect(actual).toBeInTheDocument();
  });
});
