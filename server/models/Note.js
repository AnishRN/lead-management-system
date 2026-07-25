const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        // Null for notes added during public enquiry
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        text: {
            type: String,
            required: [true, "Note text is required"],
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);