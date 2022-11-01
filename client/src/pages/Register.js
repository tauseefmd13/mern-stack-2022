import React, { useState } from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../services/authApi";
import { setUser } from "../features/auth/authSlice";
import ValidationError from "../components/ValidationError";
import ErrorMessage from "../components/ErrorMessage";
import Cookies from "js-cookie";

const Register = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			email: data.get("email"),
			password: data.get("password"),
			password_confirmation: data.get("password_confirmation"),
		};
		const res = await register(form);
		if (res.data?.success) {
			Cookies.set("token", res.data.data.token);
			dispatch(setUser(res.data.data));
			navigate("/");
		} else {
			setErrorMessage(res.error.data?.message);
			setErrors(res.error.data?.errors);
		}
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
							<ValidationError error={errors?.first_name?.message} />
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
							<ValidationError error={errors?.last_name?.message} />
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
							<ValidationError error={errors?.email?.message} />
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
							<ValidationError error={errors?.password?.message} />
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
							<ValidationError error={errors?.password_confirmation?.message} />
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{isLoading ? "Loading..." : "Register"}
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
			<ErrorMessage message={errorMessage} />
		</Container>
	);
};

export default Register;
