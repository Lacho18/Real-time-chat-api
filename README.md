# Chat application API

This is the server side of the chat application. It handles all incoming request from the clients and sends results. The server is build with Node.js and Express.js. For database is used MongoDB. To connect and work with the database is used Mongoose - object modeling tool designed to work in an asynchronous environment and simplify interactions with MongoDB databases using Node.js.

# Real time app with MongoDB

To make the application a real time is used the MongoDB feature - MongoDB change stream. This is technology which reacts immediately after a change in a given collection or database appears. Change stream is created by watching to a specific collection or database. If a change appears, event is activated.
In this project the collection which stores all messages is watched and on insert operation the event is activated.

# Web Socket server

This API starts a Web Socket server on port 8080 to which every user connects after logging in. This server is in order to be able to send the inserted data immediately after it is inserted, making the application real time.

# All request from the client application

## Routes list

| Method | URL                               | Action                                                                        |
| ------ | --------------------------------- | ----------------------------------------------------------------------------- |
| GET    | http://localhost:8000/user        | Finds an user and returns its object as result if the user is in the database |
| POST   | http://localhost:8000/user        | Creates a new user in the database                                            |
| GET    | http://localhost:8000/getAllUsers | Gets the data for every user in the database except the one who has logged in |
| GET    | http://localhost:8000/messages    | Gets up to 20 messages between the users in the selected chat                 |
| POST   | http://localhost:8000/messages    | Inserts the new written and sended message to the database                    |
