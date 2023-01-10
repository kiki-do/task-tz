import { useState, useEffect } from "react";
import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";

import classes from "./AddUser.module.scss";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";
import { addUser } from "../../store/itemsSlice/slice";
import { Button } from "../../assets/components/Button/Button";

export interface AddUserProps {
	nameError: string;
	setNameError: Dispatch<SetStateAction<string>>;
	surnameError: string;
	setSurnameError: Dispatch<SetStateAction<string>>;
	hobbyError: string;
	setHobbyError: Dispatch<SetStateAction<string>>;
}

export interface AddUserComponent extends FC<AddUserProps> {}

export const AddUser: AddUserComponent = ({
	nameError,
	setNameError,
	surnameError,
	setSurnameError,
	hobbyError,
	setHobbyError,
}) => {
	const dispatch = useAppDispatch();
	const [newName, setNewName] = useState<string>("");
	const [newSurname, setNewSurname] = useState<string>("");
	const [newHobby, setNewHobby] = useState<string>("");

	const [valid, setValid] = useState<boolean>(false);

	useEffect(() => {
		if (nameError || surnameError || hobbyError) setValid(false);
		else setValid(true);
	}, [nameError, surnameError, hobbyError]);

	const handleAddUser = async () => {
		if (
			(newName || newSurname || newHobby) &&
			nameError.length === 0 &&
			surnameError.length === 0 &&
			hobbyError.length === 0
		) {
			dispatch(
				addUser({
					id: Date.now(),
					name: newName,
					surname: newSurname,
					hobby: newHobby,
					isOpen: false,
					avatar:
						"https://raw.githubusercontent.com/kiki-do/authapi/4c2b43efc3dd298594c32a183456db73d485f59c/avatar.png",
					fullname: newName + " " + newSurname,
				})
			);

			setNewName("");
			setNewSurname("");
			setNewHobby("");
		}
	};

	/*Валидация каждого инпута через регулярные выражения */
	const nameValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setNewName(event.target.value);
		const regNameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regNameValidate.test(String(event.target.value).toLowerCase())) {
			setNameError("Неправильно ведено имя!");
		} else {
			setNameError("");
		}
	};

	const surnameValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setNewSurname(event.target.value);
		const regSurnameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regSurnameValidate.test(String(event.target.value).toLowerCase())) {
			setSurnameError("Неправильно ведена фамилия!");
		} else {
			setSurnameError("");
		}
	};

	const hobbyValidate = (event: ChangeEvent<HTMLInputElement>) => {
		setNewHobby(event.target.value);
		const regHobbyValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regHobbyValidate.test(String(event.target.value).toLowerCase())) {
			setHobbyError("Неправильно ведено хобби");
		} else {
			setHobbyError("");
		}
	};

	return (
		<div className={classes.wrapper}>
			<div>
				<h2 className={classes.title}>Добавьте друга</h2>
				<form className={classes.form}>
					<div className={classes.name}>
						<label htmlFor="">Имя: </label>
						{nameError && <div className={classes.validate}>{nameError}</div>}
						<input
							value={newName}
							onChange={nameValidate}
							type="text"
							required
							name="name"
							placeholder="Введите имя..."
						/>
					</div>
					<div className={classes.surname}>
						<label htmlFor="">Фамилия: </label>
						{surnameError && (
							<div className={classes.validate}>{surnameError}</div>
						)}
						<input
							value={newSurname}
							onChange={surnameValidate}
							type="text"
							required
							name="surname"
							placeholder="Введите фамилию..."
						/>
					</div>
					<div className={classes.hobby}>
						<label htmlFor="">Хобби: </label>
						{hobbyError && <div className={classes.validate}>{hobbyError}</div>}
						<input
							value={newHobby}
							onChange={hobbyValidate}
							type="text"
							required
							name="hobby"
							placeholder="Введите хобби..."
						/>
					</div>
					<Button size="long" disabled={!valid} onClick={handleAddUser}>
						Добавить контакт
					</Button>
				</form>
			</div>
		</div>
	);
};
