const express = require("express");

const router = express.Router({
    mergeParams:true
});


const {
    createNote,
    getLeadNotes,
    deleteNote
} = require("../controllers/noteController");


const { protect } = require("../middleware/authMiddleware");

const noteAccess = require("../middleware/noteAccessMiddleware");



// POST /api/leads/:id/notes

router.post(
    "/",
    protect,
    createNote
);



// GET /api/leads/:id/notes

router.get(
    "/",
    protect,
    getLeadNotes
);



// DELETE /api/notes/:noteId

router.delete(
    "/:noteId",
    protect,
    noteAccess,
    deleteNote
);



module.exports = router;