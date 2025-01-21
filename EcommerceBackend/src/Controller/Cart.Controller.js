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
            cart.products[existingProductIndex].price += quantity;
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
    // cart = new Cart({
    //     user: userId,
    //     products: [{ product: productId, quantity }]
    // });
    // Save the cart
    await cart.save();
    res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
});

const fetchAllCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // Fetch the cart for the logged-in user
    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
        return res.status(404).json({ success: false, message: "No cart found for this user." });
    }

    res.status(200).json({ success: true, cart });
});


const deleteProductFromCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    // const { productId } = req.body;
    
    const { productId } = req.params; // Get productId from URL params

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    // Check if the user has a cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "No cart found for this user." });
    }

    // Find the index of the product to be removed
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex === -1) {
        // Handle case where the product does not exist in the cart
        return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Check if the cart is empty after the removal
    if (cart.products.length === 0) {
        // Optionally delete the cart if it's empty (optional logic)
        await Cart.deleteOne({ user: userId });
        return res.status(200).json({ success: true, message: "Product removed. Cart is now empty." });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, message: "Product removed from cart successfully.", cart });
});



export { addCart,deleteProductFromCart, fetchAllCart };