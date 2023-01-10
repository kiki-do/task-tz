import type { FC } from "react";
import { Button } from "../../assets/components/Button/Button";
import classes from "./ListItem.module.scss";

export interface ListItemProps {
	id: number;
	name: string;
	surname: string;
	avatar: string;
	hobby: string;
	removeHandle: (id: number) => void;
	toggleIsOpen: (id: number) => void;
}

export interface ListItemComponent extends FC<ListItemProps> {}

export const ListItem: ListItemComponent = ({
	name,
	surname,
	avatar,
	hobby,
	id,
	removeHandle,
	toggleIsOpen,
}) => {
	const onRemove = () => {
		removeHandle(id);
	};

	const onToggle = () => {
		toggleIsOpen(id);
	};

	return (
		<div className={classes.wrapper}>
			<img src={avatar} alt="#" />
			<div>
				<h2 className={classes.name}>{name || "Не указано"}</h2>
				<h2 className={classes.surname}>{surname || "Не указано"}</h2>
			</div>
			<span className={classes.hobby}>{hobby || "Не указано"}</span>
			<div className={classes.buttons}>
				<Button className={classes.button} onClick={onToggle}>
					Edit
				</Button>

				<Button className={classes.button} onClick={onRemove}>
					Delete
				</Button>
			</div>
		</div>
	);
};
