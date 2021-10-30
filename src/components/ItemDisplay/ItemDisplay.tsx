import { HTMLAttributes, useEffect, useState } from "react";
import cx from "classnames";
import { IItem } from "../../models/Item";
import { Stamp } from "../Stamp";
import style from "./ItemDisplay.module.scss";

export type TItemDisplayProps = {
  item: IItem;
} & HTMLAttributes<HTMLDivElement>;

export const ItemDisplay = ({
  item,
  className = "",
  ...props
}: TItemDisplayProps) => {
  const { name, station, volume } = item;
  const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    if (item.volume <= 0) setOutOfStock(true);
  }, [item]);

  const classes = cx(style.item, {
    [className]: !!className,
  });

  return (
    <div className={classes} {...props}>
      <div className={style.station}>{station}</div>
      <p>{name}</p>
      <p>Quantity: {volume}</p>
      {outOfStock && <Stamp className={style.stamp} text="Out of stock" />}
    </div>
  );
};
