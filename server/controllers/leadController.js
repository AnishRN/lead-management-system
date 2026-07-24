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

        // Validate assigned user (if provided)
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

const getAllLeads = async (req, res) => {

    try {

        const query = {};

        if (req.user.role === "member") {
            query.assignedTo = req.user._id;
        }

        const leads = await Lead.find(query)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role")
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

        // Don't allow these fields to be updated here
        delete req.body.createdBy;
        delete req.body.assignedTo;
        delete req.body._id;
        delete req.body.createdAt;
        delete req.body.updatedAt;

        Object.assign(lead, req.body);

        await lead.save();

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Updated",
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(req.body),
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
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
// Delete Lead
// DELETE /api/leads/:id
// Admin Only
// ======================================================

const deleteLead = async (req, res) => {

    try {

        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Lead ID",
            });
        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

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
                message: "assignedTo is required",
            });
        }

        if (!validateObjectId(assignedTo)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID",
            });
        }

        const user = await User.findById(assignedTo);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Assigned user not found",
            });
        }

        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Lead ID",
            });
        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        const oldAssignedUser = lead.assignedTo;

        lead.assignedTo = assignedTo;

        await lead.save();

        await Activity.create({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Assigned",
            oldValue: oldAssignedUser ? oldAssignedUser.toString() : "None",
            newValue: assignedTo,
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email role");

        res.status(200).json({
            success: true,
            message: "Lead assigned successfully",
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

const getLeadTimeline = async (req, res) => {

    try {

        const leadId = req.params.id;

        if (!validateObjectId(leadId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Lead ID"
            });

        }

        const lead = await Lead.findById(leadId);

        if (!lead) {

            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });

        }

        // Fetch activities
        const activities = await Activity.find({ lead: leadId })
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        // Fetch notes
        const notes = await Note.find({ lead: leadId })
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        // Convert to common format
        const activityTimeline = activities.map(activity => ({

            type: "activity",

            action: activity.action,

            oldValue: activity.oldValue,

            newValue: activity.newValue,

            user: activity.user,

            createdAt: activity.createdAt

        }));

        const noteTimeline = notes.map(note => ({

            type: "note",

            text: note.text,

            user: note.user,

            createdAt: note.createdAt

        }));

        // Merge & Sort
        const timeline = [...activityTimeline, ...noteTimeline].sort(

            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

        );

        res.status(200).json({

            success: true,

            count: timeline.length,

            timeline

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

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