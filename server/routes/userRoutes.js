const express = require("express");

const router = express.Router();

const {

    getUsers,

    getUser

} = require("../controllers/userController");

const {

    protect

} = require("../middleware/authMiddleware");

const {

    authorizeRoles

} = require("../middleware/roleMiddleware");

router.get(

    "/",

    protect,

    authorizeRoles("admin"),

    getUsers

);

router.get(

    "/:id",

    protect,

    authorizeRoles("admin"),

    getUser

);

module.exports = router;