/*
    Shared helper functions for API tests.

    These helpers can be extended later to:
    - Login users
    - Generate JWT tokens
    - Seed test data
    - Clean test collections
*/

const request = require("supertest");

module.exports = {
    request
};
