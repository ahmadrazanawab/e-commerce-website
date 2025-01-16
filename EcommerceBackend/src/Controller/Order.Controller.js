import { Order } from "../Model/Order.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";


const orderProduct = asyncHandler(async (req, res) => {
    const { products, shippingAddress, totalAmount } = req.body;
    const userId = req.user.id;

    // Validate request body
    if (!products || !products.length || !shippingAddress || !totalAmount) {
        return res.status(400).json({
            success: false,
            message: "Products, shipping address, and total amount are required.",
        });
    }

    const invalidProducts = products.some(product => 
        !product.product || !product.quantity || product.quantity <= 0
    );
    if (invalidProducts) {
        return res.status(400).json({
            success: false,
            message: "Each product must have a valid product ID and a positive quantity.",
        });
    }

    // Create a new order
    const order = new Order({
        user: userId,
        products,
        shippingAddress,
        totalAmount,
    });

    // Save order to the database
    await order.save();

    // Return success response
    res.status(201).json({
        success: true,
        message: "Order created successfully.",
        order,
    });
});

export { orderProduct };
