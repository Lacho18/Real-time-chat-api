const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id: Number,
    sendFrom: String,
    sendTo: String,
    message: String,
    timeOfSending: Date
});

module.exports = mongoose.model("Messages", MessageSchema);


