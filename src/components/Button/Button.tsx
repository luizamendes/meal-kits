import { ButtonHTMLAttributes } from "react";
import cx from "classnames";
import style from "./Button.module.scss";

export type TButtonProps = {
  active?: boolean;
  secondary?: boolean;
  borderless?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = cx(style.main, {
    [className]: !!className,
  });

  return <button type="button" className={classes} {...props} />;
};
