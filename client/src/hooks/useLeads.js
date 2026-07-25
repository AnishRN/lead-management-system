import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import {
    getLeads,
    createLead as createLeadApi,
    updateLead as updateLeadApi,
    deleteLead as deleteLeadApi,
    assignLead as assignLeadApi,
    updateStatus as updateStatusApi,
    getTimeline
} from "../api/leadApi";

const useLeads = (initialParams = {}) => {

    const [leads, setLeads] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [currentParams, setCurrentParams] = useState(initialParams);

    const [pagination, setPagination] = useState({

        page: 1,
        totalPages: 1,
        total: 0,
        limit: 10

    });

    // ============================================
    // Fetch Leads
    // ============================================

    const fetchLeads = useCallback(

        async (params = currentParams) => {

            try {

                setLoading(true);

                setCurrentParams(params);

                const { data } = await getLeads(params);

                setLeads(data.leads);

                setPagination({

                    page: data.page,
                    totalPages: data.totalPages,
                    total: data.total,
                    limit: data.limit

                });

                setError(null);

                return data;

            }

            catch (err) {

                const message =

                    err.response?.data?.message ||

                    "Unable to fetch leads.";

                setError(message);

                toast.error(message);

                throw err;

            }

            finally {

                setLoading(false);

            }

        },

        [currentParams]

    );

    useEffect(() => {

        fetchLeads(currentParams);

    }, []);

    // ============================================
    // Create Lead
    // ============================================

    const createLead = async (leadData) => {

        try {

            const { data } = await createLeadApi(leadData);

            toast.success(data.message);

            await fetchLeads();

            return data;

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to create lead."

            );

            throw err;

        }

    };

    // ============================================
    // Update Lead
    // ============================================

    const updateLead = async (id, leadData) => {

        try {

            const { data } = await updateLeadApi(

                id,

                leadData

            );

            toast.success(data.message);

            await fetchLeads();

            return data;

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to update lead."

            );

            throw err;

        }

    };

    // ============================================
    // Delete Lead
    // ============================================

    const deleteLead = async (id) => {

        try {

            const { data } = await deleteLeadApi(id);

            toast.success(data.message);

            await fetchLeads();

            return data;

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to delete lead."

            );

            throw err;

        }

    };

    // ============================================
    // Assign Lead
    // ============================================

    const assignLead = async (

        id,

        userId

    ) => {

        try {

            const { data } = await assignLeadApi(

                id,

                userId

            );

            toast.success(data.message);

            await fetchLeads();

            return data;

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to assign lead."

            );

            throw err;

        }

    };

    // ============================================
    // Update Status
    // ============================================

    const updateStatus = async (

        id,

        status

    ) => {

        try {

            const { data } = await updateStatusApi(

                id,

                status

            );

            toast.success(data.message);

            await fetchLeads();

            return data;

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to update status."

            );

            throw err;

        }

    };

    return {

        leads,

        loading,

        error,

        pagination,

        fetchLeads,

        createLead,

        updateLead,

        deleteLead,

        assignLead,

        updateStatus,

        getTimeline

    };

};

export default useLeads;