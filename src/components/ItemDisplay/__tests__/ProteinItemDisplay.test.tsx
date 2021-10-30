import { render, screen } from "@testing-library/react";
import { Protein } from "../../../models/Protein";
import { ProteinItemDisplay } from "../index";

describe("Testing ItemDisplay component", () => {
  const protein: Protein = {
    code: "S",
    name: "Soy",
    station: "C5",
  };

  it("Renders content", () => {
    render(<ProteinItemDisplay protein={protein} />);

    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("Soy")).toBeInTheDocument();
  });
});
