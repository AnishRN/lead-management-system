const express = require("express");

const router = express.Router();

const {

    submitLead

} = require("../controllers/publicController");

router.post(

    "/leads",

    submitLead

);

module.exports = router;