import { useState } from "react";
import type { FC, ChangeEvent } from "react";

import classes from "./AddUser.module.scss";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";
import { addUser } from "../../store/itemsSlice/slice";

export const AddUser: FC = () => {
	const dispatch = useAppDispatch();
	const [newName, setNewName] = useState<string>("");
	const [newSurname, setNewSurname] = useState<string>("");
	const [newHobby, setNewHobby] = useState<string>("");

	const handleAddUser = async () => {
		if (newName || newSurname || newHobby) {
			dispatch(
				addUser({
					id: Date.now(),
					name: newName,
					surname: newSurname,
					hobby: newHobby,
					isOpen: false,
					avatar:
						"https://raw.githubusercontent.com/kiki-do/authapi/4c2b43efc3dd298594c32a183456db73d485f59c/avatar.png",
				})
			);

			setNewName("");
			setNewSurname("");
			setNewHobby("");
		}
	};

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setNewName(event.target.value);
	};

	const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
		setNewSurname(event.target.value);
	};

	const onChangeHobby = (event: ChangeEvent<HTMLInputElement>) => {
		setNewHobby(event.target.value);
	};

	return (
		<div className={classes.wrapper}>
			<div>
				<h2 className={classes.title}>Добавьте друга</h2>
				<form className={classes.form}>
					<div className={classes.name}>
						<label htmlFor="">Имя: </label>

						<input
							value={newName}
							onChange={onChangeName}
							type="text"
							required
							name="name"
							placeholder="Введите имя..."
						/>
					</div>
					<div className={classes.surname}>
						<label htmlFor="">Фамилия: </label>
						<input
							value={newSurname}
							onChange={onChangeSurname}
							type="text"
							required
							name="surname"
							placeholder="Введите фамилию..."
						/>
					</div>
					<div className={classes.hobby}>
						<label htmlFor="">Хобби: </label>
						<input
							value={newHobby}
							onChange={onChangeHobby}
							type="text"
							required
							name="hobby"
							placeholder="Введите хобби..."
						/>
					</div>
					<button onClick={handleAddUser} className={classes.button}>
						Добавить контакт
					</button>
				</form>
			</div>
		</div>
	);
};
