import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { logout } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);

	const handleLogout = () => {
		Cookies.remove("token");
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, cursor: "pointer" }}
						>
							LOGO
						</Typography>

						<Button
							sx={{ color: "white", textTransform: "none" }}
							component={NavLink}
							to="/"
							end
						>
							Home
						</Button>

						{isAuthenticated && (
							<Button
								sx={{ color: "white", textTransform: "none" }}
								onClick={handleLogout}
							>
								Logout
							</Button>
						)}

						{!isAuthenticated && (
							<>
								<Button
									sx={{ color: "white", textTransform: "none" }}
									component={NavLink}
									to="/login"
								>
									Login
								</Button>

								<Button
									sx={{ color: "white", textTransform: "none" }}
									component={NavLink}
									to="/register"
								>
									Register
								</Button>
							</>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Header;
