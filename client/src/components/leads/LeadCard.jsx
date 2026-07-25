import formatDate from "../../utils/formatDate";
import leadStatusColor from "../../utils/LeadStatusColor";

const LeadCard = ({ lead }) => {

    if (!lead) return null;

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <h3>{lead.name}</h3>

                    <span
                        className={`badge bg-${leadStatusColor(lead.status)}`}
                    >
                        {lead.status}
                    </span>

                </div>

                <hr />

                <p>
                    <strong>Email:</strong> {lead.email}
                </p>

                <p>
                    <strong>Phone:</strong> {lead.phone || "-"}
                </p>

                <p>
                    <strong>Company:</strong> {lead.company || "-"}
                </p>

                <p>
                    <strong>Source:</strong> {lead.source}
                </p>

                <p>
                    <strong>Assigned To:</strong>{" "}
                    {lead.assignedTo?.name || "Unassigned"}
                </p>

                <p>
                    <strong>Created By:</strong>{" "}
                    {lead.createdBy?.name}
                </p>

                <p>
                    <strong>Created:</strong>{" "}
                    {formatDate(lead.createdAt)}
                </p>

            </div>

        </div>

    );

};

export default LeadCard;