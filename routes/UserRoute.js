const express = require("express");
const router = express.Router();
const userFunctions = require('../controlers/UserController.js');

router.route('/*')
    .get(userFunctions.LoginUser)
    .post(userFunctions.createNewUser);

module.exports = router;