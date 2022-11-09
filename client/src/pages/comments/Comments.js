import React from "react";
import { Avatar, Button, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const AddCommentBox = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	marginBottom: "40px",
});

const CommentsBox = styled(Box)({
	display: "flex",
	gap: "10px",
	marginBottom: "20px",
});

const Comments = () => {
	const comments = [
		{
			id: 1,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
			name: "John Doe",
			userId: 1,
			profilePicture:
				"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			id: 2,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
			name: "John Doe",
			userId: 2,
			profilePicture:
				"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
		},
	];

	return (
		<>
			<Box bgcolor={"background.default"} color={"text.primary"} p={1} mx={2}>
				<AddCommentBox>
					<Avatar
						src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						sx={{ width: 30, height: 30 }}
					/>
					<TextField
						fullWidth
						id="comment"
						name="comment"
						label="Write a comment"
						variant="standard"
					/>
					<Button variant="contained">Send</Button>
				</AddCommentBox>

				{comments.map((comment) => (
					<CommentsBox key={comment.id}>
						<Avatar
							src={comment.profilePicture}
							sx={{ width: 30, height: 30 }}
						/>
						<Box>
							<Typography paragraph>{comment.name}</Typography>
							<Typography paragraph>{comment.desc}</Typography>
							<Typography paragraph>1 hour ago</Typography>
						</Box>
					</CommentsBox>
				))}
			</Box>
		</>
	);
};

export default Comments;
