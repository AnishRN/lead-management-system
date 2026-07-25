import api from "./axios";

// ============================================
// Submit Public Lead
// ============================================

export const submitLead = (data) =>
    api.post("/public/leads", data);