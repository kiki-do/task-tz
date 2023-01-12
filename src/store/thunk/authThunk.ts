import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const typiCode = "https://my-json-server.typicode.com/kiki-do/loginapi/auth";

export const fetchAuth = createAsyncThunk("todo/fetchAuth", async () => {
	const responce = await axios.get(typiCode);
	return responce.data;
});
