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
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

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
// Admin & Member
// ======================================================

router.get(
    "/",
    protect,
    getAllLeads
);

// ======================================================
// Get Lead By ID
// GET /api/leads/:id
// ======================================================

router.get(
    "/:id",
    protect,
    getLeadById
);

// ======================================================
// Update Lead
// PUT /api/leads/:id
// Admin & Assigned Member
// ======================================================

router.put(
    "/:id",
    protect,
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
// Update Lead Status
// PATCH /api/leads/:id/status
// Admin & Assigned Member
// ======================================================

router.patch(
    "/:id/status",
    protect,
    updateLeadStatus
);

module.exports = router;