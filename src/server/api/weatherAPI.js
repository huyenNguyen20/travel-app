const axios = require("axios")

/* Function to GET Web API Data*/

const getWeatherAPI =  async (lat, lon) => {
    const response = await axios(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_BIT_API_KEY}`)
    try {
        return response.data.data
    } catch (e){
        console.log("Error", e)
    }
}

module.exports = getWeatherAPI
    