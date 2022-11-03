import React from "react";
import {
	Avatar,
	Button,
	InputLabel,
	Stack,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import {
	EmojiEmotions,
	Image,
	PersonAdd,
	VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const UserBox = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	marginBottom: "20px",
});

const CreatePost = () => {
	return (
		<>
			<Box bgcolor={"background.default"} color={"text.primary"} p={3} mx={2}>
				<UserBox>
					<Avatar
						src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						sx={{ width: 30, height: 30 }}
					/>
					<Typography fontWeight={500} variant="span">
						John Doe
					</Typography>
				</UserBox>
				<TextField
					sx={{ width: "100%" }}
					id="title"
					name="title"
					multiline
					rows={3}
					placeholder="What's on your mind?"
					variant="standard"
				/>
				<Stack direction="row" gap={1} mt={2} mb={3}>
					<EmojiEmotions color="primary" />

					<TextField type="file" id="file" sx={{ display: "none" }} />
					<InputLabel htmlFor="file">
						<Image color="secondary" />
					</InputLabel>

					<TextField type="file" id="video" sx={{ display: "none" }} />
					<InputLabel htmlFor="video">
						<VideoCameraBack color="success" />
					</InputLabel>

					<PersonAdd color="error" />
				</Stack>
				<Button fullWidth variant="contained">
					Post
				</Button>
			</Box>
		</>
	);
};

export default CreatePost;
