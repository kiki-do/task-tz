import { FC, useState } from "react";
import { useEffect } from "react";

import { ListItem } from "../ListItem/ListItem";
import { useAppSelector } from "../../assets/hooks/useAppSelector";
import { itemsSelector } from "../../store/itemsSlice/selector";
import { ItemsType } from "../../store/itemsSlice/types";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";

import classes from "./List.module.scss";
import { fetchItems } from "../../store/thunk/itemsThunk";
import { openModal, removeUser, setSearch } from "../../store/itemsSlice/slice";
import { Edit } from "../Edit/Edit";
import { AddUser } from "../AddUser/AddUser";
import { Search } from "../Search/Search";
import { Skeleton } from "../../assets/components/Skeleton/Skeleton";

export const List: FC = () => {
	const { items, search, status } = useAppSelector(itemsSelector);
	const dispatch = useAppDispatch();

	// Переиспользуемое состояние
	const [nameError, setNameError] = useState<string>("");
	const [surnameError, setSurnameError] = useState<string>("");
	const [hobbyError, setHobbyError] = useState<string>("");

	const [searchValue, setSearchValue] = useState<string>("");

	const searchHandle = (str: string) => {
		dispatch(setSearch(str));
	};

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
				{items && status === "loading"
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items
							.filter(
								(item: ItemsType) =>
									item.fullname.toLowerCase().includes(search.toLowerCase()) ||
									item.hobby.toLowerCase().includes(search.toLowerCase())
							)
							.map(
								({ name, id, avatar, hobby, surname, isOpen }: ItemsType) => (
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
								)
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
