const Lead = require("../models/Lead");
const Activity = require("../models/Activity");
const User = require("../models/User");
const Note = require("../models/Note");

const LEAD_STATUS = require("../constants/leadStatus");
const validateObjectId = require("../utils/validateObjectId");

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

        // ✅ Prevent duplicate leads
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(409).json({
                success: false,
                message: "Lead with this email already exists",
            });
        }

        // ✅ Validate assigned user
        if (assignedTo) {
            if (!validateObjectId(assignedTo)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid assigned user ID",
                });
            }

            const user = await User.findById(assignedTo);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found",
                });
            }
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

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Created",
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

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

// ======================================================
// Get All Leads
// GET /api/leads
// Supports:
// ?page=1
// ?limit=10
// ?status=New
// ?assignedTo=<userId>
// ?search=john
// ======================================================

const getAllLeads = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            skip = 0,
            filter = {},
            sort = { createdAt: -1 }
        } = req.queryOptions || {};

        // ✅ Avoid mutating middleware object
        let finalFilter = { ...filter };

        // ✅ Restrict members
        if (req.user.role === "member") {
            finalFilter.assignedTo = req.user._id;
        }

        // ✅ Validate status
        if (finalFilter.status) {
            if (!LEAD_STATUS.includes(finalFilter.status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status filter"
                });
            }
        }

        // ✅ Validate sort field
        const allowedSortFields = ["createdAt", "name", "status", "company"];

        if (
            sort &&
            !allowedSortFields.includes(Object.keys(sort)[0])
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid sorting field"
            });
        }

        const total = await Lead.countDocuments(finalFilter);

        const leads = await Lead.find(finalFilter)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role")
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            count: leads.length,
            leads
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// ======================================================
// Get Lead By ID
// GET /api/leads/:id
// ======================================================

const getLeadById = async (req, res) => {

    try {

        // Lead already validated by middleware
        const populatedLead = await Lead.findById(req.lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
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
// Update Lead
// PUT /api/leads/:id
// ======================================================

// ======================================================
// Update Lead
// PUT /api/leads/:id
// ======================================================

const updateLead = async (req, res) => {
    try {
        const lead = req.lead;

        const oldData = {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            source: lead.source,
            status: lead.status,
        };

        // ✅ Prevent restricted updates
        delete req.body.createdBy;
        delete req.body.assignedTo;
        delete req.body._id;
        delete req.body.createdAt;
        delete req.body.updatedAt;

        // ✅ Validate status
        if (req.body.status) {
            if (!LEAD_STATUS.includes(req.body.status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid lead status"
                });
            }
        }

        const allowedFields = [
            "name",
            "email",
            "phone",
            "company",
            "source",
            "status"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                lead[field] = req.body[field];
            }
        });

        await lead.save();

        // ✅ Correct full new state logging
        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Updated",
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify({
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                source: lead.source,
                status: lead.status,
            })
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            lead: populatedLead
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
// ======================================================
// Delete Lead
// DELETE /api/leads/:id
// Admin Only
// ======================================================

const deleteLead = async (req, res) => {
    try {
        const lead = req.lead;

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Deleted",
        });

        await lead.deleteOne();

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
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
// Assign Lead
// PATCH /api/leads/:id/assign
// Admin Only
// ======================================================

// ======================================================
// Assign Lead
// PATCH /api/leads/:id/assign
// Admin Only
// ======================================================

const assignLead = async (req, res) => {
    try {
        const { assignedTo } = req.body;

        if (!assignedTo) {
            return res.status(400).json({
                success: false,
                message: "assignedTo is required"
            });
        }

        if (!validateObjectId(assignedTo)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID"
            });
        }

        const user = await User.findOne({
            _id: assignedTo,
            role: "member"
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Member user not found"
            });
        }

        const lead = req.lead;
        const oldAssignedUser = lead.assignedTo;

        lead.assignedTo = assignedTo;
        await lead.save();

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Assigned",
            oldValue: oldAssignedUser ? oldAssignedUser.toString() : null,
            newValue: assignedTo
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
            message: "Lead assigned successfully",
            lead: populatedLead
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
// ======================================================
// Update Status
// PATCH /api/leads/:id/status
// ======================================================

const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        if (!LEAD_STATUS.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead status",
            });
        }

        const lead = req.lead;

        // ✅ Permission check
        if (
            req.user.role === "member" &&
            lead.assignedTo?.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this lead",
            });
        }

        const oldStatus = lead.status;

        lead.status = status;
        await lead.save();

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Status Changed",
            oldValue: oldStatus,
            newValue: status,
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
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
// Get Lead Timeline
// GET /api/leads/:id/timeline
// ======================================================

const getLeadTimeline = async(req,res)=>{


    try{


        const leadId=req.lead._id;



        const activities = await Activity.find({

            lead:leadId

        })

        .populate(
            "user",
            "name email role"
        )

        .sort({
            createdAt:-1
        });





        const notes = await Note.find({

            lead:leadId

        })

        .populate(
            "user",
            "name email role"
        )

        .sort({
            createdAt:-1
        });





        const activityTimeline = activities.map(activity=>({

            type:"activity",

            action:activity.action,

            oldValue:activity.oldValue,

            newValue:activity.newValue,

            user:activity.user,

            createdAt:activity.createdAt

        }));




        const noteTimeline = notes.map(note=>({


            type:"note",

            text:note.text,

            user:note.user,

            createdAt:note.createdAt


        }));





        const timeline=[

            ...activityTimeline,

            ...noteTimeline

        ].sort(

            (a,b)=>

            new Date(b.createdAt)
            -
            new Date(a.createdAt)

        );





        res.status(200).json({

            success:true,

            count:timeline.length,

            timeline

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });


    }


};

module.exports = {

    createLead,

    getAllLeads,

    getLeadById,

    updateLead,

    deleteLead,

    assignLead,

    updateLeadStatus,

    getLeadTimeline

};