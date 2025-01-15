import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongodb } from "./src/db/db.js";
import { userRoute } from "./src/Router/user.router.js";

dotenv.config();
connectToMongodb();
const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.json());

app.use('/api/auth/v1/', userRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})