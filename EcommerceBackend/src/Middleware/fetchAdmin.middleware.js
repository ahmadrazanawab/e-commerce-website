import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utility/asyncHandler.js";
import { Admin } from "../Model/Admin.model.js";

const fetchAdmin = asyncHandler(async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, error: "Unauthorized: Token required" });
    };
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(data.id); 
    if (!req.admin) {
        return res.status(401).json({ success: false, error: "User not found" });
    }
    next();
});

export { fetchAdmin };