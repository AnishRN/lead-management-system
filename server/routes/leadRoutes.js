const express = require("express");
const router = express.Router();

// ======================================================
// DEBUG LOGGER
// ======================================================

router.use((req, res, next) => {

    console.log(
        "LEAD ROUTE:",
        req.method,
        req.originalUrl
    );

    next();

});

const {
    createLead,
    createPublicLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    updateLeadStatus,
    getLeadTimeline
} = require("../controllers/leadController");

// ======================================================
// Middleware
// ======================================================

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const leadAccess = require("../middleware/leadAccessMiddleware");
const queryMiddleware = require("../middleware/queryMiddleware");

// ======================================================
// Public Route
// ======================================================

// Public Lead Capture Form
router.post(
    "/public",
    createPublicLead
);

// ======================================================
// Protected Routes
// ======================================================

// Create Lead (Admin Only)
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createLead
);

// Get All Leads
router.get(
    "/",
    protect,
    queryMiddleware,
    getAllLeads
);

// Get Single Lead
router.get(
    "/:id",
    protect,
    leadAccess,
    getLeadById
);

// Update Lead
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leadAccess,
    updateLead
);

// Delete Lead
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leadAccess,
    deleteLead
);

// ======================================================
// Special Routes
// ======================================================

// Assign Lead
router.patch(
    "/:id/assign",
    protect,
    authorizeRoles("admin"),
    leadAccess,
    assignLead
);

// Update Status
router.patch(
    "/:id/status",
    protect,
    leadAccess,
    updateLeadStatus
);

// Lead Timeline
router.get(
    "/:id/timeline",
    protect,
    leadAccess,
    getLeadTimeline
);

module.exports = router;