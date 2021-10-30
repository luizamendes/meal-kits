import { render, screen } from "@testing-library/react";
import { ItemDisplay, ItemDisplayProps } from "../index";

describe("Testing ItemDisplay component", () => {
  const props: ItemDisplayProps = {
    station: "A9",
    type: "general",
    children: <p>This is a test</p>,
  };

  it("Renders content", () => {
    render(<ItemDisplay {...props} />);

    expect(screen.getByText("This is a test")).toBeInTheDocument();
    expect(screen.getByText("A9")).toBeInTheDocument();
    expect(screen.queryByText("Out of stock")).not.toBeInTheDocument();
  });

  it("Renders out of stock message", () => {
    render(<ItemDisplay {...props} outOfStock />);

    expect(screen.queryByText("Out of stock")).toBeInTheDocument();
  });
});
