import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [
        {
            type: String,
            required:true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('product', productSchema);
export { Product };