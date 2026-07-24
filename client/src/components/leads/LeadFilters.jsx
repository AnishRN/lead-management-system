const LeadFilters = ({

    search,

    setSearch,

    status,

    setStatus

}) => {

    return (

        <div
            style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px"
            }}
        >

            <input

                type="text"

                placeholder="Search Lead..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <select

                value={status}

                onChange={(e) =>

                    setStatus(e.target.value)

                }

            >

                <option value="">All Status</option>

                <option value="New">New</option>

                <option value="Contacted">Contacted</option>

                <option value="Qualified">Qualified</option>

                <option value="Lost">Lost</option>

                <option value="Won">Won</option>

            </select>

        </div>

    );

};

export default LeadFilters;