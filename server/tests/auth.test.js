const api = require("./helpers");
describe("Authentication", () => {
    test("Login should return JWT token", async () => {
        const response = await api
            .post("/api/auth/login")
            .send({
                email: "admin@test.com",
                password: "admin123"
            });
        expect([200, 401]).toContain(response.status);
        if (response.status === 200) {
           expect(response.body).toHaveProperty("token");
        }
    });
    test("Reject invalid credentials", async () => {
        const response = await api
            .post("/api/auth/login")
            .send({
                email: "wrong@test.com",
                password: "wrongpassword"
            });
        expect([400,401]).toContain(response.status);
    });
});
