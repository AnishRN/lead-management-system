const Note = require("../models/Note");
const Lead = require("../models/Lead");

// ======================================================
// Create Note
// POST /api/leads/:id/notes
// ======================================================

const createNote = async (req, res) => {

    try {

        const { text } = req.body;
        const leadId = req.params.id;

        if (!text || text.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Note text is required"
            });

        }

        const lead = await Lead.findById(leadId);

        if (!lead) {

            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });

        }

        const note = await Note.create({

            lead: leadId,
            user: req.user._id,
            text

        });

        const populatedNote = await Note.findById(note._id)
            .populate("user", "name email role");

        res.status(201).json({

            success: true,
            message: "Note added successfully",
            note: populatedNote

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
// Get Notes
// GET /api/leads/:id/notes
// ======================================================

const getLeadNotes = async (req, res) => {

    try {

        const leadId = req.params.id;

        const lead = await Lead.findById(leadId);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        const notes = await Note.find({ lead: leadId })

            .populate("user", "name email role")

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: notes.length,
            notes

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
// Delete Note
// DELETE /api/notes/:noteId
// ======================================================

const deleteNote = async (req, res) => {

    try {

        // noteAccessMiddleware already fetched the note
        await req.note.deleteOne();

        res.status(200).json({

            success: true,
            message: "Note deleted successfully"

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

    createNote,

    getLeadNotes,

    deleteNote

};