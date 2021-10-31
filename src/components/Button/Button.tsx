import { ButtonHTMLAttributes } from "react";
import cx from "classnames";
import style from "./Button.module.css";

export const Button = ({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = cx(style.main, {
    [className]: !!className,
  });

  return <button type="button" className={classes} {...props} />;
};
