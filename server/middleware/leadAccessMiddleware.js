console.log("LEAD ACCESS HIT");
const Lead = require("../models/Lead");
const validateObjectId = require("../utils/validateObjectId");

const leadAccess = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!validateObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Lead ID",
            });
        }

        // Find Lead
        const lead = await Lead.findById(id);
        console.log("Lead Found:", lead?._id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        // Admin has full access
        if (req.user.role === "admin") {
            req.lead = lead;
            return next();
        }

        // Members can only access assigned leads
        if (
            lead.assignedTo &&
            lead.assignedTo.toString() === req.user._id.toString()
        ) {
            req.lead = lead;
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access denied.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = leadAccess;