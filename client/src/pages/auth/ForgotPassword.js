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
import { useForgotPasswordMutation } from "../../app/services/authApi";
import ValidationError from "../../components/ValidationError";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage";

const ForgotPassword = () => {
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [errors, setErrors] = useState({});

	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const form = {
			email: data.get("email"),
		};
		const res = await forgotPassword(form);
		if (res.data?.success) {
			document.getElementById("forgot-password-form").reset();
			setSuccessMessage(res.data.message);
			setErrorMessage(null);
			setErrors({});
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
					Forgot Password
				</Typography>
				<Box
					component="form"
					id="forgot-password-form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<ValidationError error={errors?.email?.message} />
						</Grid>
						<Grid item xs={12}>
							<LoadingButton
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 1, mb: 2 }}
								loading={isLoading}
							>
								Email Password Reset Link
							</LoadingButton>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<SuccessMessage message={successMessage} />
			<ErrorMessage message={errorMessage} />
		</Container>
	);
};

export default ForgotPassword;
