import mongoose from "mongoose";

const connect = async () => {
	const dbUrl = process.env.DATABASE_URL;
	const dbName = process.env.DATABASE_NAME;

	await mongoose.connect(dbUrl, {
		dbName: dbName,
	});

	console.log(`MongoDB Connected: ${dbUrl}`);
};

export default connect;
