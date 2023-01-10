import type {
	ChangeEventHandler,
	FC,
	HTMLAttributes,
	MutableRefObject,
} from "react";

import classes from "./Input.module.scss";

export interface InputProps {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	placeholder?: string | undefined;
	className?: string | undefined;
}

export interface InputComponent extends FC<InputProps> {}

export const Input: InputComponent = ({
	value,
	onChange,
	placeholder,
	className,
}) => {
	return (
		<div className={className}>
			<input
				className={classes.wrapper}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};
