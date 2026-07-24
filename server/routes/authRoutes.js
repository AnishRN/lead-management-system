const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    adminOnly
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// ======================================================
// Public Routes
// ======================================================

router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);

// ======================================================
// Protected Routes
// ======================================================

router.get(
    "/me",
    protect,
    getMe
);

// ======================================================
// Admin Route
// ======================================================

router.get(
    "/admin",
    protect,
    authorizeRoles("admin"),
    adminOnly
);

module.exports = router;