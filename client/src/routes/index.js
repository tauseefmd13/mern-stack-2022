import { createBrowserRouter } from "react-router-dom";
import CheckAuth from "../utils/CheckAuth";
import Guest from "../utils/Guest";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "../pages/auth/Profile";
import ChangePassword from "../pages/auth/ChangePassword";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<Guest>
						<Login />
					</Guest>
				),
			},
			{
				path: "/register",
				element: (
					<Guest>
						<Register />
					</Guest>
				),
			},
			{
				path: "/forgot-password",
				element: (
					<Guest>
						<ForgotPassword />
					</Guest>
				),
			},
			{
				path: "/reset-password/:id/:token",
				element: (
					<Guest>
						<ResetPassword />
					</Guest>
				),
			},
			{
				path: "/profile",
				element: (
					<CheckAuth>
						<Profile />
					</CheckAuth>
				),
			},
			{
				path: "/change-password",
				element: (
					<CheckAuth>
						<ChangePassword />
					</CheckAuth>
				),
			},
		],
	},
]);

export default router;
