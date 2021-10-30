import { ItemDisplay, ProteinItemDisplay } from "../../../components";
import { Protein } from "../../../models/Protein";
import style from "../Orders.module.scss";

interface ProteinShelfProps {
  proteins: Protein[];
}

export const ProteinShelf = ({ proteins }: ProteinShelfProps) => {
  return (
    <>
      <h3>Proteins</h3>
      <div className={`${style.grid} ${style.grid__meats}`}>
        {proteins.map((protein) => (
          <ItemDisplay
            className={style[`grid-${protein.station}`]}
            key={protein.code}
            station={protein.station}
            type="protein"
          >
            <ProteinItemDisplay protein={protein} />
          </ItemDisplay>
        ))}
      </div>
    </>
  );
};
