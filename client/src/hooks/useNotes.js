import {
    useEffect,
    useState,
    useCallback
} from "react";

import toast from "react-hot-toast";

import {

    getNotes,

    createNote,

    deleteNote

} from "../api/noteApi";

const useNotes = (leadId) => {

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchNotes = useCallback(async () => {

        if (!leadId) {

            return;

        }

        try {

            setLoading(true);

            const { data } = await getNotes(leadId);

            setNotes(data.notes);

            setError(null);

        }

        catch (err) {

            const message =

                err.response?.data?.message ||

                "Unable to load notes.";

            setError(message);

            toast.error(message);

        }

        finally {

            setLoading(false);

        }

    }, [leadId]);

    useEffect(() => {

        fetchNotes();

    }, [fetchNotes]);

    const addNote = async (text) => {

        try {

            const { data } = await createNote(

                leadId,

                text

            );

            setNotes((prev) => [

                data.note,

                ...prev

            ]);

            toast.success(data.message);

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to add note."

            );

        }

    };

    const removeNote = async (noteId) => {

        try {

            const { data } = await deleteNote(noteId);

            setNotes((prev) =>

                prev.filter(

                    (note) =>

                        note._id !== noteId

                )

            );

            toast.success(data.message);

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to delete note."

            );

        }

    };

    return {

        notes,

        loading,

        error,

        fetchNotes,

        addNote,

        removeNote

    };

};

export default useNotes;