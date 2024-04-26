const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

//Gets the necessary messages
const getNecessaryMessages = asyncHandler(async (req, res) => {
    const messagesLimit = 20;
    const chatDuo = JSON.parse(req.query.chatDuo);

    //Gets all needed messages, with limit and sorted by the time they were send
    const allMessages = await Message
        .find({
            sendFrom: { $in: [chatDuo.currentUser, chatDuo.chatWith] },
            sendTo: { $in: [chatDuo.currentUser, chatDuo.chatWith] }
        })
        .sort({ timeOfSending: 1 })
        .limit(messagesLimit)
        .exec();

    if (allMessages) {
        return res.status(201).json(allMessages);
    }
    else {
        return res.status(400).json({ message: "Can not find the messages with this chat" });
    }
});

//Inserts a new message in the database
const insertMessage = asyncHandler(async (req, res) => {
    let newMessageData = req.body;

    let newMessageID = 0;

    //Finds the last message, in order to get its ID and set the new message's id with 1 higher
    let lastAddedMessage = await Message.findOne({}).sort({ id: -1 }).exec();

    //Adds the new id field with value bigger than the last message with one
    if (lastAddedMessage) {
        newMessageID = lastAddedMessage.id + 1;
        newMessageData.id = newMessageID;
    }
    else {
        //In this case the collection is empty
        newMessageData.id = 1;
    }

    if (checkForFieldsContent(newMessageData)) {
        let messageInserts = await Message.create(newMessageData);

        if (messageInserts) {
            return res.status(201).json({ message: "Success" });
        }
        else {
            return res.status(500).json({ message: "Please send the message again!" });
        }
    }
    else {
        return res.status(400).json({ message: "Insert some text to send!" });
    }
});

//Function that changes already existing message
const updateMessage = asyncHandler(async (req, res) => {

});

//Function that deletes a message
const deleteMessage = asyncHandler(async (req, res) => {

});

//Function that check whether all fields in a JSON object have values
function checkForFieldsContent(jsonObject) {
    //iterates over every field in the object
    for (let key in jsonObject) {
        if (jsonObject[key] === "" || jsonObject[key] === 0 || jsonObject[key] === undefined) {
            return false;
        }
    }

    return true;
}

module.exports = { getNecessaryMessages, insertMessage, updateMessage, deleteMessage };