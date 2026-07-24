const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// =====================================================
// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
// =====================================================
const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// =====================================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// =====================================================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        // Generate Token
        const token = generateToken(user._id);

        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// =====================================================
// @desc    Get Logged-in User
// @route   GET /api/auth/me
// @access  Private
// =====================================================
const getMe = async (req, res) => {

    res.status(200).json({

        success: true,

        user: req.user

    });

};

// =====================================================
// @desc    Admin Only Route
// @route   GET /api/auth/admin
// @access  Private (Admin)
// =====================================================
const adminOnly = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome Admin",

        user: req.user

    });

};

module.exports = {

    registerUser,

    loginUser,

    getMe,

    adminOnly

};