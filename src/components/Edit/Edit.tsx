import { useEffect, useMemo, useState } from "react";
import type { FC, ChangeEvent } from "react";

import classes from "./Edit.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";
import { updateUser } from "../../store/itemsSlice/slice";

export interface EditProps {
	isOpen: boolean;
	hobby: string;
	name: string;
	surname: string;
	toggleIsOpen: (id: number) => void;
	id: number;
}

export interface EditComponent extends FC<EditProps> {}

export const Edit: EditComponent = ({
	isOpen = false,
	toggleIsOpen,
	id,
	name,
	surname,
	hobby,
}) => {
	const dispatch = useAppDispatch();

	const [editName, setEditName] = useState<string>("");
	const [editSurname, setEditSurname] = useState<string>("");
	const [editHobby, setEditHobby] = useState<string>("");

	const [nameError, setNameError] = useState<string>(
		"Фамилия не должна содержать цифры и символы! Убедитесь что введенное вами фамилия введена верно"
	);
	const [surnameError, setSurnameError] = useState<string>(
		"Фамилия не должна содержать цифры и символы! Убедитесь что введенное вами фамилия введена верно"
	);
	const [hobbyError, setHobbyError] = useState<string>(
		"Сообщение должно быть обязатлено заполнено"
	);

	const editHandle = () => {
		if (editName || editSurname || editHobby) {
			if (editName == "") {
				setEditName(name);
				console.log(editName);
			}

			if (editSurname.length === 0) {
				setEditSurname(surname);
			}

			if (editHobby.length === 0) {
				setEditHobby(hobby);
			}
			dispatch(
				updateUser({
					id,
					name: editName,
					surname: editSurname,
					hobby: editHobby,
					isOpen: false,
				})
			);
		} else if (
			editName.length === 0 ||
			editSurname.length === 0 ||
			editHobby.length === 0
		) {
		}
	};

	// useEffect(() => {
	// 	if (editName.length === 0) {
	// 		setEditName(name);
	// 	} else if (editSurname.length === 0) {
	// 		setEditSurname(surname);
	// 	} else if (editHobby.length === 0) {
	// 		setEditHobby(hobby);
	// 	}
	// }, [editName, editSurname, editHobby]);

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setEditName(event.target.value);
	};

	const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
		setEditSurname(event.target.value);
	};

	const onChangeHobby = (event: ChangeEvent<HTMLInputElement>) => {
		setEditHobby(event.target.value);
	};

	const onToggle = () => {
		toggleIsOpen(id);
	};

	const wrapperClassName = useMemo(
		() =>
			clsx(classes.wrapper, {
				[classes.isOpen]: isOpen,
			}),
		[isOpen]
	);

	return (
		<div className={wrapperClassName}>
			<div
				className={classes.content}
				onClick={event => event.stopPropagation()}
			>
				<button className={classes.button} onClick={onToggle}>
					Закрыть
				</button>

				<form className={classes.form}>
					<div className={classes.name}>
						<label>Имя</label>
						<input
							value={editName}
							type="text"
							placeholder="Измените имя..."
							name="name"
							onChange={onChangeName}
						/>
					</div>
					<div className={classes.surname}>
						<label>Фамилия</label>
						<input
							value={editSurname}
							type="text"
							name="suurname"
							placeholder="Измените фамилию..."
							onChange={onChangeSurname}
						/>
					</div>
					<div className={classes.hobby}>
						<label>Хобби</label>
						<input
							value={editHobby}
							type="text"
							name="hobby"
							placeholder="Измените хобби..."
							onChange={onChangeHobby}
						/>
					</div>
				</form>
				<button onClick={editHandle} className={classes.button}>
					Изменить
				</button>
			</div>
		</div>
	);
};
