const express = require("express");

const router = express.Router({ mergeParams: true });

const {
    createNote,
    getLeadNotes,
    deleteNote
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");
const noteAccess = require("../middleware/noteAccessMiddleware");

// ======================================================
// Create Note
// POST /api/leads/:id/notes
// ======================================================

router.post(
    "/",
    protect,
    createNote
);

// ======================================================
// Get Notes
// GET /api/leads/:id/notes
// ======================================================

router.get(
    "/",
    protect,
    getLeadNotes
);

// ======================================================
// Delete Note
// DELETE /api/notes/:noteId
// ======================================================

router.delete(
    "/:noteId",
    protect,
    noteAccess,
    deleteNote
);

module.exports = router;