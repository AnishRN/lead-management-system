import { useState } from "react";

const LeadFilters = ({ onSearch }) => {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        onSearch({

            search,

            status

        });

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="row g-3 mb-4"

        >

            <div className="col-md-6">

                <input

                    type="text"

                    className="form-control"

                    placeholder="Search by name, email or company"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

            </div>

            <div className="col-md-3">

                <select

                    className="form-select"

                    value={status}

                    onChange={(e) => setStatus(e.target.value)}

                >

                    <option value="">

                        All Status

                    </option>

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

                    <option value="Closed">

                        Closed

                    </option>

                    <option value="Lost">

                        Lost

                    </option>

                </select>

            </div>

            <div className="col-md-3">

                <button

                    className="btn btn-primary w-100"

                >

                    Search

                </button>

            </div>

        </form>

    );

};

export default LeadFilters;