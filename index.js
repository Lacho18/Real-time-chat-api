const express = require("express");
const app = express();
const connection = require('./Connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const Message = require('./models/Message.js');

const PORT = 8000;

//Sets up a web socket
const wss = new WebSocket.Server({ port: 8080 });
const userConnection = new Map();

app.use(cors());

app.use(bodyParser.json());

connection();

wss.on('connection', (ws, req) => {
    let userUsername;
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        userUsername = data.data;
        userConnection.set(userUsername, ws);
    })

    ws.on('close', () => {
        userConnection.delete(userUsername);
    })
})

function ChangeStream() {
    try {
        const changeStream = Message.watch([], { fullDocument: 'updateLookup' });

        changeStream.on('change', change => {
            //Checks the type of the operation, whether it is insert or not
            if (change.operationType === 'insert') {
                //gets the inserted document data  
                const insertedData = change.fullDocument;

                const recipientSocketReceiver = userConnection.get(insertedData.sendTo);
                const recipientSocketSender = userConnection.get(insertedData.sendFrom);

                //Sends the message just to the sender and receiver.
                if (recipientSocketReceiver.readyState === WebSocket.OPEN) {
                    recipientSocketReceiver.send(JSON.stringify(insertedData));
                }

                if (recipientSocketSender.readyState === WebSocket.OPEN) {
                    recipientSocketSender.send(JSON.stringify(insertedData));
                }
            }
        });
    } catch (error) {
        console.error("Error setting up change stream:", error);
    }

    console.log("Change stream is active...");
}

ChangeStream();

app.use('/user', require('./routes/UserRoute'));

app.use('/getAllUsers', require('./routes/GetAllUsers'));

app.use('/messages', require('./routes/MessagesRoute.js'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
