import express from "express";
const userRoute = express.Router();
import { fetchUser } from "../Middleware/fetchUser.middleware.js";
import {
    userRegister,
    userLogin,
    getUser
 } from "../Controller/UserAuth.Controller.js";


userRoute.route('/userRegister').post(userRegister);
userRoute.route('/userLogin').post(userLogin);
userRoute.route('/getUser').get(fetchUser, getUser);


export { userRoute };