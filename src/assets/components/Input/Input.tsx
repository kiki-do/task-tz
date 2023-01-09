import type { ChangeEventHandler, FC } from "react";

import classes from "./Input.module.scss";

export interface InputProps {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	placeholder: string;
}

export interface InputComponent extends FC<InputProps> {}

export const Input: InputComponent = ({ value, onChange, placeholder }) => {
	return (
		<input
			className={classes.wrapper}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};
