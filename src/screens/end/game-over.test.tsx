import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import App from "../../app.component";
import { setupStore } from "../../store/store";
import { updateActionEvent } from "../../store/player/player.slice";
import { ActionEvents, Areas } from "../../store/player/player.types";
import { hitPlayer } from "../../store/player/player.slice";

describe("game over", () => {
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
