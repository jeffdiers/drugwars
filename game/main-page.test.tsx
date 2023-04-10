import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MainPage } from "../src/main-page";
import { DrugWars } from ".";

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
    fireEvent.keyDown(element, { key: "s", keyCode: 83 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player is in buy select amount the prompt is correct", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "How much would you like to buy? Max Allowed: ";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "b", keyCode: 66 });
    fireEvent.keyDown(element, { key: "l", keyCode: 76 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player is in buy select drug and letter isn't a drug show message", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Enter the first letter of a drug to choose!";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "b", keyCode: 66 });
    fireEvent.keyDown(element, { key: "p", keyCode: 80 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player is in sell select drug and letter isn't a drug show message", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Enter the first letter of a drug to choose!";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "s", keyCode: 83 });
    fireEvent.keyDown(element, { key: "p", keyCode: 80 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player is in buy and can't buy message is correct", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "You don't have enough money/coat space to buy that!";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "b", keyCode: 66 });
    fireEvent.keyDown(element, { key: "l", keyCode: 76 });
    fireEvent.keyDown(element, { key: "1", keyCode: 97 });
    fireEvent.keyDown(element, { key: "0", keyCode: 96 });
    fireEvent.keyDown(element, { key: "1", keyCode: 97 });
    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player is in sell and can't sell then message is correct", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "You don't have that many drugs!";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "s", keyCode: 83 });
    fireEvent.keyDown(element, { key: "l", keyCode: 76 });
    fireEvent.keyDown(element, { key: "1", keyCode: 97 });
    fireEvent.keyDown(element, { key: "0", keyCode: 96 });
    fireEvent.keyDown(element, { key: "1", keyCode: 97 });
    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player selects jet message is correct", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Where you gonna go?";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "j", keyCode: 74 });

    expect(element).toHaveTextContent(expected);
  });

  test("if player jet and wrong input display message", () => {
    const game = new DrugWars();
    render(<MainPage game={game} />);
    const element = screen.getByRole("button");
    const expected = "Choose a number between 1 and 6!";

    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(element, { key: "j", keyCode: 74 });
    fireEvent.keyDown(element, { key: "9", keyCode: 105 });

    expect(element).toHaveTextContent(expected);
  });
});
