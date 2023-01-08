import type { FC } from "react";
import { useEffect } from "react";

import { ListItem } from "../ListItem/ListItem";
import { useAppSelector } from "../../assets/hooks/useAppSelector";
import { itemsSelector } from "../../store/itemsSlice/selector";
import { ItemsType } from "../../store/itemsSlice/types";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";

import classes from "./List.module.scss";
import { fetchItems } from "../../store/thunk/itemsThunk";

export const List = () => {
	const items = useAppSelector(itemsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			dispatch(fetchItems());
		};
	}, [dispatch]);

	return (
		<div className={classes.wrapper}>
			{items.map(({ name, id, avatar, hobby, surname }: ItemsType) => (
				<ListItem
					key={id}
					name={name}
					avatar={avatar}
					hobby={hobby}
					surname={surname}
				/>
			))}
		</div>
	);
};
