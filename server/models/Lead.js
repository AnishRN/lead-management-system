const mongoose = require("mongoose");

const LEAD_STATUS = require("../constants/leadStatus");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Lead name is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address"
            ]
        },

        phone: {
            type: String,
            trim: true,
            default: ""
        },

        company: {
            type: String,
            trim: true,
            default: ""
        },

        source: {
            type: String,
            trim: true,
            default: "Manual"
        },

        status: {
            type: String,
            enum: LEAD_STATUS,
            default: "New"
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        // Admin-created leads will store the admin.
        // Public submissions will leave this as null.
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lead", leadSchema);