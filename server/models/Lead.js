const mongoose = require("mongoose");
const LEAD_STATUS = require("../constants/leadStatus");
const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Lead name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        source: {
            type: String,
            default: "Manual",
        },

        status: {
            type: String,
            enum: LEAD_STATUS,
            default: "New",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);