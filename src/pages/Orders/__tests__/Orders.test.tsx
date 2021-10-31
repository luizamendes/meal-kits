import { render, screen, act, waitFor } from "@testing-library/react";
import axios from "axios";
// import { getItems } from "../../../api";
import { Orders } from "../Orders";

// jest.mock("axios", () => {
//   return {
//     create: jest.fn(() => axios),
//     post: jest.fn(() => Promise.resolve()),
//   };
// });
// jest.mock("axios", () => {
//   return {
//     create: () => {
//       return {
//         interceptors: {
//           request: { eject: jest.fn(), use: jest.fn() },
//           response: { eject: jest.fn(), use: jest.fn() },
//         },
//       };
//     },
//   };
// });

it("Renders Orders correctly", async () => {
  act(() => {
    render(<Orders />);
  });

  expect(screen.getByTestId("loading")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText("Scanned orders")).toBeInTheDocument();
    expect(screen.getByText("Order #1")).toBeInTheDocument();
  });

  const nextButton = screen.getByText(/Next order/i);
  nextButton.click();

  await waitFor(() => {
    expect(screen.getByText("Order #2")).toBeInTheDocument();
  });
});
