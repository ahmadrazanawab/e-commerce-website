import express from "express";
const userRoute = express.Router();
import {
    userRegister,
    userLogin
 } from "../Controller/User.Controller.js";

userRoute.route('/userRegister').post(userRegister);
userRoute.route('/userLogin').post(userLogin);

export { userRoute };