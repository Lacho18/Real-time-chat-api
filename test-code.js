//If going to git hub put it in .env fail!!!!!!
const apiKey = "2a9445a2ca70b0e45e1a1c3baa532fac";
const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

// Fetching temperature data
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"London"}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    console.log(`The temperature in ${data.name} is ${data.main.temp}°C`);
  })
  .catch(error => console.error(error))