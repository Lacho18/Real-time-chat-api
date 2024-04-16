const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    messages: Array
});

module.exports = mongoose.model('User', userSchema);