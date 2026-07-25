const api = require("./helpers");
describe("Lead API", () => {
    test("Public lead submission", async () => {
        const response = await api
            .post("/api/public")
            .send({
                name: "John Doe",
                email: "john@test.com",
                phone: "9999999999",
                company: "Digital Heroes",
                source: "Website"
            });
        expect([200,201]).toContain(response.status);
    });
    test("Unauthorized user cannot access leads", async () => {
        const response = await api.get("/api/leads");
        expect([401,403]).toContain(response.status);
    });

});
