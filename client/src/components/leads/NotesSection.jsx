import { useState } from "react";

import Loader from "../common/Loader";

import NoteItem from "./NoteItem";

import useNotes from "../../hooks/useNotes";

const NotesSection = ({ leadId }) => {

    const {

        notes,

        loading,

        addNote,

        removeNote

    } = useNotes(leadId);

    const [text, setText] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!text.trim()) {

            return;

        }

        await addNote(text);

        setText("");

    };

    return (

        <div className="card mt-4">

            <div className="card-header">

                <h5 className="mb-0">

                    Notes

                </h5>

            </div>

            <div className="card-body">

                <form
                    onSubmit={handleSubmit}
                    className="mb-4"
                >

                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Write a note..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                    >

                        Add Note

                    </button>

                </form>

                {

                    loading

                        ? <Loader />

                        : notes.length === 0

                            ? (

                                <div className="alert alert-light">

                                    No notes yet.

                                </div>

                            )

                            : (

                                notes.map((note) => (

                                    <NoteItem
                                        key={note._id}
                                        note={note}
                                        onDelete={removeNote}
                                    />

                                ))

                            )

                }

            </div>

        </div>

    );

};

export default NotesSection;