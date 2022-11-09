import React, { useState } from "react";
import {
	Favorite,
	FavoriteBorder,
	MoreVert,
	Share,
	TextsmsOutlined,
} from "@mui/icons-material";
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Checkbox,
	Collapse,
	IconButton,
	Typography,
} from "@mui/material";
import Comments from "../comments/Comments";

const Post = () => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ margin: { xs: 0, md: 5 }, marginBottom: { xs: 2, md: 0 } }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert />
					</IconButton>
				}
				title="John Doe"
				subheader="November 03, 2022"
			/>
			<CardMedia
				component="img"
				height="20%"
				image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					This impressive paella is a perfect party dish and a fun meal to cook
					together with your guests. Add 1 cup of frozen peas along with the
					mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{ color: "red" }} />}
					/>
					<Typography variant="body2" color="text.secondary">
						12 Likes
					</Typography>
				</IconButton>
				<IconButton
					expand={expanded.toString()}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="comment"
				>
					<TextsmsOutlined />
					<Typography variant="body2" color="text.secondary">
						12 Comments
					</Typography>
				</IconButton>
				<IconButton aria-label="share">
					<Share />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Comments />
			</Collapse>
		</Card>
	);
};

export default Post;
