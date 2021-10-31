import { Protein } from "../../models/Protein";
import { capitalizeFirstLetter } from "../../utils/String";
import style from "./ItemDisplay.module.scss";

interface ProteinItemDisplayProps {
  protein: Protein;
}

export const ProteinItemDisplay = ({ protein }: ProteinItemDisplayProps) => {
  const { name, code } = protein;

  return (
    <>
      <p className={style.item__title}>{capitalizeFirstLetter(name)}</p>
      <p>
        <span>Protein code:</span>
        {code}
      </p>
    </>
  );
};
