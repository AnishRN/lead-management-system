import api from "../api/axios";

export const getLeads = (params = {}) => {

    return api.get("/leads", {

        params

    });

};

export const getLead = (id) => {

    return api.get(`/leads/${id}`);

};

export const createLead = (data) => {

    return api.post(

        "/leads",

        data

    );

};

export const updateLead = (id, data) => {

    return api.put(

        `/leads/${id}`,

        data

    );

};

export const deleteLead = (id) => {

    return api.delete(

        `/leads/${id}`

    );

};

export const assignLead = (id, assignedTo) => {

    return api.patch(

        `/leads/${id}/assign`,

        {

            assignedTo

        }

    );

};

export const updateStatus = (id, status) => {

    return api.patch(

        `/leads/${id}/status`,

        {

            status

        }

    );

};

export const getTimeline = (id) => {

    return api.get(

        `/leads/${id}/timeline`

    );

};