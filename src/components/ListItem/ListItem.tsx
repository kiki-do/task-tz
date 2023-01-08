import type { FC } from "react";
import classes from "./ListItem.module.scss";

export interface ListItemProps {
	name: string;
	surname: string;
	avatar: string;
	hobby: string;
}

export interface ListItemComponent extends FC<ListItemProps> {}

export const ListItem: ListItemComponent = ({
	name,
	surname,
	avatar,
	hobby,
}) => {
	return (
		<div className={classes.wrapper}>
			<img src={avatar} alt="#" />
			<div>
				<h2 className={classes.name}>{name}</h2>
				<h2 className={classes.surname}>{surname}</h2>
			</div>
			<span className={classes.hobby}>{hobby}</span>
		</div>
	);
};
