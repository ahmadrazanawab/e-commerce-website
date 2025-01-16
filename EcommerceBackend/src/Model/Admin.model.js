import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        default:"admin"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model("admin", adminSchema);
export { Admin };