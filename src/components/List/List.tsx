import { useRef, useState } from "react";
import type { FC } from "react";
import { useEffect } from "react";

import { ListItem } from "../ListItem/ListItem";
import { useAppSelector } from "../../assets/hooks/useAppSelector";
import { itemsSelector, searchSelector } from "../../store/itemsSlice/selector";
import { IItems, ItemsType } from "../../store/itemsSlice/types";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";

import classes from "./List.module.scss";
import { fetchItems } from "../../store/thunk/itemsThunk";
import { openModal, removeUser, setSearch } from "../../store/itemsSlice/slice";
import { Edit } from "../Edit/Edit";
import { AddUser } from "../AddUser/AddUser";
import { Search } from "../Search/Search";
import { Skeleton } from "../../assets/components/Skeleton/Skeleton";

/*Компонент списка контактов */
export const List: FC = () => {
	const { items, status }: IItems = useAppSelector(itemsSelector);

	const search = useAppSelector(searchSelector);
	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	// Переиспользуемое состояние
	const [nameError, setNameError] = useState<string>("");
	const [surnameError, setSurnameError] = useState<string>("");
	const [hobbyError, setHobbyError] = useState<string>("");

	const [searchValue, setSearchValue] = useState<string>("");

	const searchHandle = (str: string) => {
		dispatch(setSearch(str));
	};

	useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(items);
			localStorage.setItem("items", json);
		}
		isMounted.current = true;
	}, [items]);

	useEffect(() => {
		return () => {
			dispatch(fetchItems());
		};
	}, [dispatch]);

	const removeHandle = (id: number) => {
		dispatch(removeUser(id));
	};

	const toggleIsOpen = (id: number) => dispatch(openModal(id));

	return (
		<div className={classes.wrapper}>
			<div>
				<h2 className={classes.title}>Список контактов</h2>
				<Search
					search={search}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					searchHandle={searchHandle}
				/>
			</div>
			<div className={classes.content}>
				{items.length === 0 ? (
					<div className={classes.empty}>К сожалению, у вас не друзей 😭</div>
				) : (
					items
						.filter(
							(item: ItemsType) =>
								item.fullname
									.toLowerCase()
									.includes(searchValue.toLowerCase()) ||
								item.hobby.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map(({ name, id, avatar, hobby, surname, isOpen }: ItemsType) => (
							<div key={id}>
								<ListItem
									id={id}
									name={name}
									avatar={avatar}
									hobby={hobby}
									surname={surname}
									removeHandle={removeHandle}
									toggleIsOpen={toggleIsOpen}
								/>

								<Edit
									id={id}
									name={name}
									surname={surname}
									hobby={hobby}
									isOpen={isOpen}
									toggleIsOpen={toggleIsOpen}
									nameError={nameError}
									surnameError={surnameError}
									hobbyError={hobbyError}
									setNameError={setNameError}
									setSurnameError={setSurnameError}
									setHobbyError={setHobbyError}
								/>
							</div>
						))
				)}
			</div>
			<AddUser
				nameError={nameError}
				surnameError={surnameError}
				hobbyError={hobbyError}
				setNameError={setNameError}
				setSurnameError={setSurnameError}
				setHobbyError={setHobbyError}
			/>
		</div>
	);
};
