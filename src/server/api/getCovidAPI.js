const axios = require("axios")

/* Function to GET Web API Data*/

const getCovidAPI =  async (countryCode, date) => {
    const response = await axios(`https://covid19-api.org/api/status/${countryCode}?date=${date}`)
    try {
        return response.data
    } catch (e){
        console.log("Error", e)
    }
}

module.exports = getCovidAPI