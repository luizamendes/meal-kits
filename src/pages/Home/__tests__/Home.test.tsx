import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../Home";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

it("Renders Home", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();

  const scanButton = screen.getByText("Scan orders");
  scanButton.click();

  expect(mockHistoryPush).toHaveBeenCalledWith("/orders");
});
