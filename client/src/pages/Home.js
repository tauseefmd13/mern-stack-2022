import React, { useState } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import Post from "./posts/Post";
import CreatePost from "./posts/CreatePost";

const Home = () => {
	const [loading, setLoading] = useState(true);

	setTimeout(() => {
		setLoading(false);
	}, [3000]);

	return (
		<Box flex={4} p={{ xs: 0, md: 2 }}>
			<CreatePost />
			{loading ? (
				<Stack spacing={1} sx={{ margin: 5 }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Box sx={{ marginRight: 2 }}>
							<Skeleton variant="circular" width={40} height={40} />
						</Box>
						<Box sx={{ width: "100%" }}>
							<Skeleton
								variant="text"
								height={10}
								width="80%"
								style={{ marginBottom: 6 }}
							/>
							<Skeleton variant="text" height={10} width="40%" />
						</Box>
					</Box>
					<Skeleton variant="rectangular" height={300} />
					<Skeleton variant="text" height={20} />
					<Skeleton variant="text" height={20} width="80%" />
				</Stack>
			) : (
				<>
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</>
			)}
		</Box>
	);
};

export default Home;
