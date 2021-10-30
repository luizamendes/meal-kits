import { Item } from "../../models/Item";
import { capitalizeFirstLetter } from "../../utils/String";

interface TGeneralItemDisplayProps {
  item: Item;
}

export const GeneralItemDisplay = ({ item }: TGeneralItemDisplayProps) => {
  const { id, name, category, volume } = item;

  return (
    <>
      <p>
        <span>Id:</span> {id}
      </p>
      <p>
        <span>Name:</span>
        {capitalizeFirstLetter(name)}
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