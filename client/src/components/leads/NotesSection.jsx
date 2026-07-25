import { useEffect, useState } from "react";

import {
    getNotes,
    createNote
} from "../../api/leadApi";

const NotesSection = ({ leadId }) => {

    const [notes, setNotes] = useState([]);

    const [text, setText] = useState("");

    const loadNotes = async () => {

        try {

            const { data } = await getNotes(leadId);

            setNotes(data.notes);

        }

        catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadNotes();

    }, [leadId]);

    const addNote = async () => {

        if (!text.trim()) return;

        await createNote(leadId, text);

        setText("");

        loadNotes();

    };

    return (

        <div className="card mt-4">

            <div className="card-header">

                Notes

            </div>

            <div className="card-body">

                <textarea
                    className="form-control mb-3"
                    rows="3"
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary mb-3"
                    onClick={addNote}
                >
                    Add Note
                </button>

                {
                    notes.map(note => (

                        <div
                            key={note._id}
                            className="border rounded p-2 mb-2"
                        >

                            <strong>

                                {note.user?.name}

                            </strong>

                            <p className="mb-0">

                                {note.text}

                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    );

};

export default NotesSection;