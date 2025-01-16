import { asyncHandler } from "../Utility/asyncHandler.js";
import { Cart } from "../Model/Cart.model.js";

const addCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
        return res.status(400).json({ success: false, message: "Product ID and quantity are required." });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
    } else {
        // If no cart exists, create a new one
        cart = new Cart({
            user: userId,
            products: [{ product: productId, quantity }]
        });
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
});

export { addCart };