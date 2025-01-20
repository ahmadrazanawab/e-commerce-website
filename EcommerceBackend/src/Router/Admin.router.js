import express from "express";
const adminRoute = express.Router();
import { adminLogin, adminRegister, getAdmin } from "../Controller/AdminAuth.Controller.js";
import { fetchAdmin } from "../Middleware/fetchAdmin.middleware.js";
import { getAllUser } from "../Controller/UserAuth.Controller.js";

adminRoute.route('/adminRegister').post(adminRegister);
adminRoute.route('/adminLogin').post(adminLogin);
adminRoute.route('/getAdmin').get(fetchAdmin, getAdmin);

adminRoute.route('/getAllUser').get(fetchAdmin,getAllUser)

export { adminRoute };