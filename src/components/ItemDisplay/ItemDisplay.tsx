import { HTMLAttributes, useEffect, useState } from "react";
import cx from "classnames";
import { IItem } from "../../models/Item";
import { Stamp } from "../Stamp";
import { capitalizeFirstLetter } from "../../utils";
import style from "./ItemDisplay.module.scss";
import { IProtein } from "../../models/Protein";

export type TItemDisplayProps = {
  // item: IItem;
  // protein?: IProtein;
  children: JSX.Element;
  outOfStock?: boolean;
  station: string;
} & HTMLAttributes<HTMLDivElement>;

export const ItemDisplay = ({
  // item,
  className = "",
  children,
  outOfStock,
  station,
  ...props
}: TItemDisplayProps) => {
  // const { id, name, station, volume, category } = item;
  // const [outOfStock, setOutOfStock] = useState(false);

  // useEffect(() => {
  //   if (item.volume <= 0) setOutOfStock(true);
  // }, [item]);

  const classes = cx(style.item, {
    [className]: !!className,
    [style.fade]: outOfStock,
  });

  return (
    <div className={classes} {...props}>
      <div className={style.station}>{station}</div>
      {/* <p>
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
      </p> */}
      {children}
      {outOfStock && <Stamp className={style.stamp} text="Out of stock" />}
    </div>
  );
};
