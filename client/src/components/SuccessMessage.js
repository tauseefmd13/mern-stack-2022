import React from "react";
import { Alert } from "@mui/material";

const SuccessMessage = ({ message }) => {
	return message ? (
		<Alert sx={{ mt: 4 }} severity="success">
			{message}
		</Alert>
	) : null;
};

export default SuccessMessage;
