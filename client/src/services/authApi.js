import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (user) => {
				return {
					url: "auth/register",
					method: "POST",
					body: user,
					headers: {
						"Content-type": "application/json",
					},
				};
			},
		}),
		login: builder.mutation({
			query: (user) => {
				return {
					url: "auth/login",
					method: "POST",
					body: user,
					headers: {
						"Content-type": "application/json",
					},
				};
			},
		}),
		forgotPassword: builder.mutation({
			query: (user) => {
				return {
					url: "auth/forgot-password",
					method: "POST",
					body: user,
					headers: {
						"Content-type": "application/json",
					},
				};
			},
		}),
		resetPassword: builder.mutation({
			query: ({ data, id, token }) => {
				return {
					url: `auth/reset-password/${id}/${token}`,
					method: "POST",
					body: data,
					headers: {
						"Content-type": "application/json",
					},
				};
			},
		}),
		getUser: builder.query({
			query: (token) => {
				return {
					url: "users/me",
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				};
			},
		}),
		changePassword: builder.mutation({
			query: ({ data, token }) => {
				return {
					url: "users/change-password",
					method: "POST",
					body: data,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useGetUserQuery,
	useChangePasswordMutation,
} = authApi;
