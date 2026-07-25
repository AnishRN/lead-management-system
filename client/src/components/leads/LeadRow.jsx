import { useNavigate } from "react-router-dom";

import formatDate from "../../utils/formatDate";
import leadStatusColor from "../../utils/LeadStatusColor";

const LeadRow = ({ lead }) => {

    const navigate = useNavigate();

    return (

        <tr
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/leads/${lead._id}`)}
        >

            <td>{lead.name}</td>

            <td>{lead.email}</td>

            <td>{lead.company || "-"}</td>

            <td>{lead.phone || "-"}</td>

            <td>{lead.source}</td>

            <td>

                <span
                    className={`badge bg-${leadStatusColor(lead.status)}`}
                >
                    {lead.status}
                </span>

            </td>

            <td>

                {lead.assignedTo
                    ? lead.assignedTo.name
                    : "Unassigned"}

            </td>

            <td>{formatDate(lead.createdAt)}</td>

        </tr>

    );

};

export default LeadRow;