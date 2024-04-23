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

app.use(cors());

app.use(bodyParser.json());

connection();

function ChangeStream() {
    try {
        const changeStream = Message.watch([], { fullDocument: 'updateLookup' });

        changeStream.on('change', change => {
            //Checks the type of the operation, whether it is insert or not
            if (change.operationType === 'insert') {
                //gets the inserted document data
                const insertedData = change.fullDocument;

                //Sends the data to all connected to the web socket users
                wss.clients.forEach(client => {
                    //Checks if the socket connection is open
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(insertedData));
                    }
                })
            }
        });

        console.log("Change stream is active...");
    } catch (error) {
        console.error("Error setting up change stream:", error);
    }

    console.log("Change stream is active...");
}

ChangeStream();

app.get('/test', (req, res) => {
    res.status(201).json({ message: "Successful connection!" });
});

app.use('/user', require('./routes/UserRoute'));

app.use('/getAllUsers', require('./routes/GetAllUsers'));

app.use('/messages', require('./routes/MessagesRoute.js'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
