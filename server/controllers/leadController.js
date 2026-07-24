const Lead = require("../models/Lead");

// ======================================================
// Create Lead
// POST /api/leads
// Admin Only
// ======================================================

const createLead = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            source,
            assignedTo,
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }

        const lead = await Lead.create({

            name,

            email,

            phone,

            company,

            source,

            assignedTo: assignedTo || null,

            createdBy: req.user._id,

        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email");

        res.status(201).json({

            success: true,

            message: "Lead created successfully",

            lead: populatedLead,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

// ======================================================
// Get All Leads
// GET /api/leads
// ======================================================

const getAllLeads = async (req, res) => {

    try {

        let query = {};

        if (req.user.role === "member") {

            query.assignedTo = req.user._id;

        }

        const leads = await Lead.find(query)

            .populate("assignedTo", "name email role")

            .populate("createdBy", "name email")

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: leads.length,

            leads,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

// ======================================================
// Get Lead By ID
// GET /api/leads/:id
// ======================================================

const getLeadById = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id)

            .populate("assignedTo", "name email role")

            .populate("createdBy", "name email");

        if (!lead) {

            return res.status(404).json({

                success: false,

                message: "Lead not found",

            });

        }

        if (

            req.user.role === "member" &&

            (!lead.assignedTo ||

                lead.assignedTo._id.toString() !== req.user._id.toString())

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied",

            });

        }

        res.status(200).json({

            success: true,

            lead,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

module.exports = {

    createLead,

    getAllLeads,

    getLeadById,

};