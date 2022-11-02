import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { logout } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		setAnchorElNav(null);
		setAnchorElUser(null);

		Cookies.remove("token");
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
						<Typography
							variant="h6"
							component={NavLink}
							to="/"
							sx={{
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none !important",
							}}
						>
							LOGO
						</Typography>

						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<Button
								sx={{ color: "white", textTransform: "none" }}
								component={NavLink}
								to="/"
								end
							>
								Home
							</Button>

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

							{isAuthenticated && (
								<>
									<IconButton
										size="large"
										aria-label="Open user menu"
										aria-controls="user-menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenUserMenu}
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
									<Menu
										sx={{ mt: "45px" }}
										id="user-menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem
											onClick={handleCloseUserMenu}
											component={NavLink}
											to="/profile"
										>
											My Profile
										</MenuItem>
										<MenuItem
											onClick={handleCloseUserMenu}
											component={NavLink}
											to="/change-password"
										>
											Change Password
										</MenuItem>
										<MenuItem onClick={(handleCloseUserMenu, handleLogout)}>
											Logout
										</MenuItem>
									</Menu>
								</>
							)}
						</Box>

						{/* Responsive Menu */}
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="Open menu"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{isAuthenticated && (
									<div>
										<MenuItem
											onClick={handleCloseNavMenu}
											component={NavLink}
											to="/profile"
										>
											My Profile
										</MenuItem>
										<MenuItem
											onClick={handleCloseNavMenu}
											component={NavLink}
											to="/change-password"
										>
											Change Password
										</MenuItem>
										<MenuItem onClick={(handleCloseNavMenu, handleLogout)}>
											Logout
										</MenuItem>
									</div>
								)}

								{!isAuthenticated && (
									<div>
										<MenuItem
											onClick={handleCloseNavMenu}
											component={NavLink}
											to="/login"
										>
											Login
										</MenuItem>
										<MenuItem
											onClick={handleCloseNavMenu}
											component={NavLink}
											to="/register"
										>
											Register
										</MenuItem>
									</div>
								)}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Header;
