import { ButtonHTMLAttributes } from "react";

export type TButtonProps = {
  active?: boolean;
  secondary?: boolean;
  borderless?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button type="button" {...props} />;
};
