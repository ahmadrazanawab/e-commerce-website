import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utility/asyncHandler.js";

const fetchUser = asyncHandler(async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, error: "Please authenticate is not a valid taken!" });
    }
    let data = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
});

export { fetchUser };