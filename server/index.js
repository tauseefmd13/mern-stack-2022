import * as dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { extendMessages } from "node-input-validator";
import connect from "./config/database.js";
import routes from "./routes/index.js";

const port = process.env.APP_PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

extendMessages({
	required: "The :attribute field is required.",
});

await connect();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
