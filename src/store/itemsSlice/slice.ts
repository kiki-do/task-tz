import type { IItems, ItemsType } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "../thunk/itemsThunk";

const initialState: IItems = {
	items: [],
	status: "loading",
	search: "",
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<ItemsType>) => {
			state.items.push(action.payload);
		},

		removeUser: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(item: ItemsType) => item.id !== action.payload
			);
		},

		updateUser: (
			state,
			action: PayloadAction<
				Pick<
					ItemsType,
					"id" | "name" | "hobby" | "isOpen" | "surname" | "fullname"
				>
			>
		) => {
			state.items.map((item: ItemsType) => {
				if (item.id === action.payload.id) {
					item.name = action.payload.name;
					item.surname = action.payload.surname;
					item.hobby = action.payload.hobby;
					item.fullname = action.payload.fullname;
					item.isOpen = !item.isOpen;
				}
			});
		},

		openModal: (state, action: PayloadAction<number>) => {
			const index = state.items.find(
				(item: ItemsType) => item.id === action.payload
			);
			if (index) {
				index.isOpen = !index.isOpen;
			}
		},

		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchItems.pending, state => {
			state.status = "loading";
			state.items = [];
		});

		builder.addCase(
			fetchItems.fulfilled,
			(state, action: PayloadAction<ItemsType[]>) => {
				state.status = "success";
				state.items = action.payload;
			}
		);
		builder.addCase(fetchItems.rejected, state => {
			state.status = "error";
			state.items = [];
		});
	},
});

export const { addUser, removeUser, updateUser, openModal, setSearch } =
	itemsSlice.actions;

export default itemsSlice.reducer;
