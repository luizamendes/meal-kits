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

  const scanned = await screen.findByText("Scanned orders");
  const order1 = await screen.findByText("Order #1");
  expect(scanned).toBeInTheDocument();
  expect(order1).toBeInTheDocument();

  const nextButton = screen.getByText(/Next order/i);
  nextButton.click();

  const order2 = await screen.findByText("Order #2");
  expect(order2).toBeInTheDocument();
});
