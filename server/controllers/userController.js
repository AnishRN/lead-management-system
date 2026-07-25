const User = require("../models/User");
const validateObjectId = require("../utils/validateObjectId");

// ==============================================
// GET ALL MEMBERS
// GET /api/users
// Admin Only
// ==============================================

const getUsers = async (req, res) => {

    try {

        const users = await User.find({

            role: "member"

        })

            .select("-password -__v")

            .sort({

                name: 1

            });

        res.status(200).json({

            success: true,

            count: users.length,

            users

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ==============================================
// GET USER BY ID
// GET /api/users/:id
// Admin Only
// ==============================================

const getUser = async (req, res) => {

    try {

        const { id } = req.params;

        if (!validateObjectId(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid User ID"

            });

        }

        const user = await User.findById(id)

            .select("-password -__v");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            user

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    getUsers,

    getUser

};