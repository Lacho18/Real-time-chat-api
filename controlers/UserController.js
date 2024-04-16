const User = require("../models/User");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, confPassword } = req.body;

    console.log(req.body);

    //Checks for empty input fields
    if (!username || !password || !confPassword) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    //Checks for valid configuration of the password
    if (password !== confPassword) {
        return res.status(400).json({ message: "Please confirm your password correct!" });
    }

    //Checks if the password is less than 7 symbols
    if (password.length < 7) {
        return res.status(400).json({ message: "The password should be at least 7 symbols!" });
    }

    //Checks if the password contains only numbers
    if (/^[0-9]+$/.test(password)) {
        return res.status(400).json({ message: "The password should not contains just numbers!" });
    }

    const repeate = await User.findOne({ username }).lean().exec();

    //Checks if there is alredy a user with the same username
    if (repeate) {
        return res.status(400).json({ message: `A user with username : ${username} already exists!` });
    }

    //code the password of the user
    let hashedPassword = await bcrypt.hash(password, 8);

    //Creates the user in the database
    const user = await User.create({ username: username, password: hashedPassword });

    if (user) {
        res.status(201).json({ message: "User created!" });
    }
    else {
        res.status(400).json({ message: "Invalid data received!" });
    }
});

//Finds the user and sends the data about him
const LoginUser = asyncHandler(async (req, res) => {
    let data = JSON.parse(req.query.data);
    let username = data.username;
    let password = data.password;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    let userToFind = await User.findOne({
        username: username
    }).lean().exec();

    if (!userToFind) {
        return res.status(401).json({ message: "Not such user found!" });
    }

    delete userToFind["password"];
    return res.status(201).json({ user: userToFind, message: "Success" });
});

module.exports = { createNewUser, LoginUser };