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
            className="row mb-3"
            onSubmit={handleSubmit}
        >

            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name/email"
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
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                </select>
            </div>

            <div className="col-md-2">
                <button className="btn btn-primary w-100">
                    Search
                </button>
            </div>

        </form>

    );

};

export default LeadFilters;