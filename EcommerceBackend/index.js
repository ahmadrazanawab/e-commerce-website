import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongodb } from "./src/db/db.js";

dotenv.config();
connectToMongodb();
const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('this is a Ahmad Raza');
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})