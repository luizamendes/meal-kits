import { HTMLAttributes } from "react";
import cx from "classnames";
import { Stamp } from "../Stamp";
import style from "./ItemDisplay.module.scss";

export interface ItemDisplayProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  outOfStock?: boolean;
  station: string;
  type: "general" | "protein";
}

export const ItemDisplay = ({
  className = "",
  children,
  outOfStock = false,
  station,
  type,
  ...props
}: ItemDisplayProps) => {
  const classes = cx(style.item, {
    [className]: !!className,
    [style.fade]: outOfStock,
    [style.general]: type === "general",
    [style.protein]: type === "protein",
    [style["item--small"]]: type === "protein",
  });

  return (
    <div className={classes} {...props}>
      <div className={style.station}>{station}</div>
      {children}
      {outOfStock && <Stamp className={style.stamp} text="Out of stock" />}
    </div>
  );
};
