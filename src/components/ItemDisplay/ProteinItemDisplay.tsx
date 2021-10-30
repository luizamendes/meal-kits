import { Protein } from "../../models/Protein";
import { capitalizeFirstLetter } from "../../utils/String";

interface ProteinItemDisplayProps {
  protein: Protein;
}

export const ProteinItemDisplay = ({ protein }: ProteinItemDisplayProps) => {
  const { name, code } = protein;

  return (
    <>
      <p>
        <span>Protein name:</span>
        {capitalizeFirstLetter(name)}
      </p>
      <p>
        <span>Protein code:</span>
        {code}
      </p>
    </>
  );
};
