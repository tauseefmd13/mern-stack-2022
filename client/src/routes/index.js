import {
	Box,
	createTheme,
	CssBaseline,
	Stack,
	ThemeProvider,
} from "@mui/material";
import { createBrowserRouter, Outlet } from "react-router-dom";
import CheckAuth from "../utils/CheckAuth";
import Guest from "../utils/Guest";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "../pages/auth/Profile";
import ChangePassword from "../pages/auth/ChangePassword";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import { useState } from "react";

const AppLayout = () => {
	const [mode, setMode] = useState("light");

	const darkTheme = createTheme({
		palette: {
			mode: mode,
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<Box bgcolor={"background.default"} color={"text.primary"}>
				<CssBaseline />
				<Header />
				<Stack direction="row" spacing={2} justifyContent="space-between">
					<Sidebar setMode={setMode} mode={mode} />
					<Outlet />
					<Rightbar />
				</Stack>
			</Box>
		</ThemeProvider>
	);
};

const GuestLayout = () => {
	return (
		<>
			<CssBaseline />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

const router = createBrowserRouter([
	{
		element: (
			<CheckAuth>
				<AppLayout />
			</CheckAuth>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/change-password",
				element: <ChangePassword />,
			},
		],
	},
	{
		element: (
			<Guest>
				<GuestLayout />
			</Guest>
		),
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "/reset-password/:id/:token",
				element: <ResetPassword />,
			},
		],
	},
]);

export default router;
