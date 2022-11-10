import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { extendMessages } from "node-input-validator";
import connect from "./config/database.js";
import routes from "./routes/index.js";

const port = process.env.APP_PORT || 8080;
const app = express();

await connect();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("./public/uploads"));

extendMessages({
	required: "The :attribute field is required.",
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
