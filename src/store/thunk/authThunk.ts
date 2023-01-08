import { AuthItems } from "./../authSlice/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuth = createAsyncThunk("todo/fetchAuth", async () => {
	const responce = await axios.get(
		"https://my-json-server.typicode.com/kiki-do/authapi/auth"
	);
	return responce.data;
});
