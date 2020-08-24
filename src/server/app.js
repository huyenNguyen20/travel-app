const { formatNumber} = require("./utils/helperFunc")

// Loading fetch API functions
const getGeoAPI = require("./api/geoAPI")
const getWeatherAPI = require("./api/weatherAPI")
const getPixaAPI =  require("./api/pixabayAPI")
const getCovidAPI = require("./api/getCovidAPI")
const getCountryAPI = require("./api/getCountryAPI")

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Initialize all route with a callback function
app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
});

app.get("/all", (req, res) => {
    try {
         if(projectData.length === 0){
             throw new Error("No Output Data")
         }
         res.status(200).send(projectData);
    } catch (e){
         res.status(404).send(e);
    }
    
 });

app.post("/search", async (req, res) => {
    //Parse the request information
    const reqData = req.body
    console.log(reqData)
    try {
        //Fetch GeoLocation API
        const geoData = await getGeoAPI(reqData.city)
        
        //Fetch Location Picture API
        const picData = await getPixaAPI(reqData.city)
        
        //Location Data
        const city = {}
        city.location = {
            lon: geoData.lng,
            lat: geoData.lat,
            city: geoData.name,
            country: geoData.countryName,
            countryCode: geoData.countryCode,
            description: geoData.fcodeName,
            population: `${formatNumber(geoData.population)} people`
        }

        if(reqData.daysLeft <= 16){
            const weatherData = await getWeatherAPI(geoData.lat, geoData.lng)
            city.weather = {
                message: true,
                icon: `https://www.weatherbit.io/static/img/icons/${weatherData[reqData.daysLeft + 1].weather.icon}.png`,
                description: weatherData[reqData.daysLeft + 1].weather.description,
                lowTemp: `${weatherData[reqData.daysLeft + 1].low_temp} °C`,
                maxTemp: `${weatherData[reqData.daysLeft + 1].high_temp} °C`,
                temp: `${weatherData[reqData.daysLeft + 1].temp} °C`,
                cloud: `${weatherData[reqData.daysLeft + 1].clouds} %`,
                precipation: `${weatherData[reqData.daysLeft + 1].precip} %`,
                date: weatherData[reqData.daysLeft + 1].valid_date
            } 
       } else {
           city.weather = {
                message: false,
                date: reqData.tripDate
           }
       }

       const covidData = await getCovidAPI(geoData.countryCode, reqData.today)
       city.covid = {
           cases:  `${formatNumber(covidData.cases)} cases`,
           deaths:  `${formatNumber(covidData.deaths)} deaths`,
           recovered:  `${formatNumber(covidData.recovered)} people`
       }

       const countryData = await getCountryAPI(geoData.countryCode.toLowerCase())
       city.country = {
           name: countryData.name,
           flagPic: countryData.flag,
           language: countryData.languages[0].name,
           population: `${formatNumber(countryData.population)} people`,
           currency: countryData.currencies[0].name
       }

       city.img = picData.largeImageURL
       projectData.push(city)
       res.status(200).send(city)

    } catch (e) {
        res.status(400).send(e)
    }
    
});


module.exports = app;