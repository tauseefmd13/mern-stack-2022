import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CheckAuth from "../utils/CheckAuth";
import Guest from "../utils/Guest";

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
				path: "/change-password",
				element: (
					<CheckAuth>
						<div>Change Password</div>
					</CheckAuth>
				),
			},
		],
	},
]);

export default router;
