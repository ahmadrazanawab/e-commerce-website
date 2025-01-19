import { asyncHandler } from "../Utility/asyncHandler.js";
import { Payment } from "../Model/Payment.model.js";

// Create a new user payment
const userPaymentMethod = asyncHandler(async (req, res) => {
    const { user, order, paymentMethod, transactionId } = req.body;

    // Validate input fields
    if (!user || !order || !paymentMethod) {
        return res.status(400).json({ message: "User, order, and payment method are required." });
    }

    // Validate paymentMethod value
    const validMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'];
    if (!validMethods.includes(paymentMethod)) {
        return res.status(400).json({ message: "Invalid payment method." });
    }

    // Create a new payment record
    const payment = new Payment({
        user,
        order,
        paymentMethod,
        transactionId, // Optional
    });

    // Save the payment to the database
    await payment.save();

    // Respond with the created payment
    res.status(201).json({
        message: "Payment created successfully.",
        payment,
    });
});

export { userPaymentMethod }
