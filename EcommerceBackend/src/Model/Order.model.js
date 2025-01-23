import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        fullname: {
            type: String,
            required: true
        },
        mobileno: {
            type: Number,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        HomeAddress: {
            type: String,
            required: true
        },
        Area: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            required: true
        },
        townorcity: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("order", orderSchema);

export { Order };