const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        // Null for public submissions
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        action: {
            type: String,
            required: true,
        },

        oldValue: {
            type: String,
            default: null,
        },

        newValue: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Activity", activitySchema);