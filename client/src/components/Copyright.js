import React from "react";
import { Container, Typography } from "@mui/material";

const Copyright = (props) => {
	return (
		<>
			<Container>
				<Typography
					variant="body2"
					color="text.secondary"
					align="center"
					{...props}
				>
					{"Copyright © "}
					{new Date().getFullYear()}
					{"."}
					{" All rights reserved."}
				</Typography>
			</Container>
		</>
	);
};

export default Copyright;
