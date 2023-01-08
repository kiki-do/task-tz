import { ItemsType } from "./../itemsSlice/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk<ItemsType[]>(
	"todo/fetchItems",
	async () => {
		const responce = await axios.get(
			"https://my-json-server.typicode.com/kiki-do/authapi/contacts"
		);
		return responce.data;
	}
);
