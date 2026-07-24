const Note = require("../models/Note");

const noteAccess = async (req, res, next) => {

    try {

        const note = await Note.findById(req.params.noteId);

        if (!note) {

            return res.status(404).json({
                success: false,
                message: "Note not found"
            });

        }

        // Store the note for later use
        req.note = note;

        // Admin can access every note
        if (req.user.role === "admin") {
            return next();
        }

        // Note owner can access
        if (note.user.toString() === req.user._id.toString()) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access denied"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = noteAccess;