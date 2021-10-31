import { Item } from "../../models/Item";
import { capitalizeFirstLetter } from "../../utils/String";
import style from "./ItemDisplay.module.css";

interface TGeneralItemDisplayProps {
  item: Item;
}

export const GeneralItemDisplay = ({ item }: TGeneralItemDisplayProps) => {
  const { id, name, category, volume } = item;

  return (
    <>
      <p className={style.item__title}>{capitalizeFirstLetter(name)}</p>
      <p>
        <span>Id:</span> {id}
      </p>
      <p>
        <span>Category:</span>
        {capitalizeFirstLetter(category)}
      </p>
      <p>
        <span>Quantity:</span>
        {volume}
      </p>
    </>
  );
};
