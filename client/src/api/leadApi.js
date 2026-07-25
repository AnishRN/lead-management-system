import api from "./axios";

export const getLeads = (params = {}) =>
    api.get("/leads", { params });

export const getLead = (id) =>
    api.get(`/leads/${id}`);

export const createLead = (data) =>
    api.post("/leads", data);

export const updateLead = (id, data) =>
    api.put(`/leads/${id}`, data);

export const deleteLead = (id) =>
    api.delete(`/leads/${id}`);

export const assignLead = (id, assignedTo) =>
    api.patch(`/leads/${id}/assign`, {
        assignedTo
    });

export const updateStatus = (id, status) =>
    api.patch(`/leads/${id}/status`, {
        status
    });

export const getTimeline = (id) =>
    api.get(`/leads/${id}/timeline`);