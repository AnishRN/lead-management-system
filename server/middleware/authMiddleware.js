const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        console.log("==========================");
        console.log("Authorization Header:", req.headers.authorization);
        console.log("Extracted Token:", token);
        console.log("JWT Secret:", process.env.JWT_SECRET);
        console.log("==========================");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User associated with this token no longer exists."
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error("Authentication Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};

module.exports = protect;