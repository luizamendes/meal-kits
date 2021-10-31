import { HTMLAttributes } from "react";
import cx from "classnames";
import style from "./Stamp.module.css";

export interface StampProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  type?: "oos";
}

export const Stamp = ({ text, type, className = "", ...props }: StampProps) => {
  const classes = cx(style.stamp, {
    [style.oos]: type === "oos" || !type,
    [className]: !!className,
  });

  return (
    <span className={classes} {...props}>
      {text}
    </span>
  );
};
