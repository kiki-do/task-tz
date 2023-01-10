import { ReactNode, useMemo } from "react";
import type { FC, MouseEventHandler } from "react";

import classes from "./Button.module.scss";
import clsx from "clsx";

export const SIZES = {
	long: classes.long,
	short: classes.short,
} as const;

export interface ButtonProps {
	size?: keyof typeof SIZES;
	className?: string;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean | undefined;
	children?: ReactNode;
}

export interface ButtonComponent extends FC<ButtonProps> {}

export const Button: ButtonComponent = ({
	size = "short",
	className,
	onClick,
	children,
	disabled,
}) => {
	const wrapperClassName = useMemo(
		() => clsx(classes.wrapper, SIZES[size], {}, className),
		[className, size]
	);

	return (
		<button className={wrapperClassName} onClick={onClick} disabled={disabled}>
			<span className={classes.text}>{children}</span>
		</button>
	);
};
