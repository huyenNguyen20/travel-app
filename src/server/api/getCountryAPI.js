const axios = require("axios")

/* Function to GET Web API Data*/

const getCountryAPI =  async (countryCode) => {
    const response = await axios(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    try {
        return response.data
    } catch (e){
        console.log("Error", e)
    }
}

module.exports = getCountryAPI