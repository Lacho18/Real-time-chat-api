const express = require('express');
const router = express.Router();
const messagesFunctions = require('../controlers/MessagesControler');

router.route('/*')
    .get(messagesFunctions.getNecessaryMessages)
    .post(messagesFunctions.insertMessage)
    .put(messagesFunctions.updateMessage)
    .delete(messagesFunctions.deleteMessage);

module.exports = router;