import api from "./axios";

// ============================================
// Get Notes
// ============================================

export const getNotes = (leadId) =>
    api.get(`/leads/${leadId}/notes`);


// ============================================
// Create Note
// ============================================

export const createNote = (
    leadId,
    text
) =>
    api.post(`/leads/${leadId}/notes`, {
        text
    });


// ============================================
// Delete Note
// ============================================

export const deleteNote = (noteId) =>
    api.delete(`/notes/${noteId}`);