const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/WeatherApp", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connection complete !");
    }
    catch (err) {
        console.log("MongoDB connection error " + err);
    }
}

module.exports = connection;