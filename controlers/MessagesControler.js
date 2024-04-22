const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

//Write functions to release the logic of the message app
const getNecessaryMessages = asyncHandler(async (req, res) => {

});

const insertMessage = asyncHandler(async (req, res) => {
    let newMessageData = req.body;

    let newMessageID = 0;

    //Finds the last message, in order to get its ID and set the new message's id with 1 higher
    let lastAddedMessage = await Message.findOne({}).sort({ id: -1 }).exec();
    console.log(lastAddedMessage);

    if (lastAddedMessage) {
        newMessageID = lastAddedMessage.id + 1;
        newMessageData.id = newMessageID;
    }
    else {
        //In this case the collection is empty
        newMessageData.id = 1;
    }

    if (checkForFieldsContent(newMessageData)) {
        console.log("Will insert : ");
        console.log(newMessageData);

        let messageInserts = null;
        //let messageInserts = await Message.create(newMessageData);

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

const updateMessage = asyncHandler(async (req, res) => {

});

const deleteMessage = asyncHandler(async (req, res) => {

});

//Function that check wheather all fields in a JSON object have values
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