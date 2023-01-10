import { useMemo, useState } from "react";
import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";

import classes from "./Edit.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";
import { updateUser } from "../../store/itemsSlice/slice";
import { Input } from "../../assets/components/Input/Input";
import { Button } from "../../assets/components/Button/Button";

export interface EditProps {
	isOpen: boolean;
	hobby: string;
	name: string;
	surname: string;
	toggleIsOpen: (id: number) => void;
	id: number;
	nameError: string;
	setNameError: Dispatch<SetStateAction<string>>;
	surnameError: string;
	setSurnameError: Dispatch<SetStateAction<string>>;
	hobbyError: string;
	setHobbyError: Dispatch<SetStateAction<string>>;
}

export interface formType {
	id: number;
	error: string;
	name: string;
	handle: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export interface EditComponent extends FC<EditProps> {}

export const Edit: EditComponent = ({
	isOpen = false,
	toggleIsOpen,
	id,
	name,
	surname,
	hobby,
	nameError,
	setNameError,
	surnameError,
	setSurnameError,
	hobbyError,
	setHobbyError,
}) => {
	const dispatch = useAppDispatch();

	const [editName, setEditName] = useState<string>("");
	const [editSurname, setEditSurname] = useState<string>("");
	const [editHobby, setEditHobby] = useState<string>("");

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
					fullname: constName + " " + constSurname,
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
		if (editName.length !== 1) {
			const regNameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
			if (!regNameValidate.test(event.target.value.toLowerCase())) {
				setNameError("Неправильно ведено имя!");
			} else {
				setNameError("");
			}
		} else {
			setNameError("");
		}
	};

	const surnameValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setEditSurname(event.target.value);
		if (editSurname.length !== 1) {
			const regSurnameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
			if (!regSurnameValidate.test(String(event.target.value).toLowerCase())) {
				setSurnameError("Неправильно ведена фамилия!");
			} else {
				setSurnameError("");
			}
		} else {
			setSurnameError("");
		}
	};

	const hobbyValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setEditHobby(event.target.value);
		if (editHobby.length !== 1) {
			const regHobbyValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
			if (!regHobbyValidate.test(String(event.target.value).toLowerCase())) {
				setHobbyError("Неправильно ведено хобби");
			} else {
				setHobbyError("");
			}
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

	const form = [
		{
			id: 1,
			error: nameError,
			value: editName,
			name: "Имя",
			handle: (event: ChangeEvent<HTMLInputElement>) => {
				nameValidate(event);
			},
		},
		{
			id: 2,
			error: surnameError,
			value: editSurname,
			name: "Фамилия",
			handle: (event: ChangeEvent<HTMLInputElement>) => {
				surnameValidate(event);
			},
		},
		{
			id: 3,
			error: hobbyError,
			value: editHobby,
			name: "Хобби",
			handle: (event: ChangeEvent<HTMLInputElement>) => {
				hobbyValidate(event);
			},
		},
	];

	return (
		<div className={wrapperClassName}>
			<div
				className={classes.content}
				onClick={event => event.stopPropagation()}
			>
				{/* <button className={classes.button} onClick={onToggle}>
					Закрыть
				</button> */}
				<Button className={classes.button} onClick={onToggle}>
					Закрыть
				</Button>

				<form className={classes.form}>
					<h2 className={classes.title}>Измените контакт</h2>
					{form.map(({ id, handle, name, error, value }: formType) => (
						<div key={id} className={classes.name}>
							<label>{name}</label>
							{error && <div className={classes.validate}>{error}</div>}
							<Input value={value} onChange={handle} placeholder={name} />
						</div>
					))}
				</form>
				{/* <button onClick={editHandle} className={classes.button}>
					Изменить
				</button> */}
				<Button className={classes.button} onClick={editHandle}>
					Изменить
				</Button>
			</div>
		</div>
	);
};
