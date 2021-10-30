import { HTMLAttributes } from "react";
import cx from "classnames";
import { Stamp } from "../Stamp";
import style from "./ItemDisplay.module.scss";

export type TItemDisplayProps = {
  children: JSX.Element;
  outOfStock?: boolean;
  station: string;
  type: "general" | "protein";
} & HTMLAttributes<HTMLDivElement>;

export const ItemDisplay = ({
  className = "",
  children,
  outOfStock,
  station,
  type,
  ...props
}: TItemDisplayProps) => {
  const classes = cx(style.item, {
    [className]: !!className,
    [style.fade]: outOfStock,
    [style.general]: type === "general",
    [style.protein]: type === "protein",
  });

  return (
    <div className={classes} {...props}>
      <div className={style.station}>{station}</div>
      {children}
      {outOfStock && <Stamp className={style.stamp} text="Out of stock" />}
    </div>
  );
};
