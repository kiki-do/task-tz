import { fetchAuth } from "./../thunk/authThunk";
import { AuthItems, IAuth } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuth = {
	auths: { login: "", password: "" },
	status: "loading",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(fetchAuth.pending, state => {
			state.status = "loading";
			state.auths = { login: "", password: "" };
		});

		builder.addCase(
			fetchAuth.fulfilled,
			(state, action: PayloadAction<AuthItems>) => {
				state.auths = action.payload;
				state.status = "success";
			}
		);

		builder.addCase(fetchAuth.rejected, state => {
			state.status = "error";
			state.auths = { login: "", password: "" };
		});
	},
});

export default authSlice.reducer;
