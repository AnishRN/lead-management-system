const request = require("supertest");
const BASE_URL = "http://localhost:5000";
const api = request(BASE_URL);
module.exports = api;
