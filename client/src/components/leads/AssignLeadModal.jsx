import { useState } from "react";

const AssignLeadModal = ({
    show,
    users,
    onClose,
    onAssign
}) => {

    const [selected, setSelected] = useState("");

    if (!show) return null;

    return (

        <div className="modal d-block">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Assign Lead</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <select
                            className="form-select"
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                        >

                            <option value="">
                                Select User
                            </option>

                            {users.map(user => (

                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-success"
                            onClick={() => onAssign(selected)}
                        >
                            Assign
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AssignLeadModal;