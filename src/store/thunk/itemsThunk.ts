import { ItemsType } from "./../itemsSlice/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mockAPI = "https://63b8b9ad6f4d5660c6dd8d43.mockapi.io/task";
const typiCode = "https://my-json-server.typicode.com/kiki-do/authapi/db";

export const fetchItems = createAsyncThunk<ItemsType[]>(
	"todo/fetchItems",
	async () => {
		const responce = await axios.get(typiCode);
		return responce.data;
	}
);
