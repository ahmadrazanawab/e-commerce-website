import express from "express";
const userPayment = express.Router();
import { userPaymentMethod } from "../Controller/Payment.Controller.js";
import { fetchUser } from "../Middleware/fetchUser.middleware.js";

userPayment.route("/userPayment").post(fetchUser,userPaymentMethod);
export { userPayment };