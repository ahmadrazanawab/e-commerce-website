import express from "express";
const productRoute = express.Router();
import { fetchAdmin } from "../Middleware/fetchAdmin.middleware.js";
import { fetchUser } from "../Middleware/fetchUser.middleware.js";
import { addCart,deleteProductFromCart,fetchAllCart  } from "../Controller/Cart.Controller.js";
import { orderProduct } from "../Controller/Order.Controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { UserReview } from "../Controller/Review.Controller.js";
import {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from "../Controller/Prodcut.Controller.js";



// user
productRoute.route("/getProduct").get(getProduct);

// user add to cart
productRoute.route("/addtocart").post(fetchUser, addCart);
productRoute.route("/fetchallcart").get(fetchUser, fetchAllCart);
productRoute.route("/cart/product/:productId").delete(fetchUser, deleteProductFromCart);
// user order product
productRoute.route("/orderProduct").post(fetchUser, orderProduct);
// user review
productRoute.route("/userReview").post(fetchUser, UserReview);

// admin
productRoute.route("/addProduct").post(
    upload.fields([
        {
            name: "images",
            minCount: 1
        }
    ]), fetchAdmin, addProduct);
productRoute.route("/updateProduct/:id").put(fetchAdmin, updateProduct);
productRoute.route("/deleteProduct/:id").delete(fetchAdmin, deleteProduct);


export { productRoute };