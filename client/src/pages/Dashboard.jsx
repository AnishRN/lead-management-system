import { useState } from "react";

import Navbar from "../components/Navbar";
import LeadTable from "../components/leads/LeadTable";
import LeadFilters from "../components/leads/LeadFilters";
import Pagination from "../components/leads/Pagination";
import CreateLeadModal from "../components/leads/CreateLeadModal";

import useLeads from "../hooks/useLeads";
import useUsers from "../hooks/useUsers";

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
        createLead,
        assignLead,
        updateStatus,
        deleteLead
    } = useLeads(params);

    const {
        users
    } = useUsers();

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

        try {

            await createLead(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleAssign = async (leadId, userId) => {

        try {

            await assignLead(
                leadId,
                userId || null
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleStatusChange = async (leadId, status) => {

        try {

            await updateStatus(
                leadId,
                status
            );

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (leadId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this lead?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteLead(leadId);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        Lead Dashboard

                    </h2>

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

                {

                    error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )

                }

                <LeadTable
                    leads={leads}
                    loading={loading}
                    users={users.filter(
                        (u) => u.role === "member"
                    )}
                    onAssign={handleAssign}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
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