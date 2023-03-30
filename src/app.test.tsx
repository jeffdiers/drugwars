import { render, screen } from "@testing-library/react";
import App from "./app.component";

test("renders title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Drug Wars/i);
  expect(linkElement).toBeInTheDocument();
});
