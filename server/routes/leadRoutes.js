const express = require("express");

const router = express.Router();

const {

    createLead,

    getAllLeads,

    getLeadById,

} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// Create Lead (Admin)

router.post(

    "/",

    protect,

    authorizeRoles("admin"),

    createLead

);

// View Leads

router.get(

    "/",

    protect,

    getAllLeads

);

// View Single Lead

router.get(

    "/:id",

    protect,

    getLeadById

);

module.exports = router;