import { HTMLAttributes } from "react";
import cx from "classnames";
import style from "./Stamp.module.scss";

export type TStampProps = {
    text: string;
    type?: "oos";
} & HTMLAttributes<HTMLSpanElement>;

export const Stamp = ({
    text,
    type,
    className = "",
    ...props
}: TStampProps) => {
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
