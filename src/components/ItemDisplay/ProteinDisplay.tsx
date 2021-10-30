import { IProtein } from "../../models/Protein";
import { capitalizeFirstLetter } from "../../utils";

type TProteinDisplayProps = {
  protein: IProtein;
};

export const ProteinDisplay = ({ protein }: TProteinDisplayProps) => {
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
