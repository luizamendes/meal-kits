import { HTMLAttributes } from "react";
import cx from "classnames";
import style from "./Stamp.module.scss";

export type StampProps = {
  text: string;
  type?: "oos";
} & HTMLAttributes<HTMLSpanElement>;

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
