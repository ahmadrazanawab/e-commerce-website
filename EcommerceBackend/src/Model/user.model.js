import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        default:''
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("user", userSchema);
export { User };