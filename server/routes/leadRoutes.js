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

// Middleware
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const leadAccess = require("../middleware/leadAccessMiddleware"); // ✅ FIXED
const queryMiddleware = require("../middleware/queryMiddleware");


// ======================================================
// Routes
// Base: /api/leads
// ======================================================


// ✅ Create Lead (Admin only)
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createLead
);


// ✅ Get All Leads (Admin + Member)
router.get(
    "/",
    protect,
    queryMiddleware,
    getAllLeads
);


// ✅ Get Single Lead
router.get(
    "/:id",
    protect,
    leadAccess, // ✅ FIXED
    getLeadById
);


// ✅ Update Lead (Admin only)
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leadAccess, // ✅ FIXED
    updateLead
);


// ✅ Delete Lead (Admin only)
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leadAccess, // ✅ FIXED
    deleteLead
);


// ======================================================
// Special Actions
// ======================================================


// ✅ Assign Lead (Admin only)
router.patch(
    "/:id/assign",
    protect,
    authorizeRoles("admin"),
    leadAccess, // ✅ FIXED
    assignLead
);


// ✅ Update Status (Admin + Member)
router.patch(
    "/:id/status",
    protect,
    leadAccess, // ✅ FIXED
    updateLeadStatus
);


// ✅ Lead Timeline (Admin + Member)
router.get(
    "/:id/timeline",
    protect,
    leadAccess, // ✅ FIXED
    getLeadTimeline
);


module.exports = router;