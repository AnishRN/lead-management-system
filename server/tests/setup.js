/*
    Jest setup file.

    This file runs before every test suite.

    Future improvements:
    - Connect to a dedicated test database
    - Seed test users
    - Clean up database after tests
*/

beforeAll(async () => {
    console.log("Starting test suite...");
});

afterAll(async () => {
    console.log("Finished test suite.");
});
