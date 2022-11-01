import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload.user;
			state.token = payload.token;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
