import express from "express";
const productRoute = express.Router();
import { fetchAdmin } from "../Middleware/fetchAdmin.middleware.js";
import { fetchUser } from "../Middleware/fetchUser.middleware.js";
import {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from "../Controller/Prodcut.Controller.js";
 
import { addCart } from "../Controller/Cart.Controller.js";

// user
productRoute.route("/getProduct").get(getProduct);

// user add to cart
productRoute.route("/addtocart").post(fetchUser,addCart);

// admin
productRoute.route("/addProduct").post(fetchAdmin, addProduct);
productRoute.route("/updateProduct/:id").put(fetchAdmin, updateProduct);
productRoute.route("/deleteProduct/:id").delete(fetchAdmin, deleteProduct);


export { productRoute };