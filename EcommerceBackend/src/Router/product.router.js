import express from "express";
const productRoute = express.Router();
import { fetchUser } from "../Middleware/fetchUser.middleware.js";
import {
    addProduct,
    getProduct
 } from "../Controller/Prodcut.Controller.js";

// admin
productRoute.route("/addProduct").post(addProduct);

// user
productRoute.route("/getProduct").get(getProduct);

export { productRoute };