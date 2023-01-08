import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice/slice";
import authReducer from "./authSlice/slice";

export const store = configureStore({
	reducer: {
		items: itemsReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
