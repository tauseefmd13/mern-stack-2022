import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import {
	Avatar,
	Box,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useChangePasswordMutation } from "../../app/services/authApi";
import ValidationError from "../../components/ValidationError";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage";
import Cookies from "js-cookie";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = Cookies.get("token");
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			password: data.get("password"),
			password_confirmation: data.get("password_confirmation"),
		};
		const res = await changePassword({ data: form, token });
		if (res.data?.success) {
			document.getElementById("change-password-form").reset();
			setSuccessMessage(`${res.data.message} Redirecting to Login Page...`);
			setErrorMessage(null);
			setErrors({});

			setTimeout(() => {
				Cookies.remove("token");
				dispatch(logout());
				navigate("/login");
			}, 3000);
		} else {
			setErrorMessage(res.error.data?.message);
			setErrors(res.error.data?.errors);
		}
	};

	return (
		<Box flex={4} p={{ xs: 0, md: 2 }}>
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
						Change Password
					</Typography>
					<Box
						component="form"
						id="change-password-form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="New Password"
									type="password"
									id="password"
									autoComplete="new-password"
									autoFocus
								/>
								<ValidationError error={errors?.password?.message} />
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password_confirmation"
									label="Confirm New Password"
									type="password"
									id="password_confirmation"
									autoComplete="confirm-password"
								/>
								<ValidationError
									error={errors?.password_confirmation?.message}
								/>
							</Grid>
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={isLoading}
						>
							Change Password
						</LoadingButton>
					</Box>
				</Box>
				<SuccessMessage message={successMessage} />
				<ErrorMessage message={errorMessage} />
			</Container>
		</Box>
	);
};

export default ChangePassword;
