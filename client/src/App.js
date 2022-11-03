import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "./app/services/authApi";
import { setUser } from "./features/auth/authSlice";
import router from "./routes/index.js";
import Cookies from "js-cookie";

function App() {
	const token = Cookies.get("token");
	const { data, isLoading, isSuccess } = useGetUserQuery(token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data && isSuccess) {
			dispatch(setUser({ user: data.data, token: token }));
		}
	}, [data, token, isSuccess, dispatch]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
