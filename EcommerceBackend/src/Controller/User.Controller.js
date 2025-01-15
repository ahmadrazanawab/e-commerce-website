import { User } from "../Model/user.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";
import bcrypt from "bcrypt";

const userRegister = asyncHandler(async (req, res) => {
    let { name, email, number, password } = req.body;
    if (!(name && email && number && password)) {
        return res.status(400).json({ success: false, error: "All fields are required!" });
    }
    if (number.length < 10 || number.length > 10) {
        return res.status(400).json({ success: false, error: "Number must be 10 digit" });
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

    res.status(201).json({ success: true, message: "User has been register successfull", newUser });

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
    let comparePassword = await bcrypt.compare(password,user.password);
    if (!comparePassword) {
        return res.status(401).json({ success: false, error: "Password Not Found" });
    }
    res.json({ success: true, message: "User login successfully", user });
})
export {
    userRegister,
    userLogin
}