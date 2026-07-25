import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import formatDate from "../../utils/formatDate";
import leadStatusColor from "../../utils/LeadStatusColor";

const LeadRow = ({
    lead,
    users = [],
    onAssign,
    onStatusChange,
    onDelete
}) => {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleAssign = (e) => {

        e.stopPropagation();

        onAssign(
            lead._id,
            e.target.value
        );

    };

    const handleStatusChange = (e) => {

        e.stopPropagation();

        onStatusChange(
            lead._id,
            e.target.value
        );

    };

    const handleDelete = (e) => {

        e.stopPropagation();

        onDelete(
            lead._id
        );

    };

    return (

        <tr
            style={{
                cursor: "pointer"
            }}
            onClick={() => navigate(`/leads/${lead._id}`)}
        >

            <td>

                {lead.name}

            </td>

            <td>

                {lead.email}

            </td>

            <td>

                {lead.company || "-"}

            </td>

            <td>

                {lead.phone || "-"}

            </td>

            <td>

                {lead.source}

            </td>

            <td
                onClick={(e) => e.stopPropagation()}
            >

                {

                    user?.role === "admin"

                        ? (

                            <select
                                className="form-select form-select-sm"
                                value={lead.status}
                                onChange={handleStatusChange}
                            >

                                <option value="New">

                                    New

                                </option>

                                <option value="Contacted">

                                    Contacted

                                </option>

                                <option value="Qualified">
                                    Qualified
                                </option>

                                <option value="Proposal Sent">
                                    Proposal Sent
                                </option>

                                <option value="Won">
                                    Won
                                </option>

                                <option value="Lost">

                                    Lost

                                </option>

                            </select>

                        )

                        : (

                            <span
                                className={`badge bg-${leadStatusColor(
                                    lead.status
                                )}`}
                            >

                                {lead.status}

                            </span>

                        )

                }

            </td>

            <td
                onClick={(e) => e.stopPropagation()}
            >

                {

                    user?.role === "admin"

                        ? (

                            <select
                                className="form-select form-select-sm"
                                value={lead.assignedTo?._id || ""}
                                onChange={handleAssign}
                            >

                                <option value="">

                                    Unassigned

                                </option>

                                {

                                    users.map((member) => (

                                        <option
                                            key={member._id}
                                            value={member._id}
                                        >

                                            {member.name}

                                        </option>

                                    ))

                                }

                            </select>

                        )

                        : (

                            lead.assignedTo?.name ||

                            "Unassigned"

                        )

                }

            </td>

            <td>

                {formatDate(
                    lead.createdAt
                )}

            </td>

            <td
                onClick={(e) => e.stopPropagation()}
            >

                {

                    user?.role === "admin" && (

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={handleDelete}
                        >

                            Delete

                        </button>

                    )

                }

            </td>

        </tr>

    );

};

export default LeadRow;