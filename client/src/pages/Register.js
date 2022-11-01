import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const form = {
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			email: data.get("email"),
			password: data.get("password"),
			password_confirmation: data.get("password_confirmation"),
		};
		console.log(form);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="first_name"
								required
								fullWidth
								id="first_name"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="last_name"
								label="Last Name"
								name="last_name"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password_confirmation"
								label="Confirm Password"
								type="password"
								id="password_confirmation"
								autoComplete="confirm-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<RouterLink to="/login">
								<Link component="span" variant="body2">
									Already have an account? Login
								</Link>
							</RouterLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
