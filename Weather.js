const mongoose = require('mongoose');

const Weather = new mongoose.Schema({
    temperature: {
        celsium: Number,
        fahrenheit: Number,
        celvin: Number
    },
    location: String
});

module.exports = mongoose.model('weather', Weather);