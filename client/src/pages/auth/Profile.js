import React from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardMedia,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import Post from "../posts/Post";

const Profile = () => {
	return (
		<Box flex={4} p={{ xs: 0, md: 2 }}>
			<Card sx={{ margin: { xs: 0, md: 5 }, my: { xs: 2, md: 0 } }}>
				<Box
					sx={{
						width: "100%",
						height: "300px",
						position: "relative",
					}}
				>
					<CardMedia
						sx={{ width: "100%", maxHeight: 300 }}
						component="img"
						image="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						alt="Cover"
					/>
					<Avatar
						src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						sx={{
							width: 200,
							height: 200,
							position: "absolute",
							left: 0,
							right: 0,
							margin: "auto",
							top: "50px",
						}}
					/>
				</Box>

				<Stack direction="row" spacing={2} justifyContent="space-between">
					<Box
						flex={1}
						p={2}
						sx={{
							display: "flex",
							justifyContent: "start",
						}}
					>
						<Link href="http://facebook.com">
							<FacebookTwoToneIcon fontSize="large" />
						</Link>
						<Link href="http://twitter.com">
							<TwitterIcon fontSize="large" />
						</Link>
						<Link href="http://instagram.com">
							<InstagramIcon fontSize="large" />
						</Link>
						<Link href="http://linkedin.com">
							<LinkedInIcon fontSize="large" />
						</Link>
					</Box>

					<Box
						flex={1}
						p={2}
						sx={{
							display: "grid",
							justifyContent: "center",
							gap: "5px",
						}}
					>
						<Box>
							<Typography fontWeight={500} variant="span">
								John Doe
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<PlaceIcon />
							<Typography fontWeight={500} variant="span">
								USA
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<LanguageIcon />
							<Typography fontWeight={500} variant="span">
								example.com
							</Typography>
						</Box>
						<Button variant="contained" size="small">
							Follow
						</Button>
					</Box>

					<Box
						flex={1}
						p={2}
						sx={{
							display: "flex",
							justifyContent: "end",
						}}
					>
						<EmailOutlinedIcon />
						<MoreVertIcon />
					</Box>
				</Stack>
			</Card>

			<Post />
		</Box>
	);
};

export default Profile;
