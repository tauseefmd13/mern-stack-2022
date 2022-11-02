import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useResetPasswordMutation } from "../app/services/authApi";
import ValidationError from "../components/ValidationError";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();
	const { id, token } = useParams();
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			password: data.get("password"),
			password_confirmation: data.get("password_confirmation"),
		};
		const res = await resetPassword({ data: form, id, token });
		if (res.data?.success) {
			document.getElementById("reset-password-form").reset();
			setSuccessMessage(`${res.data.message} Redirecting to Login Page...`);
			setErrorMessage(null);
			setErrors({});
			setTimeout(() => {
				navigate("/login");
			}, 3000);
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
					Reset Password
				</Typography>
				<Box
					component="form"
					id="reset-password-form"
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
							<ValidationError error={errors?.password_confirmation?.message} />
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{isLoading ? "Loading..." : "Reset Password"}
					</Button>
				</Box>
			</Box>
			<SuccessMessage message={successMessage} />
			<ErrorMessage message={errorMessage} />
		</Container>
	);
};

export default ResetPassword;
