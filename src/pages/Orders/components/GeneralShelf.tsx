import { GeneralItemDisplay, ItemDisplay } from "../../../components";
import { Item } from "../../../models/Item";
import style from "../Orders.module.css";

interface GeneralShelfProps {
  items: Item[];
}

export const GeneralShelf = ({ items }: GeneralShelfProps) => {
  return (
    <>
      <h3>General</h3>
      <div className={`${style.grid} ${style.grid__general}`}>
        {items.map((item) => {
          if (item.id === 130) item.station = "B4";

          return (
            <ItemDisplay
              className={style[`grid-${item.station}`]}
              key={item.id}
              station={item.station}
              type="general"
              outOfStock={item.volume <= 0}
            >
              <GeneralItemDisplay item={item} />
            </ItemDisplay>
          );
        })}
      </div>
    </>
  );
};
