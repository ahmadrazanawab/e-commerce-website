import { Admin } from "../Model/Admin.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRegister = asyncHandler(async (req, res) => {
    let { name, email, number, password } = req.body;

    if (!(name && email && number && password)) {
        return res.status(400).json({ success: false, error: "All fields are required!" });
    }
    // Validate number
    if (number.length !== 10) {
        return res.status(400).json({ success: false, error: "Number must be 10 digits." });
    }

    // Validate Password
    if (password.length < 6) {
        return res.status(400).json({ success: false, error: "Password must be at least 6 characters!" });
    }

    let admin = await Admin.findOne({
        $or: [{ email }, { number }]
    });

    if (admin) {
        return res.status(400).json({ success: false, error: "Admin already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = Admin({
        name,
        email,
        number,
        password: hashPassword
    });
    await newAdmin.save();

    const data = {
        admin: {
            id:newAdmin.id
        }
    }
    //  { expiresIn: "1h" }
    let token = await jwt.sign(data, process.env.JWT_SECRET);
    
    res.status(201).json({ success: true, message: "Admin registered successfully", newAdmin,token });
});

const adminLogin = asyncHandler(async (req, res) => {
    const { email, number, password } = req.body;

    // Validate input
    if (!(email || number) || !password) {
        return res.status(400).json({ success: false, error: "Email/Number and password are required!" });
    }

    // Find Admin by email or number
    const admin = await Admin.findOne({
        $or: [{ email }, { number }]
    });

    if (!admin) {
        return res.status(401).json({ success: false, error: "Admin not found!" });
    }

    //  { expiresIn: "1h" }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, message: "Admin Logged in successfully", token });
});

const getAdmin = asyncHandler(async (req, res) => {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.status(200).json({ success: true, admin });
})
 
export {
    adminRegister,
    adminLogin,
    getAdmin
}