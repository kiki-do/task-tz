import type { IItems, ItemsType } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "../thunk/itemsThunk";

const initialState: IItems = {
	items: [],
	status: "loading",
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {},

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

export default itemsSlice.reducer;
