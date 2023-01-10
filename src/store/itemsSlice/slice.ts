import type { IItems, ItemsType } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "../thunk/itemsThunk";
import { getCartFromLS } from "../../assets/components/getItemFromLS/getItemFromLS";

const initialState: IItems = {
	items: getCartFromLS(),
	status: "success",
	search: "",
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<ItemsType>) => {
			state.items.push(action.payload);
		},

		setItems: (state, action: PayloadAction<ItemsType[]>) => {
			state.items = action.payload;
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

	// extraReducers: builder => {
	// 	builder.addCase(fetchItems.pending, state => {
	// 		state.status = "loading";
	// 	});

	// 	builder.addCase(
	// 		fetchItems.fulfilled,
	// 		(state, action: PayloadAction<ItemsType[]>) => {
	// 			state.items = action.payload;
	// 			state.status = "success";
	// 		}
	// 	);
	// 	builder.addCase(fetchItems.rejected, state => {
	// 		state.items = [];
	// 		state.status = "error";
	// 	});
	// },
});

export const {
	addUser,
	removeUser,
	updateUser,
	openModal,
	setSearch,
	setItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;
