const api = require("./helpers");
describe("Lead Notes", () => {
    test("Protected endpoint requires authentication", async () => {
        const response = await api
            .get("/api/leads/123456789012345678901234/notes");
        expect([401,403]).toContain(response.status);
    });
    test("Invalid lead id returns error", async () => {
        const response = await api
            .get("/api/leads/invalid-id/notes");
        expect([400,404]).toContain(response.status);
    });
});
