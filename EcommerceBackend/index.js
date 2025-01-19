import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongodb } from "./src/db/db.js";
import { userRoute } from "./src/Router/user.router.js";
import { productRoute } from "./src/Router/product.router.js";
import { adminRoute } from "./src/Router/Admin.router.js";
import { userPayment } from "./src/Router/UserPayment.router.js";

dotenv.config();
connectToMongodb();
const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.json());

app.use('/api/auth/user/v1/', userRoute);
app.use('/api/auth/admin/v1/', adminRoute);
app.use('/api/product/v2/', productRoute);
app.use('/api/product/user/payment/v3/', userPayment);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})