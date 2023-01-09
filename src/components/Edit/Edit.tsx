import { useCallback, useEffect, useMemo, useState } from "react";
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

	const [nameError, setNameError] = useState<string>("");
	const [surnameError, setSurnameError] = useState<string>("");
	const [hobbyError, setHobbyError] = useState<string>("");

	const editHandle = () => {
		let constName = editName;
		let constSurname = editSurname;
		let constHobby = editHobby;
		if (
			(editName || editSurname || editHobby) &&
			nameError.length === 0 &&
			surnameError.length === 0 &&
			hobbyError.length === 0
		) {
			/* Костыльный способ чтобы контакт измсенялся по элементно 
			(при изменении только одного элемента) другой оставался таким же, 
			а не изменялся на пустой локальный стейт */

			if (constName.length === 0) {
				constName = name;
				setEditName(name);
			}

			if (editSurname.length == 0) {
				constSurname = surname;
				setEditSurname(surname);
			}

			if (editHobby.length === 0) {
				constHobby = hobby;
				setEditHobby(hobby);
			}
			dispatch(
				updateUser({
					id,
					name: constName,
					surname: constSurname,
					hobby: constHobby,
					isOpen: false,
				})
			);
			setEditName("");
			setEditSurname("");
			setEditHobby("");
		} else if (
			nameError.length !== 0 &&
			surnameError.length !== 0 &&
			hobbyError.length !== 0
		) {
			setEditName(constName);
			setEditSurname(constSurname);
			setEditHobby(constHobby);
		}
	};

	const onToggle = () => {
		toggleIsOpen(id);
	};

	/*Валидация каждого инпута через регулярные выражения */
	const nameValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setEditName(event.target.value);
		const regNameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regNameValidate.test(String(event.target.value).toLowerCase())) {
			setNameError("Неправильно ведено имя!");
		} else {
			setNameError("");
		}
	};

	const surnameValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setEditSurname(event.target.value);
		const regSurnameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regSurnameValidate.test(String(event.target.value).toLowerCase())) {
			setSurnameError("Неправильно ведена фамилия!");
		} else {
			setSurnameError("");
		}
	};

	const hobbyValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setEditHobby(event.target.value);
		const regHobbyValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regHobbyValidate.test(String(event.target.value).toLowerCase())) {
			setHobbyError("Неправильно ведено хобби");
		} else {
			setHobbyError("");
		}
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
					<h2 className={classes.title}>Измените контакт</h2>
					<div className={classes.name}>
						<label>Имя</label>
						{nameError && <div className={classes.validate}>{nameError}</div>}
						<input
							value={editName}
							type="text"
							placeholder="Измените имя..."
							name="name"
							onChange={nameValidate}
						/>
					</div>
					<div className={classes.surname}>
						{surnameError && (
							<div className={classes.validate}>{surnameError}</div>
						)}
						<label>Фамилия</label>
						<input
							value={editSurname}
							type="text"
							name="suurname"
							placeholder="Измените фамилию..."
							onChange={surnameValidate}
						/>
					</div>
					<div className={classes.hobby}>
						<label>Хобби</label>
						{hobbyError && <div className={classes.validate}>{hobbyError}</div>}
						<input
							value={editHobby}
							type="text"
							name="hobby"
							placeholder="Измените хобби..."
							onChange={hobbyValidate}
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
