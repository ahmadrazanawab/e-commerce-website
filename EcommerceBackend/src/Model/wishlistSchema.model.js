import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Wishlist = mongoose.model('wishlist', wishlistSchema);
export default Wishlist;