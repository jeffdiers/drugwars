import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";
import { DrugWars } from "./game";

describe("Main Page", () => {
  test("renders 'press enter to start''", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
  });

  test("renders 'new game' on press enter", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Are you going to (B)uy, (S)ell, or (J)et?";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    expect(element).toHaveTextContent(expected);
  });

  test("if in buy phase and player press B prompt is what to buy", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "What would you like to buy?";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "b", keyCode: 66 });

    expect(element).toHaveTextContent(expected);
  });

  test("if not in buy phase and player press B prompt doenst change", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Press ENTER to Play or Ctrl+C to Quit";

    fireEvent.keyDown(element, { key: "b", keyCode: 66 });

    expect(element).toHaveTextContent(expected);
  });

  test("if in main phase and player press S prompt is what to sell", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "What would you like to sell?";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "s", keyCode: 66 });

    expect(element).toHaveTextContent(expected);
  });
});
