import { screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import App from "./app.component";
import { setupStore } from "./store/store";
import { updateActionEvent } from "./store/player/player.slice";
import { ActionEvents } from "./store/player/player.types";

const setUpApp = (action: ActionEvents) => {
  const store = setupStore();
  store.dispatch(updateActionEvent(action));
  renderWithProviders(<App />, { store });
};

describe("app", () => {
  describe("render game stats on correct screens", () => {
    test.each([
      { input: ActionEvents.Start },
      { input: ActionEvents.CopsChase },
      { input: ActionEvents.GameOver },
    ])("input: $input", ({ input }) => {
      setUpApp(input);

      const expected = /trench coat/i;

      const actual = screen.queryByText(expected);

      expect(actual).not.toBeInTheDocument();
    });

    test.each([
      { input: ActionEvents.Main },
      { input: ActionEvents.Bank },
      { input: ActionEvents.Buy },
      { input: ActionEvents.BuyCoat },
      { input: ActionEvents.BuyGun },
      { input: ActionEvents.Heal },
      { input: ActionEvents.Jet },
      { input: ActionEvents.Sell },
      { input: ActionEvents.Shark },
      { input: ActionEvents.Stash },
    ])("input: $input", ({ input }) => {
      setUpApp(input);

      const expected = /trench coat/i;

      const actual = screen.queryByText(expected);

      expect(actual).toBeInTheDocument();
    });
  });
});
