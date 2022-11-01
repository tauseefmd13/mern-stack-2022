import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "./NavLink";

const Header = () => {
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
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Header;
