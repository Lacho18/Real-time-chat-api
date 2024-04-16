const mongoose = require('mongoose');
const Weather = require('./Weather');

function ChangeStream() {
    const changeStream = Weather.watch();

    changeStream.on('change', change => {
        console.log("Something : " + change);
    });

    console.log("Change stream is active...");
}

module.exports = ChangeStream;

