// middleware/roleMiddleware.js

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        // Check if user exists (from protect middleware)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        // Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource."
            });
        }

        next();

    };

};

// ✅ FIXED EXPORT (IMPORTANT)
module.exports = { authorizeRoles };