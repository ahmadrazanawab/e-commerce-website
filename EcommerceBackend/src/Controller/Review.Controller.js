import { asyncHandler } from "../Utility/asyncHandler.js";
import Review from "../Model/Review.model.js";

// Create a new product review
const UserReview = asyncHandler(async (req, res) => {
    const { product, user, rating, comment } = req.body;

    // Validate required fields
    if (!product || !user || !rating) {
        return res.status(400).json({ message: "Product, user, and rating are required." });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Optional: Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ product, user });
    if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this product." });
    }

    // Create a new review
    const review = new Review({
        product,
        user,
        rating,
        comment,
    });

    // Save the review to the database
    await review.save();

    // Respond with the created review
    res.status(201).json({
        message: "Review created successfully.",
        review,
    });
});

export { UserReview };
