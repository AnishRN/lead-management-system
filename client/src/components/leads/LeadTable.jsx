const LeadTable = ({ leads }) => {

    return (

        <table
            style={{
                width: "100%",
                borderCollapse: "collapse"
            }}
        >

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Company</th>

                    <th>Status</th>

                    <th>Assigned</th>

                </tr>

            </thead>

            <tbody>

                {

                    leads.length === 0

                        ?

                        (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >

                                    No Leads Found

                                </td>

                            </tr>

                        )

                        :

                        leads.map((lead) => (

                            <tr key={lead._id}>

                                <td>{lead.name}</td>

                                <td>{lead.email}</td>

                                <td>{lead.company}</td>

                                <td>{lead.status}</td>

                                <td>

                                    {

                                        lead.assignedTo

                                            ?

                                            lead.assignedTo.name

                                            :

                                            "-"

                                    }

                                </td>

                            </tr>

                        ))

                }

            </tbody>

        </table>

    );

};

export default LeadTable;