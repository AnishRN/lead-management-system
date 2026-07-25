import { useState } from "react";

import Navbar from "../components/Navbar";
import LeadTable from "../components/leads/LeadTable";
import LeadFilters from "../components/leads/LeadFilters";
import Pagination from "../components/leads/Pagination";
import CreateLeadModal from "../components/leads/CreateLeadModal";

import useLeads from "../hooks/useLeads";

const Dashboard = () => {

    const [params, setParams] = useState({
        page: 1
    });

    const {
        leads,
        loading,
        error,
        pagination,
        fetchLeads,
        createLead
    } = useLeads(params);

    const handleSearch = (filters) => {

        const newParams = {
            ...params,
            ...filters,
            page: 1
        };

        setParams(newParams);
        fetchLeads(newParams);

    };

    const handlePageChange = (page) => {

        const newParams = {
            ...params,
            page
        };

        setParams(newParams);
        fetchLeads(newParams);

    };

    const handleCreate = async (data) => {

        await createLead(data);

        fetchLeads(params);

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Lead Dashboard</h2>

                    <button
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#createLeadModal"
                    >
                        + Create Lead
                    </button>

                </div>

                <LeadFilters
                    onSearch={handleSearch}
                />

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                <LeadTable
                    leads={leads}
                    loading={loading}
                />

                <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />

                <CreateLeadModal
                    onCreate={handleCreate}
                />

            </div>

        </>

    );

};

export default Dashboard;