import { User } from "../Model/user.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// see the Admin 
const getAllUser = asyncHandler(async (req , res) => {
    const user = await User.find();

    if (!user || user.length === 0) {
        return res.status(404).json({ success: false, error: "No user found" });
    }

    res.status(200).json({ success: true, user });
    // console.log(user.length);
})
const userRegister = asyncHandler(async (req, res) => {
    let { name, email, number, password } = req.body;
    
    if (!(name && email && number && password)) {
        return res.status(400).json({ success: false, error: "All fields are required!" });
    }
    // Validate number
    if (number.length !== 10) {
        return res.status(400).json({ success: false, error: "Number must be 10 digits." });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
    }
    let user = await User.findOne({
        $or: [{ email }, { number }]
    });

    if (user) {
        return res.status(400).json({ success: false, error: "User already exits!" });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    const newUser = User({
        name,
        email,
        number,
        password: hashPassword
    });
    await newUser.save();
    let data = {
        user: {
            id:newUser.id
        }
    }

    let token = await jwt.sign(data, process.env.JWT_SECRET);
    res.status(201).json({ success: true, message: "User has been register successfull", newUser,token });

});
const userLogin = asyncHandler(async (req, res) => {
    const { email, number, password } = req.body;
    if (!email) {
        return res.status(401).json({ success: false, error: "Email or Number are required!" });
    }
    if (!password) {
        return res.status(401).json({ success: false, error: "Email or Number are required!" });
    }
    let user = await User.findOne({
        $or: [{ email }, { number }]
    });
    if (!user) {
        return res.status(401).json({ success: false, error: "Email Not Found" });
    }
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return res.status(401).json({ success: false, error: "Password Not Found" });
    }
    let data = {
        user: {
            id:user.id
        }
    }
    let token = await jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, message: "User login successfully",token });
});

const getUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.status(200).json({ success: true, message: "Get User", user });
})
export {
    getAllUser,
    userRegister,
    userLogin,
    getUser
}