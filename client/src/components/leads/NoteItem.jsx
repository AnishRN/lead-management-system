import useAuth from "../../hooks/useAuth";

import formatDate from "../../utils/formatDate";

const NoteItem = ({
    note,
    onDelete
}) => {

    const { user } = useAuth();

    const canDelete =

        user?.role === "admin" ||

        user?.id === note.user?._id;

    return (

        <div className="card mb-2">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <div>

                        <strong>

                            {note.user?.name}

                        </strong>

                        <small className="text-muted ms-2">

                            {formatDate(note.createdAt)}

                        </small>

                    </div>

                    {

                        canDelete && (

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onDelete(note._id)}
                            >

                                Delete

                            </button>

                        )

                    }

                </div>

                <hr />

                <p className="mb-0">

                    {note.text}

                </p>

            </div>

        </div>

    );

};

export default NoteItem;