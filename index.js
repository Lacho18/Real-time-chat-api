const express = require("express");
const app = express();
const connection = require('./Connection');
const bodyParser = require('body-parser');
const cors = require('cors');
//const Weather = require('./Weather');

const PORT = 8000;

app.use(cors());

app.use(bodyParser.json());

connection();

function ChangeStream() {
    try {
        const changeStream = Weather.watch([], { fullDocument: 'updateLookup' });

        changeStream.on('change', change => {
            console.log("Change:", change);
        });

        console.log("Change stream is active...");
    } catch (error) {
        console.error("Error setting up change stream:", error);
    }

    //console.log("Change stream is active...");
}

//ChangeStream();

/*function addTemperature() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"London"}&appid=${apiKey}`)
        .then(response => response.json())
        .then(async (data) => {
            console.log(data);
            //console.log(`The temperature in ${data.name} is ${data.main.temp}°C`);
            let dataObject = {
                temperature: {
                    celsium: (data.main.temp - 32) * (5 / 9),
                    fahrenheit: data.main.temp,
                    celvin: (data.main.temp - 32) * (5 / 9) + 273.15
                },
                location: data.name
            }

            await Weather.create(dataObject);
        })
        .catch(error => console.error(error))
}*/

//addTemperature();

app.get('/test', (req, res) => {
    console.log("bravo :)");

    res.status(201).json({ message: "Successful connection!" });
});

app.use('/user', require('./routes/UserRoute'));

app.use('/getAllUsers', require('./routes/GetAllUsers'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
