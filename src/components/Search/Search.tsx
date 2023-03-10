import { useRef, useCallback } from "react";
import type { FC, SetStateAction, Dispatch } from "react";
import debounce from "debounce";

import classes from "./Search.module.scss";
import { Input } from "../../assets/components/Input/Input";

export interface SearchProps {
	search: string;
	searchValue: string;
	setSearchValue: Dispatch<SetStateAction<string>>;
	searchHandle: (str: string) => void;
}

export interface SearchComponent extends FC<SearchProps> {}

export const Search: SearchComponent = ({
	searchValue,
	setSearchValue,
	searchHandle,
}) => {
	const searchDebounce = useCallback(
		debounce((str: string) => {
			searchHandle(str);
		}, 250),
		[]
	);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		searchDebounce(e.target.value);
	};

	return (
		<Input
			className={classes.wrapper}
			value={searchValue}
			placeholder="Поиск..."
			onChange={onChange}
		/>
	);
};
