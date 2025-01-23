import { Order } from "../Model/Order.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";


const fetchAllOrderItems = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId });
    
    if (!orders || orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found for the user.",
        });
    }
    
    return res.status(200).json({ success: true, message: "all items fetch successfully", orders })
});

const fetchShippingAddress = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).select("shippingAddress")
    
    if (!orders || orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found for the user.",
        });
    }
    
    return res.status(200).json({ success: true, message: "all items fetch successfully", orders })
});


// 
const orderProduct = asyncHandler(async (req, res) => {
    const { products, shippingAddress, paymentMethod, totalAmount } = req.body;
    const userId = req.user.id;

    // Validate request body  
    if (!products || !products.length || !shippingAddress || !paymentMethod || !totalAmount) {
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
        paymentMethod,
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

export { orderProduct, fetchAllOrderItems,fetchShippingAddress};
