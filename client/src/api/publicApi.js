import api from "./axios";


export const createPublicLead = (leadData) => {

    return api.post(
        "/leads/public",
        leadData
    );

};
