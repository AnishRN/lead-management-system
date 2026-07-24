const express = require("express");

const router = express.Router();

const {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    updateLeadStatus,
    getLeadTimeline
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const leadAccess = require("../middleware/leadAccessMiddleware");

// ======================================================
// Create Lead
// POST /api/leads
// Admin Only
// ======================================================

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createLead
);

// ======================================================
// Get All Leads
// GET /api/leads
// ======================================================

router.get(
    "/",
    protect,
    getAllLeads
);

// ======================================================
// Get Lead Timeline
// GET /api/leads/:id/timeline
// ======================================================

router.get(
    "/:id/timeline",
    protect,
    leadAccess,
    getLeadTimeline
);

// ======================================================
// Get Lead By ID
// GET /api/leads/:id
// ======================================================

router.get(
    "/:id",
    protect,
    leadAccess,
    getLeadById
);

// ======================================================
// Update Lead
// PUT /api/leads/:id
// ======================================================

router.put(
    "/:id",
    protect,
    leadAccess,
    updateLead
);

// ======================================================
// Delete Lead
// DELETE /api/leads/:id
// Admin Only
// ======================================================

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteLead
);

// ======================================================
// Assign Lead
// PATCH /api/leads/:id/assign
// Admin Only
// ======================================================

router.patch(
    "/:id/assign",
    protect,
    authorizeRoles("admin"),
    assignLead
);

// ======================================================
// Update Status
// PATCH /api/leads/:id/status
// ======================================================

router.patch(
    "/:id/status",
    protect,
    leadAccess,
    updateLeadStatus
);

module.exports = router;