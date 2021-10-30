import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders welcome greeting", () => {
  render(<App />);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
