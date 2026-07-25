import Loader from "../common/Loader";
import LeadRow from "./LeadRow";

const LeadTable = ({
    leads,
    loading,
    users = [],
    onAssign,
    onStatusChange,
    onDelete
}) => {

    if (loading) {

        return <Loader />;

    }

    if (!loading && leads.length === 0) {

        return (

            <div className="alert alert-info">

                No leads found.

            </div>

        );

    }

    return (

        <div className="table-responsive">

            <table className="table table-hover table-bordered align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Company</th>

                        <th>Phone</th>

                        <th>Source</th>

                        <th>Status</th>

                        <th>Assigned To</th>

                        <th>Created</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leads.map((lead) => (

                            <LeadRow
                                key={lead._id}
                                lead={lead}
                                users={users}
                                onAssign={onAssign}
                                onStatusChange={onStatusChange}
                                onDelete={onDelete}
                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default LeadTable;