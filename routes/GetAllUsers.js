const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', async (req, res) => {
    let notUser = req.query.notUser;

    let allUsers = await User.find({}).select('-password');

    allUsers = allUsers.filter(user => user.username !== notUser);

    if (allUsers) {
        console.log(allUsers);
        return res.status(201).json({ allUsers: allUsers })
    }
    else {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;