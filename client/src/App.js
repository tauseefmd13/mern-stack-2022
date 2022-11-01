import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "./services/authApi";
import { setUser } from "./features/auth/authSlice";
import Cookies from "js-cookie";

function App() {
	const token = Cookies.get("token");
	const { data, isSuccess } = useGetUserQuery(token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data && isSuccess) {
			dispatch(setUser({ user: data.data, token: token }));
		}
	}, [data, isSuccess, dispatch, token]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
