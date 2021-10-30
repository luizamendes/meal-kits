import { render, screen } from "@testing-library/react";
import { Item } from "../../../models/Item";
import { GeneralItemDisplay } from "../index";

describe("Testing ItemDisplay component", () => {
  const item: Item = {
    id: 123,
    name: "chocolate cake",
    category: "Recipe",
    volume: 10,
    deliveryWeek: "",
    displayName: "2P--123",
    station: "A8",
  };

  it("Renders content", () => {
    render(<GeneralItemDisplay item={item} />);

    expect(screen.getByText("Chocolate cake")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("Recipe")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
