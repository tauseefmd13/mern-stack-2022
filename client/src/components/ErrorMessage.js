import React from "react";
import { Alert } from "@mui/material";

const ErrorMessage = ({ message }) => {
	return message ? (
		<Alert sx={{ mt: 4 }} severity="error">
			{message}
		</Alert>
	) : null;
};

export default ErrorMessage;
