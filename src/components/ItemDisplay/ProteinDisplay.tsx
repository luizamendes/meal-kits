import { Protein } from "../../models/Protein";
import { capitalizeFirstLetter } from "../../utils/String";

type ProteinDisplayProps = {
  protein: Protein;
};

export const ProteinDisplay = ({ protein }: ProteinDisplayProps) => {
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
