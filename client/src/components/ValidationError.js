import React from "react";
import { FormHelperText } from "@mui/material";

const ValidationError = ({ error }) => {
	return error ? (
		<FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
	) : null;
};

export default ValidationError;
