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
import { useLoginMutation } from "../services/authApi";
import { setUser } from "../features/auth/authSlice";
import ValidationError from "../components/ValidationError";
import ErrorMessage from "../components/ErrorMessage";
import Cookies from "js-cookie";

const Login = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			email: data.get("email"),
			password: data.get("password"),
		};
		const res = await login(form);
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
					Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<ValidationError error={errors?.email?.message} />

						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<ValidationError error={errors?.password?.message} />

						<Grid container justifyContent="flex-end">
							<Grid item>
								<RouterLink to="/forgot-password">
									<Link component="span" variant="body2">
										Forgot password?
									</Link>
								</RouterLink>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{isLoading ? "Loading..." : "Login"}
						</Button>
					</Grid>
					<Grid container justifyContent="center">
						<Grid item>
							<RouterLink to="/register">
								<Link component="span" variant="body2">
									Don't have an account? Register
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

export default Login;
