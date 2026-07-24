const LeadCard = ({ lead }) => {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px"
            }}
        >

            <h3>

                {lead.name}

            </h3>

            <p>

                {lead.email}

            </p>

            <p>

                {lead.company}

            </p>

            <p>

                <strong>Status:</strong> {lead.status}

            </p>

        </div>

    );

};

export default LeadCard;